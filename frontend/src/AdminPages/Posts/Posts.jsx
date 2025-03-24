import React, { useState, useRef, useEffect } from "react";
import "./Posts.scss";
import CardPost from "../../Pages/HomePage/Card_post";
import Slider from "react-slick";
import axios from "../../Apis/axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Posts() {
  const sliderRef = useRef(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [error, setError] = useState("");
  const [posts, setPosts] = useState([]);

  // Add a new state for loading
  const [loading, setLoading] = useState(false);

  const [newPost, setNewPost] = useState({
    title: "",
    subtitle: "",
    content: "",
    cover_url: "",
  });

  // Function to convert file to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to fetch all posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/admin/posts");
      setPosts(response);
      console.log(response);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  const handleAddPost = async (e) => {
    e.preventDefault();

    // Log data trước khi gửi
    console.log("Sending post data:", newPost);

    if (
      !newPost.title.trim() ||
      !newPost.content.trim() ||
      !newPost.cover_url
    ) {
      setError("Title, content and image are required!");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/admin/posts", newPost, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Log response thành công
      console.log("Server response:", response);

      setPosts([...posts, response]);
      setIsAddingPost(false);
      setNewPost({
        title: "",
        subtitle: "",
        content: "",
        cover_url: "",
      });
      setError("");
    } catch (error) {
      // Log chi tiết lỗi
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      setError(error.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = async (e, isEditing = false) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const base64 = await convertToBase64(file);
      if (isEditing) {
        setEditingPost({ ...editingPost, cover_url: base64 });
      } else {
        setNewPost({ ...newPost, cover_url: base64 });
      }
      console.log("convert đc r");
    } catch (error) {
      console.error("Error converting image:", error);
      setError("Failed to process image");
    }
  };

  const saveChanges = async () => {
    if (!editingPost) return;

    try {
      setLoading(true);
      const response = await axios.put(
        `/admin/posts/${editingPost._id}`,
        editingPost
      );

      setPosts(
        posts?.map((post) => (post._id === editingPost._id ? response : post))
      );
      setEditingPost(null);
      setSelectedPost(response);
    } catch (error) {
      console.error("Error updating post:", error);
      setError(error.response?.data?.message || "Failed to update post");
    } finally {
      setLoading(false);
    }
  };

  const handleShowDetails = (post) => {
    setSelectedPost(post);
    // setIsModalOpen(true);
  };

  const handleEdit = (post) => {
    setEditingPost(post);
  };
  const handleDelete = async (postId) => {
    try {
      setLoading(true);
      await axios.delete(`/admin/posts/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      setSelectedPost(null);
    } catch (error) {
      console.error("Error deleting post:", error);
      //   setError(error.response?.data?.message || "Failed to delete post");
    } finally {
      setLoading(false);
    }
  };

  const getSliderSettings = () => ({
    dots: posts?.length > 5,
    speed: 500,
    infinite: true,
    variableWidth: true,
    slidesToShow: Math.min(5, posts?.length || 1),
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, posts?.length || 1),
          slidesToScroll: 1,
          infinite: posts?.length > 2,
          dots: posts?.length > 2,
          autoplay: posts?.length > 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: posts?.length > 1,
          dots: posts?.length > 1,
          autoplay: posts?.length > 1,
        },
      },
    ],
  });

  const showNavigation = posts?.length > 5;
  const handleNext = () => sliderRef.current?.slickNext();
  const handlePrev = () => sliderRef.current?.slickPrev();

  return (
    <div className="posts">
      {loading && <div className="loading-spinner">Loading...</div>}
      {error && <div className="error-message">{error}</div>}

      <button className="add-post-button" onClick={() => setIsAddingPost(true)}>
        Add New Post
      </button>
      <div className="latest-news">
        <div className="latest-news__container">
          <div className="latest-news__header">
            <h1 className="latest-news__title">
              <span>Latest Posts</span>
            </h1>
          </div>

          <div className="latest-news__slider-container">
            {showNavigation && (
              <>
                <button
                  onClick={handlePrev}
                  className="latest-news__nav-button latest-news__nav-button--prev"
                ></button>
                <button
                  onClick={handleNext}
                  className="latest-news__nav-button latest-news__nav-button--next"
                ></button>
              </>
            )}

            <Slider
              ref={sliderRef}
              {...getSliderSettings()}
              className="latest-news__slider latest-news__slider-admin"
            >
              {posts?.map((post) => (
                <div key={post._id} onClick={() => handleShowDetails(post)}>
                  <CardPost
                    // _id={post._id}
                    title={post.title}
                    subtitle={post.subtitle}
                    cover_url={post.cover_url}
                    className={
                      selectedPost === post._id
                        ? "news-card news-card--active"
                        : "news-card"
                    }
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>

      {selectedPost && (
        <div className="expanded-post-section">
          <h2>{selectedPost.title}</h2>
          <p>{selectedPost.subtitle}</p>
          <p>{selectedPost.content}</p>
          <img src={selectedPost.cover_url} alt={selectedPost.title} />
          <div className="buttons">
            <button onClick={() => handleEdit(selectedPost)}>Edit</button>
            <button onClick={() => handleDelete(selectedPost._id)}>
              Delete
            </button>
            <button onClick={() => setSelectedPost(null)}>Close</button>
          </div>
        </div>
      )}
      {/* Rest of your JSX remains the same, but update the file input in modals */}
      {isAddingPost && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Post</h3>
            <form onSubmit={handleAddPost}>
              {error && <p className="error-message">{error}</p>}
              <input
                type="text"
                value={newPost.title}
                onChange={(e) =>
                  setNewPost({ ...newPost, title: e.target.value })
                }
                placeholder="Enter Title"
              />
              <input
                type="text"
                value={newPost.subtitle}
                onChange={(e) =>
                  setNewPost({ ...newPost, subtitle: e.target.value })
                }
                placeholder="Enter Subtitle"
              />
              <textarea
                value={newPost.content}
                onChange={(e) =>
                  setNewPost({ ...newPost, content: e.target.value })
                }
                placeholder="Enter Content"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, false)}
              />
              {newPost.cover_url && (
                <img
                  src={newPost.cover_url}
                  alt="Preview"
                  style={{ maxWidth: "200px", marginTop: "10px" }}
                />
              )}
              <button type="submit" disabled={loading}>
                Add
              </button>
              <button onClick={() => setIsAddingPost(false)} disabled={loading}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Update the edit modal similarly */}
      {editingPost && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Post</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveChanges();
              }}
            >
              <input
                type="text"
                value={editingPost.title}
                onChange={(e) =>
                  setEditingPost({ ...editingPost, title: e.target.value })
                }
                placeholder="Edit Title"
              />
              <input
                type="text"
                value={editingPost.subtitle}
                onChange={(e) =>
                  setEditingPost({ ...editingPost, subtitle: e.target.value })
                }
                placeholder="Edit Subtitle"
              />
              <textarea
                value={editingPost.content}
                onChange={(e) =>
                  setEditingPost({ ...editingPost, content: e.target.value })
                }
                placeholder="Edit Content"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, true)}
              />
              {editingPost.cover_url && (
                <img
                  src={editingPost.cover_url}
                  alt="Preview"
                  style={{ maxWidth: "200px", marginTop: "10px" }}
                />
              )}
              <button type="submit" disabled={loading}>
                Save
              </button>
              <button onClick={() => setEditingPost(null)} disabled={loading}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Rest of your component JSX */}
    </div>
  );
}

export default Posts;

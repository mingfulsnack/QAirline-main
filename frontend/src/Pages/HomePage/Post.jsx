// LatestNews.jsx
import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import CardPost from "./Card_post";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Post.scss";
import { useNavigate } from "react-router-dom";
import PostDetails from "./PostDetails";
import axios from "../../Apis/axios";
const Post = () => {
  const sliderRef = useRef(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/admin/posts"); // Thay URL API thực tế của bạn
        setPosts(response); // Giả sử API trả về danh sách bài viết trong `response.data`
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);
  // Let's assume we have an array of posts to make it clearer

  const settings = {
    dots: posts.length > 5, // Only show dots if more than 5 posts
    infinite: true,
    variableWidth: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: posts.length > 5, // Only autoplay if more than 5 posts
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, posts.length), // Show maximum 2 or all posts if less
          slidesToScroll: 1,
          infinite: posts.length > 2,
          dots: posts.length > 2,
          autoplay: posts.length > 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: posts.length > 1,
          dots: posts.length > 1,
          autoplay: posts.length > 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: posts.length > 1,
          dots: posts.length > 1,
          autoplay: posts.length > 1,
        },
      },
    ],
  };

  // Only show navigation buttons if there are more than 5 posts
  const showNavigation = posts.length > 5;
  // const showNavigation = true;
  const handleNext = () => sliderRef.current?.slickNext();
  const handlePrev = () => sliderRef.current?.slickPrev();

  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShowDetails = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  return (
    <div className="latest-news">
      <div className="latest-news__container">
        {isModalOpen && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={handleCloseModal}>
                ×
              </button>
              <PostDetails post={selectedPost} />
            </div>
          </div>
        )}

        <div className="latest-news__header">
          <h1 className="latest-news__title">
            <span>Tin tức</span>
          </h1>
        </div>

        <div className="latest-news__slider-container">
          {showNavigation && (
            <>
              <button
                onClick={handlePrev}
                className="latest-news__nav-button latest-news__nav-button--prev"
                aria-label="Previous"
              ></button>
              <button
                onClick={handleNext}
                className="latest-news__nav-button latest-news__nav-button--next"
                aria-label="Next"
              ></button>
            </>
          )}

          <Slider ref={sliderRef} {...settings} className="latest-news__slider">
            {posts.map((post) => (
              <CardPost
                key={post.id}
                _id={post.id}
                title={post.title}
                subtitle={post.subtitle}
                cover_url={post.cover_url}
                onClick={() => handleShowDetails(post)} // Chuyển bài viết vào hàm
              />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Post;

import PropTypes from 'prop-types'
import React from 'react'

function PostDetails({ post }) {
    return (
        <div className="post-details">
            <h2>{post.title}</h2>
            <p>{post.subtitle}</p>
            <img src={post.cover_url} alt={post.title} style={{ width: "60%", borderRadius: "8px" }} />
            <p className='post-content'>{post.content}</p>
        </div>
    )
}

PostDetails.propTypes = {
    post: PropTypes.any,
}

export default PostDetails
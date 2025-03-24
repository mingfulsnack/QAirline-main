// LatestNewsCard.jsx
import React from "react";
import PropTypes from "prop-types";
import "./Post.scss";

const CardPost = ({ title, subtitle, cover_url, onClick }) => {
  return (
    <div className="news-card" onClick={onClick}>
      <img src={cover_url} alt={title} className="news-card__image" />
      <div className="news-card__content">
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__subtitle">{subtitle}</p>
      </div>
    </div>
  );
};
CardPost.propTypes = {
  // PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  cover_url: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CardPost;

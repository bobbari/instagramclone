import React from "react";
import PropTypes from "prop-types";

const DisplayPostItem = (props) => {
  const { post } = props;

  const clickFavorite = (e) => {
    console.log("clickFavorite ", e);
  };

  return (
    <div className="card home-card" key={post._id}>
      <h5 className="header">{post.title}</h5>
      <div className="card-image">
        <img
          src={
            post.photo !== "no photo"
              ? `http://localhost:5000/${post.photo}`
              : `https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fHBlcnNvbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60`
          }
          alt=""
        />
      </div>
      <div className="card-content card-description">
        <div className="favorite-icon">
          <i
            className="material-icons"
            style={{ color: "red" }}
            onClick={(e) => {
              clickFavorite(e);
            }}
          >
            favorite
          </i>
        </div>
        <div className="comment-section">
          <h6> {post.title}</h6>
          <p>{post.body}</p>
          <input type="text" placeholder="Add Comment" />
        </div>
      </div>
    </div>
  );
};

DisplayPostItem.propTypes = {
  post: PropTypes.object,
};

export default DisplayPostItem;

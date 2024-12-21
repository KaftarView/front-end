import React from 'react';
import './Comments.css';

const Comments = () => {
  return (
    <div className="comments-section">
      <h2 className="comments-title">نظرات</h2>
      <input
        type="text"
        placeholder="نظر"
        className="comment-input"
      />
      <div className="comments-list">
        <div className="comment-item">
          <div className="comment-header">
            <span className="comment-author"> عباس پور</span>
            <span className="comment-time">2 hours ago</span>
          </div>
          <p className="comment-text">صدای زیبایی دارید.</p>
          <button className="reply-button">Reply</button>
        </div>
      </div>
    </div>
  );
};

export default Comments;
import React from 'react';
import './Comment.css'; // Ensure you include the CSS file

const CommentSection = () => {
  // Mock data for comments
  const comments = [
    {
      username: "احمدقلی",
      profilePhoto: "https://via.placeholder.com/40",
      date: "Nov 22, 2024",
      text: "بسیار عالی دوست داشتم",
    },
    {
      username: "ستاره",
      profilePhoto: "https://via.placeholder.com/40",
      date: "Nov 21, 2024",
      text: "بد نبود",
    },
    {
      username: "دنیا",
      profilePhoto: "https://via.placeholder.com/40",
      date: "Nov 20, 2024",
      text: "خسته نباشید",
    },
  ];

  return (
    <div className="comment-section">
      {comments.map((comment, index) => (
        <div key={index} className="comment">
          <div className="comment-header">
            <div className="comment-options">
              <span className="comment-three-dots">...</span>
              <button className="delete-button-comment">
                حذف
              </button>
            </div>
            <img
              src={comment.profilePhoto}
              alt={`${comment.username}'s profile`}
              className="comment-profile-photo"
            />
            <div className="comment-info">
              <span className="comment-username">{comment.username}</span>
              <span className="comment-date">{comment.date}</span>
            </div>
          </div>
          <div className="comment-body">
            <p>{comment.text}</p>
          </div>
        </div>
      ))}
      <form  className="comment-form">
        <input
          type="email"
          placeholder="Your email"
          // value={newComment.email}
          // onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
          required
        />
        <textarea
          placeholder="Write your comment"
          // value={newComment.text}
          // onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
          required
        ></textarea>
        <button type="submit">ارسال نظر</button>
      </form>
    </div>
  );
      }
export default CommentSection;

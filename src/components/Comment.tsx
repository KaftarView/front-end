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
            <img 
              src={comment.profilePhoto} 
              alt={`${comment.username}'s profile`} 
              className="comment-profile-photo" 
            />
            <div className="comment-info">
              <span className="username">{comment.username}</span>
              <span className="date">{comment.date}</span>
            </div>
          </div>
          <div className="comment-body">
            <p>{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;

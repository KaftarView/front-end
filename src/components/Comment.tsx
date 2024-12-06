import React , {useState} from 'react';
import './Comment.css'; // Ensure you include the CSS file



  interface CommentSectionProps {  
    postId: number;
  }  
  const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {  
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
  const [newComment, setNewComment] = useState<string>(''); 
  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {  
    e.preventDefault();  
    
    try {  
      
    } catch (error) {  
      
    }  
  };  

  return (
    <div className="comment-section">
      {comments.map((comment, index) => (
        <div key={index} className="comment">
          <div className="comment-header">
            <div className="comment-options">
            <span className="three-dots">⋮</span>
                <div className="options-menu">
                  <button>Edit</button>
                  <button>Delete</button> 
                </div>
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
      <form  className="comment-form" onSubmit={handleCommentSubmit}>
        <textarea
          placeholder="نظر,انتقادات و پیشنهادات خود را بنویسید "
          value={newComment}  
          onChange={(e) => setNewComment(e.target.value)}  
          required
        ></textarea>
        <button type="submit">ارسال نظر</button>
      </form>
    </div>
  );
      }
export default CommentSection;

import React , {useState , useEffect} from 'react';
import './Comment.css'; 
import {User} from './AuthContext'
import apiClient from  "../utils/apiClient"
import axios from 'axios'



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
  const [user, setUser] = useState<User | null>(null); 
  useEffect(() => {  
    const userData = localStorage.getItem('user');  
    if (userData) {  
      const parsedUser: User = JSON.parse(userData);   
      setUser(parsedUser);   
    } else {  
        console.error("No user data found in localStorage.");  
    }  
  }, []);
  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {  
    e.preventDefault();  
    const commentData = {  
      userID: user?.id,  
      content: newComment, 
    };  
    
    try {  
        const res = await apiClient.post(`/v1/comments/post/${postId}`, commentData);  
        if (res.status === 200) {
          console.log("Comment submitted successfully:", res.data);  
          setNewComment('');   
        } else {  
            console.error("Error in response: ", res.data); 
        }  
    } catch (error) {  
        if (axios.isAxiosError(error)) {  
            console.error("Axios error while submitting comment:", error.response?.data);  
            alert(`Error: ${error.response?.data?.message || "An error occurred while submitting your comment."}`);  
        } else {  
            console.error("Unexpected error:", error);  
            alert("An unexpected error occurred. Please try again later.");  
        }  
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
      {user ? (  
        <form className="comment-form" onSubmit={handleCommentSubmit}>  
          <textarea  
            placeholder="نظر,انتقادات و پیشنهادات خود را بنویسید "  
            value={newComment}  
            onChange={(e) => setNewComment(e.target.value)}  
            required  
          ></textarea>  
          <button type="submit">ارسال نظر</button>  
        </form>  
      ) : (  
        <p>لطفاً برای ارسال نظر ابتدا وارد شوید.</p> 
      )} 
    </div>
  );
      }
export default CommentSection;

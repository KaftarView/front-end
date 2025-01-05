import React , {useEffect , useState} from 'react';
import './Comments.css';
import {User , useAuth} from '../../components/AuthContext'
import apiClient from '../../utils/apiClient';
import axios from 'axios';

export interface EventComment {  
  id : number;
  authorName: string;
  content: string;    
}  
const Comments = ({ postId }: { postId: number | undefined }) => {
  const {getUserRoles} = useAuth()
  const userRole = getUserRoles()[0];
  const [newComment, setNewComment] = useState<string>(''); 
  const [eventcomments, setComments] = useState<EventComment[]>([]);

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
  const fetchComments = async () => {  
    const path = userRole === "SuperAdmin" ? "/v1/public/comments/" : "/v1/public/comments/"
    try {  
      const response = await apiClient.get(`${path}${postId}`, {  
        headers: {  
          "ngrok-skip-browser-warning": "69420",  
          'Content-Type': 'application/json', 
        },  
      });  
      console.log(response.data.data)
      setComments(response.data.data); 
    } catch (error) {  
      console.error("Error fetching comments:", error);  
    }  
  };  

  useEffect(() => {  
    fetchComments();  
  }, [postId]); 

  const handleDeleteComment = async (id : number) => {
    try {  
      // console.log(`/v1/comments/post/${postId}`);
      const res = await apiClient.delete(`/v1/comments/${id}`);  
      if (res.status === 200) {
        console.log("Comment submitted successfully:", res.data);  
        fetchComments(); 
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

  }
  const handleCommentSubmit = async () => {  
    const commentData = {   
      content: newComment, 
    };  
    try {  
        // console.log(`/v1/comments/post/${postId}`);
        const res = await apiClient.post(`/v1/comments/post/${postId}`, commentData);  
        if (res.status === 200) {
          console.log("Comment submitted successfully:", res.data);  
          setNewComment('');  
          fetchComments(); 
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
    <div className="comments-section">
      <h2 className="comments-title">نظرات</h2>
      <input
        type="text"
        placeholder={user ? "نظر" : "برای ایجاد نظر ابتدا وارد شوید"}
        disabled ={!user}
        className="comment-input"
        value={newComment}  
        onChange={(e) => setNewComment(e.target.value)}  
        required  
      />
      <div className="comments-list">
      {!eventcomments && <p>نظری برای نمایش وجود ندارد</p>}
      {eventcomments &&eventcomments.map((comment, index) => (
        <div key={index} className="comment-item">

          <div className="comment-header">
            <span className="comment-author"> {comment.authorName}</span>
                      {userRole === "SuperAdmin" && 
          <div className="comment-options">
            <span className="three-dots">⋮</span>
                <div className="options-menu">
                  <button onClick={() => handleDeleteComment(comment.id)}>Delete</button> 
                </div>
            </div>
            }
            {/* <span className="comment-time">2 hours ago</span> */}
          </div>
          <p className="comment-text">{comment.content}</p>
        </div>
      ))}
      </div>
      <button onClick={handleCommentSubmit} className='comment-podcast-button'>ارسال نظر</button>
    </div>
  );
};

export default Comments;
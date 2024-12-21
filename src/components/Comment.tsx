import React , {useState , useEffect} from 'react';
import './Comment.css'; 
import {User , useAuth} from './AuthContext'
import apiClient from  "../utils/apiClient"
import axios from 'axios'



  interface CommentSectionProps {  
    postId: number;
  }  

  export interface EventComment {  
    AuthorName: string; // The name of the comment author  
    Content: string;    // The content of the comment  
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
  const [eventcomments, setComments] = useState<EventComment[]>([]);
  const {getUserRoles} = useAuth()
  const userRole = getUserRoles()[0];

  const [user, setUser] = useState<User | null>(null); 

  const fetchComments = async () => {  
    const path = userRole === "SuperAdmin" ? "/v1/events/event-details/" : "/v1/public/events/"
    try {  
      const response = await apiClient.get(`${path}${postId}`, {  
        headers: {  
          "ngrok-skip-browser-warning": "69420",  
          'Content-Type': 'application/json', // Include any other headers if necessary  
        },  
      });  
      setComments(response.data.data.comments); // Adjust this based on your API response structure  
    } catch (error) {  
      console.error("Error fetching comments:", error);  
    }  
  };  

  // Fetch comments when the component mounts  
  useEffect(() => {  
    fetchComments();  
  }, [postId]); 

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
      content: newComment, 
      userID : user?.id,
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

  // if(!eventcomments)
  // {
  //   return (
  //     <div className="comment-section">
  //       {user ? (  
  //         <form className="comment-form" onSubmit={handleCommentSubmit}>  
  //           <textarea  
  //             placeholder="نظر,انتقادات و پیشنهادات خود را بنویسید "  
  //             value={newComment}  
  //             onChange={(e) => setNewComment(e.target.value)}  
  //             required  
  //           ></textarea>  
  //           <button type="submit">ارسال نظر</button>  
  //         </form>  
  //       ) : (  
  //         <p>لطفاً برای ارسال نظر ابتدا وارد شوید.</p> 
  //       )} 
  //     </div>
  //   );

  // }

  return (
    <div className="comment-section">
      {!eventcomments && <p>نظری برای نمایش وجود ندارد</p>}
      {eventcomments &&eventcomments.map((comment, index) => (
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
              src="https://via.placeholder.com/40"
              alt={`${comment.AuthorName}'s profile`}
              className="comment-profile-photo"
            />
            <div className="comment-info">
              <span className="comment-username">{comment.AuthorName}</span>
              <span className="comment-date">21 آبان</span>
            </div>
          </div>
          <div className="comment-body">
            <p>{comment.Content}</p>
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

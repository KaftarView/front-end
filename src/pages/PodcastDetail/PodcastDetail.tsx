import React, { useEffect, useState } from 'react';
import './PodcastInfo.css';
import Comments from './Comments';
import apiClient from '../../utils/apiClient'
import {User , useAuth} from '../../components/AuthContext'
import { useParams } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import Navbar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import PopupQuestion from '../../components/PopupQuestion/PopopQuestion'



interface PodcastDetail {
  id: number;
  createdAt: string;
  name: string;
  description: string;
  banner: string;
  publisher: string;
  categories: string[];
  subscribersCount: number;
  is_subscribed:boolean;
}

interface Episode {
  id: number;
  createdAt: string;
  name: string;
  description: string;
  banner: string;
  audio: string;
  publisher: string;
}

const PodcastDetail: React.FC = () => {
  const [podcast, setPodcast] = useState<PodcastDetail | null>(null);
  const { id } = useParams<{ id: string }>();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [user, setUser] = useState<User | null>(null); 
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [isModalVisibleTwo, setIsModalVisibleTwo] = useState(false); 
  const [commentId , setCommentId] = useState<number | null> (null)
  const [error , setError] = useState<string>("")
  const { getUserRoles } = useAuth();
  const userRole = getUserRoles()[0];
  const navigate = useNavigate()

    const fetchData = async () => {
      try {
        const podcastResponse = await apiClient.get(`/v1/public/podcasts/${id}` , {
        headers: {"ngrok-skip-browser-warning": "69420",
        'Content-Type': 'application/json' },}
        );
        const episodesResponse = await apiClient.get(`/v1/public/podcasts/${id}/episodes` , {
          headers: {"ngrok-skip-browser-warning": "69420",
          'Content-Type': 'application/json' },}
          );
        setPodcast(podcastResponse.data.data);
        console.log(podcastResponse.data.data)
        setEpisodes(episodesResponse.data.data);
        console.log(episodes)
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {  
    fetchData();
  }, []);

  const handleDeleteCommentClick = (commId: number) => {  
    setCommentId(commId);  
    setIsModalVisibleTwo(true);  
  };  

  const handleConfirmDeleteComment = () => {  

  };  

  const handleCancelDeleteComment = () => {  
    setIsModalVisibleTwo(false);  
    setCommentId(null);  
  };  

  const fetchStatus = async() =>
  {
    try{
    const response = await apiClient.get(`/v1/podcasts/${id}/subscribe/status` , {
      headers: {"ngrok-skip-browser-warning": "69420",
      'Content-Type': 'application/json' },}
      );
      
    console.log(response.data.data)
    setIsSubscribed(response.data.data)
    }

    catch(error)
    {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {  
    fetchStatus();
  }, []);


  const handleDeleteClick = () => {  
    setIsModalVisible(true);  
  };  

  const handleConfirmDelete = async () => {  
    try {  
      const response = await apiClient.delete(`/v1/admin/podcasts/${id}`);   
      console.log('Audio deleted successfully');  
      console.log(response.data)
      if(response.data.statusCode == 200) {
        alert("پادکست با موفقیت حذف شد")
        navigate('/podcasts')
      }
    } catch (err : any) {  
      setError(err.response?.data?.message || 'An error occurred during purchase.'); 
    }  

  };  

  const handleCancelDelete = () => {  
    setIsModalVisible(false);   
  };  
  

  useEffect(() => {  
    const userData = localStorage.getItem('user');  
    console.log(user)
    if (userData) {  
      const parsedUser: User = JSON.parse(userData);   
      setUser(parsedUser);   
    } else {  
        console.error("No user data found in localStorage.");  
    }  
  }, []);

  const handleSubscribe = async () => {
    if (isSubscribed) {
      try {
        await apiClient.delete(`/v1/podcasts/${id}/subscribe`);
        setIsSubscribed(false);
        if (podcast) {
          setPodcast({
            ...podcast,
            subscribersCount: podcast.subscribersCount - 1,
          });
        }
      } catch (error) {
        console.error("Error unsubscribing:", error);
      }
    } else {
      try {
        await apiClient.post(`/v1/podcasts/${id}/subscribe`);
        setIsSubscribed(true);
        if (podcast) {
          setPodcast({
            ...podcast,
            subscribersCount: podcast.subscribersCount + 1,
          });
        }
      } catch (error) {
        console.error("Error subscribing:", error);
      }
    }
  };

  const handleDeleteEpisode = async (episodId : number) =>
  {
    try {  
      const response = await apiClient.delete(`/v1/admin/episodes/${episodId}`);   
      console.log('Audio deleted successfully');  
      console.log(response.data)
      if(response.data.statusCode == 200) {
        alert("اپیزود با موفقیت حذف شد")
        window.location.reload()
      }
    } catch (err : any) {  
      setError(err.response?.data?.message || 'An error occurred during purchase.'); 
    }  
  }

  if (loading) {
    <>
      <div className="loading-spinner"></div>
      <span>در حال جستجو...</span>
    </>
  }
  return (
    <>
    <Navbar />
    <div className="podcast-container">
      <div className="podcast-header">
        <div className="podcast-cover">
          <img src={podcast?.banner || 'https://via.placeholder.com/200'} alt="Podcast Cover" />
        </div>
        <div className="podcast-details">
          <h1>{podcast?.name}</h1>
          <p className="podcast-author">گوینده: {podcast?.publisher}</p>
          <p>دنبال کننده‌‌ها: {podcast?.subscribersCount.toLocaleString()} &nbsp;</p>
           <p>توضیحات : {podcast?.description}</p>
          <div className="podcast-actions">

            {user && userRole != "SuperAdmin" &&
          <button
              className={`subscribe-btn ${podcast?.is_subscribed ? "unsubscribe-btn" : ""}`}
              onClick={handleSubscribe}
            >
              {isSubscribed ? "لغو دنبال کردن" : "دنبال کردن"}
            </button>
          } 
          {userRole != "SuperAdmin" &&
            <button className="share-btn" 
            onClick={() => {
              const generatedLink = `https://cesaiust.ir/podcast/${podcast?.id}`; // Replace with your logic to generate the link
              navigator.clipboard
                .writeText(generatedLink)
                .then(() => alert("کپی شد."))
                .catch((err) => console.error("Failed to copy: ", err));
            }}
            >اشتراک</button>
        }
        {user && userRole == "SuperAdmin" && 
        <>
        <button onClick={() => navigate(`/EditPodcast/${id}`)} style={{marginRight : '0'}} className="share-btn">ویرایش</button>
        <button onClick={() => handleDeleteClick()}  className="share-btn">حذف پادکست</button>
        </>

        }
          </div>
        </div>
      </div>
         
      <div className="podcast-content">
        <div className="episodes-list">
        {userRole === "SuperAdmin" &&
          <button  className='addepisode-button' onClick={() => navigate(`/podcasts/${id}/addepisodes`)}>
          <i className="fa fa-plus"  style={{ color: 'white' }}></i>
          </button>
          }
          {episodes && episodes.map((episode) => (
            <div className="episode-card" key={episode.id}>
              <div className="episode-info">
                <img src={episode.banner || 'https://via.placeholder.com/60'} alt="Episode Cover" />
                <div>
                  <h3>{episode.name}</h3>
                  <p>                     
                    {new Date(episode.createdAt).toLocaleDateString("fa-IR", {  
                          weekday: "long",  
                          day: "numeric",  
                          month: "long",  
                        })}   &nbsp;|&nbsp; {episode.publisher}</p>
                </div>
              </div>
              {(user && userRole != "SuperAdmin" ) || !user &&
              <a href={episode.audio} target="_blank" rel="noopener noreferrer">
                <i className="fa fa-arrow-circle-o-down" aria-hidden="true"></i>
              </a>
                }
              {user && userRole == "SuperAdmin" &&
              <div className="podcast-menu-container">
              <span className="podcast-three-dots">⋮</span>
              <div className="podcast-menu">
                <button onClick={() => navigate(`/EditEpisode/${episode.id}`)}>ویرایش</button>
                <button onClick={() => handleDeleteEpisode(episode.id)}>حذف</button>
                <a href={episode.audio} target="_blank" rel="noopener noreferrer">
                <button>دانلود
                  
                </button>
                </a>
              </div>
            </div>
            }
      
            </div>
          ))}
          {episodes.length === 0 && 
            <h4>اپیزودی برای این پادکست وجود ندارد </h4>
          }
        </div>
        

        {/* Right Column */}
        <Comments postId ={podcast?.id} />
      </div>
      <PopupQuestion   
                  isVisible={isModalVisible}  
                  message = "آیا از حذف این پادکست اطمینان دارید؟"
                  onConfirm={handleConfirmDelete}  
                  onCancel={handleCancelDelete}  
                />  

    </div>
    <Footer/>
    </>
  );
};

export default PodcastDetail;
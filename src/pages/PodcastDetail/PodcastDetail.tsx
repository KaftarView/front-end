import React, { useEffect, useState } from 'react';
import './PodcastInfo.css';
import Comments from './Comments'; './Comments'
import apiClient from '../../utils/apiClient'
import {User , useAuth} from '../../components/AuthContext'


interface PodcastDetail {
  id: number;
  created_at: string;
  name: string;
  description: string;
  banner: string;
  publisher: string;
  categories: string[];
  subscribers_count: number;
}

interface Episode {
  id: number;
  created_at: string;
  name: string;
  description: string;
  banner: string;
  audio: string;
  publisher: string;
}

const PodcastDetail: React.FC = () => {
  const [podcast, setPodcast] = useState<PodcastDetail | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [user, setUser] = useState<User | null>(null); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with your actual API endpoints
        const podcastResponse = await apiClient.get('/v1/public/podcasts/4' , {
        headers: {"ngrok-skip-browser-warning": "69420",
        'Content-Type': 'application/json' },}
        );
        const episodesResponse = await apiClient.get('/v1/public/podcasts/4/episodes' , {
          headers: {"ngrok-skip-browser-warning": "69420",
          'Content-Type': 'application/json' },}
          );
        setPodcast(podcastResponse.data.data);
        setEpisodes(episodesResponse.data.data);
        console.log(episodes)
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
        await apiClient.delete("/v1/podcasts/4");
        setIsSubscribed(false);
        if (podcast) {
          setPodcast({
            ...podcast,
            subscribers_count: podcast.subscribers_count - 1,
          });
        }
      } catch (error) {
        console.error("Error unsubscribing:", error);
      }
    } else {
      try {
        await apiClient.post("/v1/podcasts/4");
        setIsSubscribed(true);
        if (podcast) {
          setPodcast({
            ...podcast,
            subscribers_count: podcast.subscribers_count + 1,
          });
        }
      } catch (error) {
        console.error("Error subscribing:", error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="podcast-container">
      {/* Top Section */}
      <div className="podcast-header">
        <div className="podcast-cover">
          <img src={podcast?.banner || 'https://via.placeholder.com/200'} alt="Podcast Cover" />
        </div>
        <div className="podcast-details">
          <h1>{podcast?.name}</h1>
          <p className="podcast-author">گوینده: {podcast?.publisher}</p>
          <p>دنبال کننده‌‌ها: {podcast?.subscribers_count.toLocaleString()} &nbsp;</p>
          <div className="podcast-actions">
            {user && 
          <button
              className={`subscribe-btn ${isSubscribed ? "unsubscribe-btn" : ""}`}
              onClick={handleSubscribe}
            >
              {isSubscribed ? "لغو دنبال کردن" : "دنبال کردن"}
            </button>
          } 
            <button className="share-btn">اشتراک</button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="podcast-content">
        {/* Left Column */}
        <div className="episodes-list">
          {episodes.map((episode) => (
            <div className="episode-card" key={episode.id}>
              <div className="episode-info">
                <img src={episode.banner || 'https://via.placeholder.com/60'} alt="Episode Cover" />
                <div>
                  <h3>{episode.name}</h3>
                  <p>                     
                    {new Date(episode.created_at).toLocaleDateString("fa-IR", {  
                          weekday: "long",  
                          day: "numeric",  
                          month: "long",  
                        })}   &nbsp;|&nbsp; {episode.publisher}</p>
                </div>
              </div>
              <a href={episode.audio} target="_blank" rel="noopener noreferrer">
                <i className="fa fa-arrow-circle-o-down" aria-hidden="true"></i>
              </a>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <Comments />
      </div>
    </div>
  );
};

export default PodcastDetail;
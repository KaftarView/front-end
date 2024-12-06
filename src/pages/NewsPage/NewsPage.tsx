import React, { useState , useEffect } from 'react';
import './NewsPage.css';
import axios from 'axios';  
import Navbar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import Modal from '../../components/PopupQuestion/PopopQuestion';
import PopupQuestion from '../../components/PopupQuestion/PopopQuestion';
import mockNews from './mockNews';
import {useAppContext} from '../../components/AppContext'
import { useNavigate } from 'react-router-dom';

export interface NewsOverall {  
  ID: number;  
  Title: string;  
  Description: string;  
  CreatedAt: string;  
  UpdatedAt: string;  
  Author: string;  
  Categories : string[];
}  

const NewsPage: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [newsList, setNewsList] = useState<NewsOverall[]>([]); 
  const [currentNewsId , setCurrentNewsId] = useState<number | null>(null); 
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [loading, setLoading] = useState<boolean>(true);  
  const [error, setError] = useState<string | null>(null); 
  const { backendUrl, setBackendUrl } = useAppContext(); 
  const navigate = useNavigate();

  const newList = [
    { id: 1, title: 'اخبار جدید', summary: 'در روزهای آتی برنامه ای...', image: '../../public/news.jpg' ,publishDate: "December 4, 2024", },
    { id: 2, title: 'اخبار جدید', summary: 'در روزهای آتی برنامه ای...', image: '../../public/news.jpg' ,publishDate: "December 4, 2024", },
  ];
  useEffect(() => {  
    const fetchNews = async () => {  
      setLoading(true); 
      try {  
        const categories = filter ? [filter] : []; 
        console.log(categories);  
        const response = await axios.post(`${backendUrl}/v1/news/filtered`, {  
          categories: categories,
        });  
        console.log(response.data.data);  
        if (response.data.statusCode === 200) {  
          setNewsList(response.data.data);  
          console.log(newsList)
        } else {  
          setError('Failed to fetch news'); 
          setNewsList(mockNews);   
        }  
      } catch (err) {  
        console.error(err);
        setError('An error occurred while fetching news');  
        setNewsList(mockNews);  
      } finally {  
        setLoading(false);  
      }  
    };  

    fetchNews();  
  }, [filter]);  
  const deleteNewsById = async (newsId: number) => {  
    try {  
      await axios.delete(`/news/${newsId}`);  
      console.log('News deleted successfully');  
      setNewsList((prevNewsList) => prevNewsList.filter((news) => news.ID !== newsId));  
      setIsModalVisible(false);  
    } catch (error) {  
      console.error('Error deleting news:', error);  
    }  
  };  

  const handleDeleteClick = (newsId: number) => {  
    setCurrentNewsId(newsId);  
    setIsModalVisible(true);  
  };  

  const handleConfirmDelete = () => {  
    if (currentNewsId !== null) {  
      deleteNewsById(currentNewsId);  
    }  
  };  

  const handleCancelDelete = () => {  
    setIsModalVisible(false);  
    setCurrentNewsId(null);  
  };  

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  return (
    <>
    <Navbar />
    <div className='news-page-container'>
    <div className="news-page">
      <div className="center-div">
      <div className="filter-search">
  <div className="search-box">
    <input
      type="text"
      placeholder="جستجو..."
      value={search}
      onChange={handleSearchChange}
      className="search-input"
    />
    <span className="search-icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
        <path d="M10 18a8 8 0 1 1 5.293-2.707l5.707 5.707-1.414 1.414-5.707-5.707A8 8 0 0 1 10 18zm0-14a6 6 0 1 0 6 6 6 6 0 0 0-6-6z" />
      </svg>
    </span>
  </div>
  <select value={filter} onChange={handleFilterChange} className="filter-dropdown">
    <option value="">همه</option>
    <option value="To">Latest</option>
    <option value="public">Popular</option>
  </select>
</div>
      <button  className='addnews-button' onClick={() => navigate('/add-news')}>
      <i className="fa fa-plus"  style={{ color: 'white' }}></i>
      </button>
        <div className="news-container">
          {newsList.map((news) => (
            <div key={news.ID} className="news-box">
              <div className="news-options">
                <span className="three-dots">⋮</span>
                <div className="options-menu">
                  <button>ویرایش</button>
                  <button onClick={() => handleDeleteClick(news.ID)}>حذف</button> 
                </div>
              </div>
                <img src='../../public/news.jpg' alt={news.Title} className="news-image" />
              <div className="news-summary">
                <h3>{news.Title}</h3>
                <p>{news.Description}</p>
                <span className="news-publish-date">انتشار :              
                {new Date(news.CreatedAt).toLocaleDateString("fa-IR", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}</span>
              </div>
            </div>

          ))}
          <PopupQuestion   
                  isVisible={isModalVisible}  
                  message = "آیا از حذف این خبر اطمینان دارید؟"
                  onConfirm={handleConfirmDelete}  
                  onCancel={handleCancelDelete}  
                />  
        </div>
      </div>
    </div>
    </div>
    <Footer />
    </>
  );
};

export default NewsPage;

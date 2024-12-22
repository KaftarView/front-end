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
import apiClient from '../../utils/apiClient';
import {useAuth} from '../../components/AuthContext';
import fetchCategories, { Categories } from "../../components/Categories/GetCategories";

export interface NewsOverall {  
  id: number;  
  title: string;  
  description: string;  
  CreatedAt: string;  
  UpdatedAt: string;  
  author: string;  
  categories : string[];
}  

const NewsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 3;
  const [hasMoreEvents, setHasMoreEvents] = useState<boolean>(true);
  const [filter, setFilter] = useState('');
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const [newsList, setNewsList] = useState<NewsOverall[]>([]); 
  const [currentNewsId , setCurrentNewsId] = useState<number | null>(null); 
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [loading, setLoading] = useState<boolean>(true);  
  const [error, setError] = useState<string | null>(null); 
  const { backendUrl, setBackendUrl } = useAppContext(); 
  const [categories, setCategories] = useState<Categories>();
  const { getUserRoles } = useAuth();
  const userRole = getUserRoles()[0];
  const navigate = useNavigate();

  const newList = [
    { id: 1, title: 'اخبار جدید', summary: 'در روزهای آتی برنامه ای...', image: '../../public/news.jpg' ,publishDate: "December 4, 2024", },
    { id: 2, title: 'اخبار جدید', summary: 'در روزهای آتی برنامه ای...', image: '../../public/news.jpg' ,publishDate: "December 4, 2024", },
  ];

  const fetchNews = async (page: number, pageSize: number, searchQuery?: string, filterValue?: string) => {
    setLoading(true);
    try {
      let path = "/v1/public/news";

      if (searchQuery) {
        path = `/v1/public/news/search?query=${searchQuery}`;
      }

      else if (filterValue && filterValue !== 'all') {
        path = `/v1/public/news/filter?categories=${filterValue}`;
      }

      path += `${path.includes('?') ? '&' : '?'}page=${page}&pageSize=${pageSize}`;

      const response = await apiClient.get(path, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200 && response.data) {
        const processedNews = response.data.data.map((news: NewsOverall) => ({
          ...news,
        }));
        setNewsList(processedNews);
        setHasMoreEvents(processedNews.length === pageSize);
      }
    } catch (err) {
      setError('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchNews(currentPage , pageSize)
   },[])

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        if (data.statusCode == 200) {
          setCategories({ categories: data.data });
        }
      } catch (error) {
        setError('Failed to load user data.');
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const deleteNewsById = async (newsId: number) => {  
    try {  
      await axios.delete(`/news/${newsId}`);  
      console.log('News deleted successfully');  
      setNewsList((prevNewsList) => prevNewsList.filter((news) => news.id !== newsId));  
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

  const handleSearch = (searchValue: string) => {
    setQuery(searchValue);
    setFilter('all'); 
    setCurrentPage(1); 
    if (searchValue) {
      fetchNews(1, pageSize, searchValue);
    } else {
      fetchNews(1, pageSize); 
    }
  };


  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);
    setQuery('');
    setCurrentPage(1);
    fetchNews(1, pageSize, undefined, selectedFilter);
  };
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchNews(newPage, pageSize, query || undefined, filter !== 'all' ? filter : undefined);
  };

  return (
    <>
    <Navbar />
    <div className='news-page-container'>
    <div className="news-page">
      <div className="center-div">
      <div className="filter-search">
      {userRole === "SuperAdmin" &&
      <button  className='addnews-button' onClick={() => navigate('/add-news')}>
      <i className="fa fa-plus"  style={{ color: 'white' }}></i>
      </button>
      }
  <div className="search-box">
    <input
      type="text"
      placeholder="جستجو..."
      value={query}
      onChange={(e) => handleSearch(e.target.value)}
      className="search-input"
    />
    <span className="search-icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
        <path d="M10 18a8 8 0 1 1 5.293-2.707l5.707 5.707-1.414 1.414-5.707-5.707A8 8 0 0 1 10 18zm0-14a6 6 0 1 0 6 6 6 6 0 0 0-6-6z" />
      </svg>
    </span>
    
  </div>
      <select
        id="dropdown"
        name="options"
        value={filter}
        onChange={handleFilterChange}
      >
        <option value='all'>همه</option>
        {categories && categories.categories && categories.categories.length > 0 ? (
          categories.categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))
        ) : (
          <option disabled>No categories available</option>
        )}
      </select>

</div>

        <div className="news-container">
          { !loading && newsList.length > 0 && newsList.map((news) => (
            <div key={news.id} className="news-box">
              {userRole === "SuperAdmin" && 
              <div className="news-options">
                <span className="three-dots">⋮</span>
                <div className="options-menu">
                  <button>ویرایش</button>
                  <button onClick={() => handleDeleteClick(news.id)}>حذف</button> 
                </div>
              </div>
              }
                <img src='../../public/news.jpg' alt={news.title} className="news-image" />
              <div className="news-summary">
                <h3>{news.title}</h3>
                <p>{news.description}</p>
                <span className="news-publish-date">نویسنده :              
          {news.author}</span>
              </div>
            </div>

          ))}
          {!loading && newsList.length === 0 && 
          <div>خبری وجود ندارد</div>
          }
          {loading && <div>در حال بارگذاری...</div>}
          <PopupQuestion   
                  isVisible={isModalVisible}  
                  message = "آیا از حذف این خبر اطمینان دارید؟"
                  onConfirm={handleConfirmDelete}  
                  onCancel={handleCancelDelete}  
                />  
                </div>
                <div className="paging-div-news">
            <nav aria-label="Page navigation example">
              <ul className="inline-flex -space-x-px text-sm">
                <li>
                  <a
                    href="#"
                    className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-700 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-900 ${!hasMoreEvents ? 'cursor-not-allowed opacity-50' : ''}`}
                    onClick={() => hasMoreEvents && handlePageChange(currentPage + 1)}
                  >
                    بعد
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-700 bg-white border border-e-0 border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-900 ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                  >
                    قبل
                  </a>
                </li>
              </ul>
            </nav>
          </div>
      </div>
    </div>
    </div>
    <Footer />
    </>
  );
};

export default NewsPage;

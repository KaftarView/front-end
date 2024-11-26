import React, { useState } from 'react';
import './NewsPage.css';
import Navbar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

const NewsPage: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');

  const newsList = [
    { id: 1, title: 'اخبار جدید', summary: 'در روزهای آتی برنامه ای...', image: '../../public/news.jpg' },
    { id: 2, title: 'اخبار جدید', summary: 'در روزهای آتی برنامه ای...', image: '../../public/news.jpg' },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  return (
    <>
    <Navbar />
    <div className="news-page">
      <div className="center-div">
      <div className="filter-search">
  <div className="search-box">
    <input
      type="text"
      placeholder="Search..."
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
    <option value="">All</option>
    <option value="latest">Latest</option>
    <option value="popular">Popular</option>
  </select>
</div>
        <div className="news-container">
          {newsList.map((news) => (
            <div key={news.id} className="news-box">
              <div className="news-options">
                <span className="three-dots">⋮</span>
                <div className="options-menu">
                  <button>Edit</button>
                  <button>Delete</button>
                </div>
              </div>
                <img src={news.image} alt={news.title} className="news-image" />
              <div className="news-summary">
                <h3>{news.title}</h3>
                <p>{news.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default NewsPage;

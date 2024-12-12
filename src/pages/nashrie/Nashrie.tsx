import React from 'react';
import './Nashrie.css';

interface Magazine {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPrice: number;
  rating: number;
  issue: string;
  imageUrl: string;
  authors : string[];
}

const magazines: Magazine[] = [
  {
    id: 1,
    title: "Magazine Title 1",
    description: "Brief description of Magazine 1.",
    price: 99000,
    discountPrice: 29700,
    rating: 4.5,
    issue: "Issue 13",
    imageUrl: "https://via.placeholder.com/150",
    authors : ["علی" , "رضا"],
  },
  {
    id: 2,
    title: "Magazine Title 2",
    description: "Brief description of Magazine 2.",
    price: 99000,
    discountPrice: 29700,
    rating: 4.7,
    issue: "Issue 2",
    imageUrl: "https://via.placeholder.com/150",
    authors : ["علی" , "رضا"],
  },
  {
    id: 3,
    title: "Magazine Title 3",
    description: "Brief description of Magazine 3.",
    price: 99000,
    discountPrice: 29700,
    rating: 4.2,
    issue: "Issue 3",
    imageUrl: "https://via.placeholder.com/150",
    authors : ["علی" , "رضا"],
  },
  {
    id: 4,
    title: "Magazine Title 4",
    description: "Brief description of Magazine 4.",
    price: 99000,
    discountPrice: 29700,
    rating: 4.3,
    issue: "Issue 1",
    imageUrl: "https://via.placeholder.com/150",
    authors : ["علی" , "رضا"],
  },
  {
    id: 5,
    title: "Magazine Title 5",
    description: "Brief description of Magazine 5.",
    price: 99000,
    discountPrice: 29700,
    rating: 4.0,
    issue: "Issue 5",
    imageUrl: "https://via.placeholder.com/150",
    authors : ["علی" , "رضا"],
  },
];

const MagazineList: React.FC = () => {
    return (
        <>
        <div className='mag-page-container'>
        <div className="mag-page">
          <div className="mag-center-div">
          <div className="mag-filter-search">
      <div className="mag-search-box">
        <input
          type="text"
          placeholder="جستجو..."
        //   value={search}
        //   onChange={handleSearchChange}
          className="mag-search-input"
        />
        <span className="mag-search-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
            <path d="M10 18a8 8 0 1 1 5.293-2.707l5.707 5.707-1.414 1.414-5.707-5.707A8 8 0 0 1 10 18zm0-14a6 6 0 1 0 6 6 6 6 0 0 0-6-6z" />
          </svg>
        </span>
      </div>
      <select className="mag-filter-dropdown">
        <option value="">همه</option>
        <option value="To">Latest</option>
        <option value="public">Popular</option>
      </select>
    </div>
          <button  className='addmag-button'>
          <i className="fa fa-plus"  style={{ color: 'white' }}></i>
          </button>
            <div className="mags-container">
            <div className="magazine-grid">
            {magazines.map((magazine) => (
          <div key={magazine.id} className="magazine-card">
            <img src={magazine.imageUrl} alt={magazine.title} className="magazine-image" />
            <div className="magazine-content">
              <h2>{magazine.title}</h2>
              <div className='mag-author-div'>
                {magazine.authors.map ((author) => (<p>{author},</p>))}
                </div>
              <p className="magazine-price">
                <span className="discount-price">{magazine.discountPrice.toLocaleString()} تومان</span>
              </p>
            </div>
          </div>
        ))}
             </div>
            </div>
          </div>
        </div>
        </div>
        </>
      );
    };

export default MagazineList;

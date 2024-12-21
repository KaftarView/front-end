import React from "react";
import "./Podcast.css";
import Navbar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
interface Podcast {
  imageSrc: string;
  title: string;
  description: string;
}

const podcastData: Podcast[] = [
  {
    imageSrc: "../../public/podcast.png",
    title: "The Joe Rogan Experience",
    description: "A podcast hosted by Joe Rogan with diverse guests.",
  },
  {
    imageSrc: "../../public/podcast.png",
    title: "Crime Junkie",
    description: "True crime stories and mystery cases.",
  },
  {
    imageSrc: "../../public/podcast.png",
    title: "How I Built This",
    description: "Interviews with entrepreneurs and innovators.",
  },
  {
    imageSrc: "../../public/podcast.png",
    title: "The Daily",
    description: "A daily news podcast by The New York Times.",
  },
  {
    imageSrc: "../../public/podcast.png",
    title: "Crime Junkie",
    description: "True crime stories and mystery cases.",
  },
  {
    imageSrc: "../../public/podcast.png",
    title: "How I Built This",
    description: "Interviews with entrepreneurs and innovators.",
  },
  {
    imageSrc: "../../public/podcast.png",
    title: "The Daily",
    description: "A daily news podcast by The New York Times.",
  },
];

const PodcastPage: React.FC = () => {
  return (
    <>
    <Navbar />
    <div className="podcasts-header">
     <nav className="podcast-nav" >
     <div className="filter-search-podcast">
  <div className="search-box-podcast">
    <input
      type="text"
      placeholder="جستجو..."
    //   value={search}
    //   onChange={handleSearchChange}
      className="search-input-podcast"
    />
    <span className="search-icon-podcast">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
        <path d="M10 18a8 8 0 1 1 5.293-2.707l5.707 5.707-1.414 1.414-5.707-5.707A8 8 0 0 1 10 18zm0-14a6 6 0 1 0 6 6 6 6 0 0 0-6-6z" />
      </svg>
    </span>
  </div>
  <select  className="filter-dropdown-podcast">
    <option value="">همه</option>
    <option value="To">Latest</option>
    <option value="public">Popular</option>
  </select>
</div>
     </nav>
    </div>
    <div className="podcast-container">
       
      <h1 className="podcast-title">پادکست ها</h1>

      <div className="podcast-grid">
        {podcastData.map((podcast, index) => (
          <div key={index} className="podcast-card">
            <img src={podcast.imageSrc} alt={podcast.title} className="podcast-image" />
            <div className="podcast-overlay">
              <p className="podcast-description">{podcast.description}</p>
            </div>
            <div className="podcast-footer">
              <h3>{podcast.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default PodcastPage;

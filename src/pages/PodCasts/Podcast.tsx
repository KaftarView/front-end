import React , {useState , useEffect}from "react";
import "./Podcast.css";
import Navbar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import fetchCategories, { Categories } from "../../components/Categories/GetCategories";
import apiClient from '../../utils/apiClient'
import {Link} from 'react-router-dom'
import {useAuth} from '../../components/AuthContext'
import {useNavigate} from 'react-router-dom'
interface Podcast {
  id: number;
  name: string;
  description: string;
  banner :string;
  publisher :string;
  categories :string[];
  subscribers_count : number;
}

// const podcastData: Podcast[] = [
//   {
//     banner: "../../public/podcast.png",
//     name: "The Joe Rogan Experience",
//     description: "A podcast hosted by Joe Rogan with diverse guests.",
//   },
//   {
//     banner: "../../public/podcast.png",
//     name: "Crime Junkie",
//     description: "True crime stories and mystery cases.",
//   },
//   {
//     imageSrc: "../../public/podcast.png",
//     title: "How I Built This",
//     description: "Interviews with entrepreneurs and innovators.",
//   },
//   {
//     imageSrc: "../../public/podcast.png",
//     title: "The Daily",
//     description: "A daily news podcast by The New York Times.",
//   },
//   {
//     imageSrc: "../../public/podcast.png",
//     title: "Crime Junkie",
//     description: "True crime stories and mystery cases.",
//   },
//   {
//     imageSrc: "../../public/podcast.png",
//     title: "How I Built This",
//     description: "Interviews with entrepreneurs and innovators.",
//   },
//   {
//     imageSrc: "../../public/podcast.png",
//     title: "The Daily",
//     description: "A daily news podcast by The New York Times.",
//   },
// ];
const PodcastPage: React.FC = () => {
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string>('');
const [categories, setCategories] = useState<Categories>();
const [filter, setFilter] = useState<string>('all');
const [currentPage, setCurrentPage] = useState<number>(1);
const pageSize = 3;
const [hasMoreEvents, setHasMoreEvents] = useState<boolean>(true);
const[query , setQuery] = useState<string>('')
const[podcasts , setPodcasts] = useState<Podcast[]>([])
const { getUserRoles } = useAuth();
const userRole = getUserRoles()[0];
const navigate = useNavigate()
console.log(userRole)

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

const fetchData = async (page: number, pageSize: number, searchQuery?: string, filterValue?: string) => {
  setLoading(true);
  try {
    let path = "/v1/public/podcasts";

    if (searchQuery) {
      path = `/v1/public/podcasts/search?query=${searchQuery}`;
    }

    else if (filterValue && filterValue !== 'all') {
      path = `/v1/public/podcasts/filter?categories=${filterValue}`;
    }

    path += `${path.includes('?') ? '&' : '?'}page=${page}&pageSize=${pageSize}`;

    const response = await apiClient.get(path, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200 && response.data) {
      console.log(response.data.data)
      const processedPodcasts = response.data.data.map((podcast: Podcast) => ({
        ...podcast,
      }));
      setPodcasts(processedPodcasts);
      setHasMoreEvents(processedPodcasts.length === pageSize);
    }
  } catch (err) {
    setError('Failed to fetch events');
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
  fetchData(currentPage, pageSize);
}, []);
const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const selectedFilter = e.target.value;
  setFilter(selectedFilter);
  setQuery(''); 
  setCurrentPage(1);
  fetchData(1, pageSize, undefined, selectedFilter);
};

const handlePageChange = (newPage: number) => {
  setCurrentPage(newPage);
  // Use current search or filter state
  fetchData(newPage, pageSize, query || undefined, filter !== 'all' ? filter : undefined);
};

const handleSearch = (searchValue: string) => {
  setQuery(searchValue);
  setFilter('all'); 
  setCurrentPage(1); 
  if (searchValue) {
    fetchData(1, pageSize, searchValue);
  } else {
    fetchData(1, pageSize); 
  }
};


  return (
    <>
    <Navbar />
    <div className="podcasts-header">
     <nav className="podcast-nav" >
     <div className="filter-search-podcast">
  <div className="search-box-podcast">
  <input
                  type="text"
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="جستجو..."
                  className="search-input-podcast"
                />
    <span className="search-icon-podcast">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
        <path d="M10 18a8 8 0 1 1 5.293-2.707l5.707 5.707-1.414 1.414-5.707-5.707A8 8 0 0 1 10 18zm0-14a6 6 0 1 0 6 6 6 6 0 0 0-6-6z" />
      </svg>
    </span>
  </div>
      <select 
      className="filter-dropdown-podcast"
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
{userRole === "SuperAdmin" &&
              <button className='add-button' onClick={() => navigate('/addpodcast')}>ایجاد پادکست</button>
            }
     </nav>
    </div>
    <div className="podcast-container">
       
      <h1 className="podcast-title">پادکست ها</h1>

      <div className="podcast-grid">
        {!loading && podcasts.map((podcast, index) => (
        <Link to={`/podcast/${podcast.id}`} key={podcast.id} className="square-link">
          <div key={index} className="podcast-card">
            <img src={podcast.banner} alt={podcast.name} className="podcast-image" />
            <div className="podcast-overlay">
              <p className="podcast-description">{podcast.description}</p>
            </div>
            <div className="podcast-footer">
              <h3>{podcast.name}</h3>
            </div>
          </div>
          </Link>
        ))}
        

      </div>
      {loading && <div>در حال بارگزاری...</div>}
    </div>
    <div className="paging-div">
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
    <Footer />
    </>
  );
};

export default PodcastPage;

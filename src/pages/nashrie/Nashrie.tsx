import React , {useEffect , useState} from 'react';
import './Nashrie.css';
import Navbar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import apiClient from '../../utils/apiClient'
import {useAuth} from '../../components/AuthContext'
import {useNavigate} from 'react-router-dom'

interface Magazine {
  id: number;  
  name: string;  
  description: string;  
  banner: string;  
  journal_file: string;  
  author: string; 
}

const magazines: Magazine[] = [
  {
    id: 1,
    name: "مجله",
    description: "Brief description of Magazine 1.",
    banner: '../../public/magCover.jpg',
    journal_file : "",
    author : "ali",
  },
];

const MagazineList: React.FC = () => {
  const [magazines, setMagazines] = useState<Magazine[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 1;
  const [hasMoreEvents, setHasMoreEvents] = useState<boolean>(true);
  const [query, setQuery] = useState('');
  const [error , setError] = useState('');
  const { getUserRoles } = useAuth();
  const userRole = getUserRoles()[0];
  const navigate = useNavigate()


  const fetchData = async (page: number, pageSize: number, searchQuery?: string) => {
    setLoading(true);
    try {
      let path = '/v1/public/journals';

      if (searchQuery) {
        path =`/v1/public/journals/search?query=${searchQuery}`;
      }

      path += `${path.includes('?') ? '&' : '?'}page=${page}&pageSize=${pageSize}`;

      const response = await apiClient.get(path, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200 && response.data) {
        const processedMagazine = response.data.data.map((magazine: Magazine) => ({
          ...magazine,
        }));
        console.log(processedMagazine)
        setMagazines(processedMagazine);
        setHasMoreEvents(processedMagazine.length === pageSize);
      }
    } catch (err) {
      setError('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

    // const fetchData = async () => {
    //   try {
    //     const response = await apiClient.get('/v1/public/journals' , {
    //     headers: {"ngrok-skip-browser-warning": "69420",
    //     'Content-Type': 'application/json' },}
    //     );

    //     console.log(response.data.data)
    //     setMagazines(response.data.data)
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

  useEffect(() => {
    fetchData(currentPage , pageSize);
  }, []);

  const handleSearch = (searchValue: string) => {
    setQuery(searchValue);
    setCurrentPage(1); 
    if (searchValue) {
      fetchData(1, pageSize, searchValue);
    } else {
      fetchData(1, pageSize); 
    }
  };
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchData(newPage, pageSize, query || undefined);
  };



  // if (loading) {
  //   return <div>Loading...</div>;
  // }
    return (
        <>
        <Navbar />
        <div className='mag-page-container'>
        <div className="mag-page">
          <div className="mag-center-div">
          <div className="mag-filter-search">
            {userRole === "SuperAdmin" && 
          <button onClick={() => navigate('/addnashriye')}  className='addmagazine-button'>    
      <i className="fa fa-plus"  style={{ color: 'white' }}></i>
      </button>
      }
      <div className="mag-search-box">
        <input
          type="text"
          placeholder="جستجو..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="mag-search-input"
        />
        <span className="mag-search-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
            <path d="M10 18a8 8 0 1 1 5.293-2.707l5.707 5.707-1.414 1.414-5.707-5.707A8 8 0 0 1 10 18zm0-14a6 6 0 1 0 6 6 6 6 0 0 0-6-6z" />
          </svg>
        </span>
      </div>
    </div>
          <button  className='addmag-button'>
          <i className="fa fa-plus"  style={{ color: 'white' }}></i>
          </button>
            <div className="mags-container">
            <div className="magazine-grid">
              {loading &&
                <div>Loading...</div>
              }
            
            { !loading && magazines && magazines.map((magazine) => (
          <div key={magazine.id} className="magazine-card">
            <img src={magazine.banner} alt={magazine.name} className="magazine-image" />
            <div className="magazine-content">
              <h2>{magazine.name}</h2>
              {/* <div className='mag-author-div'>
                {magazine.authors.map ((author) => (<p>{author},</p>))}
                </div> */}
              <p className="magazine-price">
                <span className="discount-price">نویسنده : {magazine.author}</span>
              </p>
              <a href={magazine.journal_file}>
              <i className="fa fa-download" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        ))}
        {!loading && !magazines && 
        <p>مجله ای یافت نشد</p>
        }

             </div>
            </div>
            <div className="paging-div-nashrie">
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

export default MagazineList;

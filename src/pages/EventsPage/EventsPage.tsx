import './EventsPage.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import { useAppContext } from '../../components/AppContext';
import apiClient from "../../utils/apiClient"
import { useNavigate } from "react-router-dom";
import fetchCategories, { Categories } from "../../components/Categories/GetCategories";
import { useAuth } from '../../components/AuthContext'

interface Event {
  id: number;
  banner: string;
  name: string;
  description: string;
  location: string;
  status: string;
  venue_type: string;
  categories: string[];
  created_at: string;
  from_date: string;
  to_date: string;
  base_price: number;
}

const EventsPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 2;
  const [hasMoreEvents, setHasMoreEvents] = useState<boolean>(true);
  const [mockEvents, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(mockEvents);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { backendUrl } = useAppContext();
  const [categories, setCategories] = useState<Categories>();
  const { getUserRoles } = useAuth();
  const [query, setQuery] = useState('');
  const userRole = getUserRoles()[0];
  const navigate = useNavigate();

  // Load categories on mount
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


  const fetchEvents = async (page: number, pageSize: number, searchQuery?: string, filterValue?: string) => {
    setLoading(true);
    try {
      let path = userRole === "SuperAdmin" ? "/v1/events" : "/v1/public/events/published";

      if (searchQuery) {
        path = userRole === "SuperAdmin" 
          ? `/v1/events/search?query=${searchQuery}` 
          : `/v1/public/events/search?query=${searchQuery}`;
      }

      else if (filterValue && filterValue !== 'all') {
        path = userRole === "SuperAdmin"
          ? `/v1/events/filter?categories=${filterValue}`
          : `/v1/public/events/filter?categories=${filterValue}`;
      }

      path += `${path.includes('?') ? '&' : '?'}page=${page}&pageSize=${pageSize}`;

      const response = await apiClient.get(path, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200 && response.data) {
        const processedEvents = response.data.data.map((event: Event) => ({
          ...event,
        }));
        setEvents(processedEvents);
        setFilteredEvents(processedEvents);
        setHasMoreEvents(processedEvents.length === pageSize);
      }
    } catch (err) {
      setError('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchValue: string) => {
    setQuery(searchValue);
    setFilter('all'); 
    setCurrentPage(1); 
    if (searchValue) {
      fetchEvents(1, pageSize, searchValue);
    } else {
      fetchEvents(1, pageSize); 
    }
  };

  // Handle filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);
    setQuery(''); // Clear search when filtering
    setCurrentPage(1); // Reset to first page
    fetchEvents(1, pageSize, undefined, selectedFilter);
  };

  // Handle page changes
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // Use current search or filter state
    fetchEvents(newPage, pageSize, query || undefined, filter !== 'all' ? filter : undefined);
  };

  // Initial load
  useEffect(() => {
    fetchEvents(currentPage, pageSize);
  }, []);

  // if (loading) {
  //   return <div>Loading events...</div>;
  // }

  return (
    <>
      <Navbar />
      <div className="events-page-container">
        <div className="events-body">
          <nav className="nav-events-page">
            <div className='events-search-filter-div'>
              <div className='dropdown-div'>
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
              <div className='events-search-box'>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="جستجو..."
                  className="events-search-input"
                />
                <span className="events-search-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                    <path d="M10 18a8 8 0 1 1 5.293-2.707l5.707 5.707-1.414 1.414-5.707-5.707A8 8 0 0 1 10 18zm0-14a6 6 0 1 0 6 6 6 6 0 0 0-6-6z" />
                  </svg>
                </span>
              </div>
            </div>
            {userRole === "SuperAdmin" &&
              <button className='add-button' onClick={()=>navigate('/addevent')} >ایجاد رویداد</button>
            }
          </nav>
          {!loading &&  
          <div className="square-container">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <Link to={`/event/${event.id}`} key={event.id} className="square-link">
                  <div className="square">
                    <div>
                      <img
                        className="card-image"
                        src={event.banner}
                      />
                    </div>
                    <div className="card-info">
                      <small>
                        {new Date(event.from_date).toLocaleDateString("fa-IR", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                        })}
                      </small>
                      <h3>{event.name}</h3>
                      <div className='events-descriptin-div'>
                        <p>{event.description}</p>
                      </div>
                      <div className="icon-div">
                        <i className="fa fa-money" aria-hidden="true"></i>
                        <p>از{event.base_price} هزار تومان</p>
                      </div>
                      <div className="icon-div">
                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                        <p>{event.venue_type === "Online" ? "آنلاین" : "حضوری"}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="no-events">رویدادی یافت نشد</p>
            )}
          </div>
          }
          {loading &&
          <div>Loading events...</div>
          }
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
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EventsPage;
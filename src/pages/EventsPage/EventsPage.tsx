import './EventsPage.css';
import { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockEvents, Event } from './mockEvents';
// import Footer from '../Fototer/Footer';
// import Navbar from '../NavBar/NavBar';
const EventsPage: React.FC = () => {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(mockEvents); 
  const [filter, setFilter] = useState<string>('all'); 

  const [currentPage, setCurrentPage] = useState<number>(1); 
  const eventsPerPage = 2;

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {  
    const selectedFilter = e.target.value;  
    setFilter(selectedFilter);  
    setCurrentPage(1);  

    if (selectedFilter === 'all') {  
      setFilteredEvents(mockEvents);  
    } else {  
      const filtered = mockEvents.filter(event => event.VenueType === selectedFilter);  
      setFilteredEvents(filtered);  
    }  
  };  

  const indexOfLastEvent = currentPage * eventsPerPage;  
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;  
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);  

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);  
  
  const handlePageChange = (pageNumber: number) => {  
    setCurrentPage(pageNumber);  
  };  
  // useEffect(() => {  
  //   // Get the body element  
  //   const body = document.body;  

  //   // Add your desired class  
  //   body.classList.add('event-page-body');  

  //   // Cleanup function to remove the class when the component unmounts  
  //   return () => {  
  //       body.classList.remove('event-page-body');  
  //   };  
  // });


  return (  
    <>  
      {/* <Navbar />   */}
      <div className="events-page-container">  
        <div className="events-body">  
          <nav className="nav-events-page"> 
          <label htmlFor="dropdown"> دسته بندی :</label>  
            <select   
              id="dropdown"   
              name="options"   
              value={filter}   
              onChange={handleFilterChange}  
            >  
            
              <option value="all">همه</option>  
              <option value="online">آنلاین</option>  
              <option value="physical">حضوری</option>  
              <option value="hybrid">ترکیبی</option>  
            </select>  

          </nav>  
  
          {/* Render filtered events */}  
          <div className="square-container">  
            {currentEvents.length > 0 ? (  
              currentEvents.map((event) => (  
                <Link to={`/event/${event.ID}`} key={event.ID} className="square-link">  
                  <div className="square">  
                    <div>  
                      <img   
                        className="card-image"   
                        src="./././public/event.avif"   
                        alt={`${event.Category} Thumbnail`}   
                      />  
                    </div>  
                    <div className="card-info">  
                      <small>  
                        {new Date(event.FromDate).toLocaleDateString("fa-IR", {  
                          weekday: "long",  
                          day: "numeric",  
                          month: "long",  
                        })}  
                      </small>  
                      <h3>{event.Category}</h3> 
                      <div className='events-descriptin-div'>
                      <p>در این دوره با آشنایی با انواع رویداد ها و نحوه برنامه ریزی اختصاصی برای هر کدام از آنها به صورت اصولی ... </p> 
                      </div>
            
                      <div className="icon-div">  
                        <i className="fa fa-money" aria-hidden="true"></i>  
                        <p>از {event.MaxCapacity} هزار تومان</p>  
                      </div>  
                      <div className="icon-div"> 
                        <i className="fa fa-map-marker" aria-hidden="true"></i>  
                        <p>{event.VenueType === "online" ? "آنلاین" : event.Location}</p>  
                      </div>  
                    </div>  
                  </div>  
                </Link>  
              ))  
            ) : (  
              <p className="no-events">رویدادی یافت نشد</p>  
            )}  
          </div>  
  
          <div className="paging-div">  
          <nav aria-label="Page navigation example">
  <ul className="inline-flex -space-x-px text-sm">
    {/* Next button should appear first in RTL */}
    <li>
      <a
        href="#"
        className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-700 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-900 ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
      >
        Next
      </a>
    </li>
    
    {/* Reverse the page numbers for RTL */}
    {Array.from({ length: totalPages }, (_, index) => (
      <li key={index + 1}>
        <a
          href="#"
          className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-900 ${currentPage === totalPages - index ? 'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700' : ''}`}
          onClick={() => handlePageChange(totalPages - index)}
          aria-current={currentPage === totalPages - index ? 'page' : undefined}
        >
          {totalPages - index}
        </a>
      </li>
    ))}
    
    {/* Previous button should appear last in RTL */}
    <li>
      <a
        href="#"
        className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-700 bg-white border border-e-0 border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-900 ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
      >
        Previous
      </a>
    </li>
  </ul>
</nav>

          </div>  
        </div>  
      </div>  
      {/* <Footer/>   */}
    </>  
  );
};

export default EventsPage;

// import './EventDetail.css'
// import React, { useEffect, useState , useRef} from "react";
// import { useForm } from "react-hook-form";
// import axios, { AxiosError, CanceledError } from "axios";
// import { useNavigate } from "react-router-dom";
// import { Link , useParams} from "react-router-dom";
// import Navbar from '../NavBar/NavBar';
// import Footer from '../Fototer/Footer';
// import { mockEvents } from '../EventsPage/mockEvents';
// const EventDetail: React.FC = () => {
// {
//     const [isScrolling, setIsScrolling] = useState(false);
//     const { id } = useParams<{ id: string }>();
//     const event = mockEvents.find((e) => e.ID.toString() === id);
//     console.log(event);
//     let scrollTimeout: NodeJS.Timeout;
  
//     useEffect(() => {
//       const handleScroll = () => {
//         setIsScrolling(true);
//         clearTimeout(scrollTimeout);
//         scrollTimeout = setTimeout(() => {
//           setIsScrolling(false);
//         }, 200);
//       };
  
//       window.addEventListener("scroll", handleScroll);
  
//       return () => {

//         window.removeEventListener("scroll", handleScroll);
//         clearTimeout(scrollTimeout);
//       };
//     }, []);
//     return (
//         <>
//         <Navbar/>
//         <div className="main-container">
//         <div className={`detail-info box-shadow ${isScrolling ? "outset-shadow" : ""}`} id="stickyDiv">

//             <h2>بلیت رویداد</h2>
//             <div className="info-row">
              
//               <div className="info-value">دانشگاه علم و صنعت</div>
//               <div className="info-label">برگزارکننده</div>
//             </div>
//             <div className="info-row">
//             <div className="info-value">نوزده مهرماه</div>    
//               <div className="info-label">تاریخ</div>

//             </div>
//             <div className="info-row">
//             <div className="info-value">رایگان </div> 
//               <div className="info-label">قیمت بلیت</div>

//             </div>
//             <div className="info-row">
//             <div className="info-value">خیابان فرجام</div>        
//               <div className="info-label">آدرس</div>

//             </div>
//             <div className="info-row">
//             <div className="info-value">روانشناسی</div>         
//               <div className="info-label">دسته بندی</div>

//             </div>
          
//             <a href="#" className="buy-button">خرید بلیت</a>
//             <div className='edit-delete-buttons'>
//             <a href="#" className="edit-button">ویرایش رویداد</a>
//             <a href="#" className="delete-button">حذف رویداد</a>
//             </div>
//         </div>

//         <div className="img-description">
//             <div className="image-div">
//                 <img className="image" src=".../public/event.avif"></img>

//             </div>
//             <div className="description-section">
//                 <div className="accent-line"></div>
//                 <h2 className="description-title"> هفته نامه شنبه</h2>
//                 <p className="description-text">
//                     برگزاری یک رویداد موفق با هر هدفی که باشد آموزش سازمانی، ارائه محصول و خدمت به مشتریان، نمایش دستاوردها و عملکرد سالانه سازمان و … نیازمند تعریف یک فرآیند اجرایی دقیق و شفاف است. فرآیندی که در آن کلیه جزئیات مراحل مختلف همچون برنامه ریزی و تعیین هدف، تیم اجرایی و شرح وظایف آنها، ابزار و امکانات، لیست هزینه ها، مجری و سخنران، پذیرایی و تشریفات، اطلاع رسانی مشخص شده باشد.
//                     در نهایت شما نیازمند تدوین یک چک لیست کامل از تمامی فعالیت هایی هستید که به شما کمک می کند یک رویداد را با موفقیت کامل برگزار کرده و به نتایج دلخواه خود ، هم راستا با هدف تعیین شده، دست پیدا کنید.                    
//                     در این دوره با آشنایی با انواع رویداد ها و نحوه برنامه ریزی اختصاصی برای هر کدام از آنها به صورت اصولی و عملی یاد خواهید گرفت تا چک لیست اجرایی خود را برای برگزاری یک رویداد موفق تهیه و تنظیم کنید
//                 </p>
//               </div>
//         </div>


//     </div>
//     <Footer/>
//     </>
//     )
// }
// }

// export default EventDetail;



import './EventDetail.css';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { mockEvent } from '../EventsPage/mockEvents';
import CommentSection from '../../components/Comment';
import Popup from '../../components/PopUp/PopUp';
import axios, { AxiosError } from 'axios';    
import { useAppContext } from '../../components/AppContext';
import EventHost from '../../components/EventHost/EventHost';

export interface EventDetail {
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
}

const EventDetail: React.FC = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const { id } = useParams<{ id: string }>();
  // const event = mockEvents.find((e) => e.ID.toString() === id);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState<string | null>(null); 
  const { backendUrl, setBackendUrl } = useAppContext();  
  const [event, setEvent] = useState<EventDetail | null>(null);
  let scrollTimeout: NodeJS.Timeout;
  const statusTranslation: Record<EventDetail['status'], string> = {  
    draft: 'پیش نویس',  
    published: 'منتشر شده',  
    cancelled: 'لغو شده',  
  };   

  const statusColors: { [key: string]: string } = {  
    published: 'green',  
    cancelled: 'red',  
    draft: 'yellow',  
  };  
  

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);
  const backgroundColor =  'gray';

//   useEffect(() => {  
//     const fetchEvent = async () => {  
//         setLoading(true);  
//         setError(null);  

//         try {  
//             const response = await axios.get(`${backendUrl}/v1/events/event-details/${id}` , {
//               headers: {
//                 "ngrok-skip-browser-warning": "69420",
//                 'Content-Type': 'application/json', // Example header
    
//               },
//             });  
//             console.log(response.data.data); 
//             const eventData = response.data.data;
//             setEvent(eventData);
//             console.log(event) 
//         } catch (err) {  
//           if (axios.isAxiosError(err)) {
//             // Handle specific error cases, e.g., 404 for not found  
//             if (err.response && err.response.status === 404) {  
//                 setError('Event not found');  
//             } else {  
//                 setError('An error occurred while fetching the event');  
//             }  
//           }
//         } finally {  
//             setLoading(false);  
//         }  
//     };  

//     fetchEvent();  
// }, [id]);  
  // if (loading) {  
  //   return <div>Loading event...</div>;  
  // }  

  // If event is not found, display a fallback message
  if (error || !event) {  
    // Optionally log the error if you want to debug  
    console.error(error);  
    // Set the mock event when there's an error or no event found  
    setEvent(mockEvent);  // This only sets the event when there's an error, not on every render  
} 
  if (!event) {
    return (
      <>
        <Navbar />
        <div className="main-container">
          <h2>رویداد یافت نشد</h2>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className='event-detail-container'>
      <div className="main-container">
        {/* Event Info Section */}

        {/* Event Description and Image Section */}
        
        <div className="img-description">

          <div className="description-section">
           <div className='status-info-div'>
           <span  
          className="status-circle"   
          style={{ backgroundColor }} // Inline style for dynamic color 
        />  
        <p>
        رویداد در حالت {statusTranslation[event.status]} است  
        </p>  
        </div> 
          <div className="image-div-event">
            <img className="image" src={event.banner} alt={`${event.categories[0]} Thumbnail`} />
          </div>

            <div className="accent-line"></div>
            <h2 className="description-title">{event.name|| "بدون عنوان"}</h2>
            <p className="description-text">
            برگزاری یک رویداد موفق با هر هدفی که باشد آموزش سازمانی، ارائه محصول و خدمت به مشتریان، نمایش دستاوردها و عملکرد سالانه سازمان و … نیازمند تعریف یک فرآیند اجرایی دقیق و شفاف است. فرآیندی که در آن کلیه جزئیات مراحل مختلف همچون برنامه ریزی و تعیین هدف، تیم اجرایی و شرح وظایف آنها، ابزار و امکانات، لیست هزینه ها، مجری و سخنران، پذیرایی و تشریفات، اطلاع رسانی مشخص شده باشد.
                    در نهایت شما نیازمند تدوین یک چک لیست کامل از تمامی فعالیت هایی هستید که به شما کمک می کند یک رویداد را با موفقیت کامل برگزار کرده و به نتایج دلخواه خود ، هم راستا با هدف تعیین شده، دست پیدا کنید.                    
                    در این دوره با آشنایی با انواع رویداد ها و نحوه برنامه ریزی اختصاصی برای هر کدام از آنها به صورت اصولی و عملی یاد خواهید گرفت تا چک لیست اجرایی خود را برای برگزاری یک رویداد موفق تهیه و تنظیم کنید
            </p>
          </div>
          <Popup />
          <div className='event-details-title'>
          <h2>برگزار کننده‌گان</h2>
          </div>
          {id && <EventHost eventId={id} />}
          <div className='event-details-title'>
          <h2>نظرات</h2>
          </div>
            <CommentSection postId={event.id} />

        </div>
        
        <div className={`detail-info box-shadow ${isScrolling ? "outset-shadow" : ""}`} id="stickyDiv">
          <h2>جزئیات رویداد</h2>
          
          <div className="info-row">
            <div className="info-label">از تاریخ</div> 
            <div className="info-value">             
             {new Date(event.from_date).toLocaleDateString("fa-IR", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
              </div>
          </div>
          <div className="info-row">
            <div className="info-label">تا تاریخ</div>
            <div className="info-value">
              {new Date(event.to_date).toLocaleDateString("fa-IR", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </div>

          </div>
          <div className="info-row">
            <div className="info-label">قیمت بلیت</div> 
            <div className="info-value">هزارتومان </div>
          </div>
          <div className="info-row">
            <div className="info-label">نحوه برگزاری</div>
            <div className="info-value">{event.venue_type === "Online" ? "آنلاین" : "حضوری"}</div>
          </div>
          <div className="info-row">
            <div className="info-label">دسته بندی</div>
            <div className="info-value">{event.categories[0] || "عمومی"}</div>
          </div>
          <div className='buy-button-div'>
          <a href="#" className="buy-button">خرید بلیت</a>
          </div>
          <div className='edit-delete-buttons'>
            <a href="#" className="edit-button">ویرایش رویداد</a>
            <a href="#" className="delete-button">حذف رویداد</a>
          </div>
        </div>

      </div>
      </div>
      <Footer />
    </>
  );
};

export default EventDetail;


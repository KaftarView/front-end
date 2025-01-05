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
import apiClient from  "../../utils/apiClient"
import { useNavigate } from "react-router-dom";
import {User , useAuth} from '../../components/AuthContext'
import TicketPurchasePopup from '../../components/BuyTicketPopup/BuyTicket';
import Comments from '../PodcastDetail/Comments';
import { FileText, Video, Presentation, Download  , AudioLines , Image} from 'lucide-react';
import AdminPanel from '../AdminPanel/mainPage';




export interface EventDetail {
  id: number;
  banner: string;
  name: string;
  description: string;
  location: string;
  status: string;
  venueType: string;
  categories: string[];
  createdAt: string;
  fromDate: string;
  toDate: string;
  basePrice : number;
}

interface EventMedia {
  id: number;
  title: string;
  type: 'pdf' | 'word' | 'pptx' | 'video';
  url: string;
}

interface Media {
  id: number;
  mediaType: string;
  name: string;
  mediaPath: string;
  mediaSize: number;
  createdAt: string;
}

const EventDetail: React.FC = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const { id } = useParams<{ id: string }>();
  // const event = mockEvents.find((e) => e.ID.toString() === id);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState<string | null>(null); 
  const [isValid , setIsValid] = useState<boolean | null>(false);
  const { backendUrl, setBackendUrl } = useAppContext();  
  const [event, setEvent] = useState<EventDetail | null>(null);
  const navigate = useNavigate();
  const { getUserRoles , getUserPermissions} = useAuth();  
  const userPermissions = getUserPermissions();
  let scrollTimeout: NodeJS.Timeout;
  const statusTranslation: Record<EventDetail['status'], string> = {  
    Draft: 'پیش نویس',  
    Published: 'منتشر شده',  
    Cancelled: 'لغو شده',  
  };   

  const[eventMedias , setEventMedias] = useState<Media[]>([])

  const statusColors: { [key: string]: string } = {  
    Published: 'green',  
    Cancelled: 'red',  
    Draft: 'yellow',  
  };  
  
  const userRole = getUserRoles()[0];
  console.log(userRole)

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
  const backgroundColor = event?.status ? statusColors[event?.status] : 'gray';
  const [isPopupVisible, setPopupVisible] = useState(false);

  useEffect(() => {  
    const fetchEvent = async () => {  
        setLoading(true);  
        setError(null);  
        const path = userRole === "SuperAdmin" ? "/v1/admin/events/" : "v1/public/events/";

        try {  
            // const response = await axios.get(`${backendUrl}/v1/events/event-details/${id}` , {
            //   headers: {
            //     "ngrok-skip-browser-warning": "69420",
            //     'Content-Type': 'application/json', // Example header
    
            //   },
            // });  
            const response = await apiClient.get(`${path}${id}`, {  
              headers: {  
                "ngrok-skip-browser-warning": "69420",  
                'Content-Type': 'application/json', 
              },  
            });  
            console.log(response.data.data); 
            const eventData = response.data.data;
            setEvent(eventData);
            // if (event) {
            //   setEvent({
            //     ...event,
            //   });}
            console.log(event) 
        } catch (err) {  
          if (axios.isAxiosError(err)) {
            if (err.response && err.response.status === 404) {  
                setError('Event not found');  
            } else {  
                setError('An error occurred while fetching the event');  
            }  
            
          }
        } finally {  
            setLoading(false);  
        }  
    };  

    fetchEvent();  
}, [id]);  

useEffect(() => {  
  const fetchEventMedia = async () => {  
      setLoading(true);  
      setError(null);  

      try {  
          const res = await apiClient.get(`/v1/admin/events/${id}/media`, {  
            headers: {  
              "ngrok-skip-browser-warning": "69420",  
              'Content-Type': 'application/json', 
            },  
          });  
          console.log(res.data.data)
          setEventMedias(res.data.data)
          setIsValid(true)
      } catch (err : any) {  
        // if (axios.isAxiosError(err)) {
        //   if (err.response && err.response.status === 404) {  
        //       setError('Event not found');  
        //   } else {  
        //       setError('An error occurred while fetching the event');  
              
        //   }  
          
        // }
        setError(err.response?.data?.message || 'An error occurred while fetching discounts.') 
        setIsValid(false)
      } finally {  
          setLoading(false);  
      }  
  };  

  fetchEventMedia();  
}, [id]);  
  if (loading) {  
    return <div>Loading event...</div>;  
  }  

    const getMediaIcon = (type: EventMedia['type']) => {
      switch (type) {
        case 'pdf':
        case 'word':
          return <FileText className="media-icon" />;
        case 'pptx':
          return <Presentation className="media-icon" />;
        case 'video':
          return <Video className="media-icon" />;
      }
    };

    const getMediaIconn = (type : string) => {
      // switch (type) {
      //   case 'pdf':
      //   case 'word':
      //     return <FileText className="media-icon" />;
      //   case 'pptx':
      //     return <Presentation className="media-icon" />;
      //   case 'video':
      //     return <Video className="media-icon" />;
        if (type.startsWith("video/"))
        {
            return <Video className="media-icon" />;
        }
        if (type.startsWith("audio/"))
        {
            return <AudioLines className="media-icon" />;
        }
        if (type.startsWith("image/"))
        {
            return <Image className="media-icon" />;
        }
        if (type.split('/').pop() === "pdf" || type.split('.').pop() === "document")
        {
            return <FileText className="media-icon" />;
        }
        if(type.split('.').pop() === "presentation")
        {
          return <Presentation className="media-icon" />;
        }
      
    };

  const handleDelete = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    try{
    const response = await apiClient.delete(`/v1/admin/events/${id}`)
      console.log(response); 
    if(response.status == 200)
    {
      window.alert("رویداد با موفقیت حذف شد")
      navigate('/events')
    }
    } catch (err) {  
      if (axios.isAxiosError(err)) {
        // Handle specific error cases, e.g., 404 for not found  
        if (err.response && err.response.status === 404) {  
            setError('Event not found');  
        } else {  
            setError('An error occurred while fetching the event');  
        }  
      }
  };
}
const handlePublish = async () => {  
  try {  
      const response = await apiClient.post(`/v1/admin/events/${event?.id}/publish`)
      console.log(response.data)
      if (response.data.statusCode == 200) {  
        window.location.reload();    
      }  
  } catch (error) {  
      console.error('Error publishing:', error); 
  }  
};  

  if (!event) {  
    // console.error(error);  
    setEvent(mockEvent);
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
        <div className="img-description">

          <div className="description-section">
            <div>
           {userRole === "SuperAdmin" && <div className='status-info-div'>
           <span  
          className="status-circle"   
          style={{ backgroundColor }}
        />  
        <p>
        رویداد در حالت {statusTranslation[event.status]} است  
        </p>  
        {event.status == 'Draft' &&<p onClick={handlePublish} className='publish-link'>انتشار</p>}
        </div>}
        </div> 
          <div className="image-div-event">
            <img className="image" src={event.banner} alt={`${event.categories[0]} Thumbnail`} />
          </div>

            <div className="accent-line"></div>
            <h2 className="description-title">{event.name|| "بدون عنوان"}</h2>
            <p className="description-text">
              {event.description}
            {/* برگزاری یک رویداد موفق با هر هدفی که باشد آموزش سازمانی، ارائه محصول و خدمت به مشتریان، نمایش دستاوردها و عملکرد سالانه سازمان و … نیازمند تعریف یک فرآیند اجرایی دقیق و شفاف است. فرآیندی که در آن کلیه جزئیات مراحل مختلف همچون برنامه ریزی و تعیین هدف، تیم اجرایی و شرح وظایف آنها، ابزار و امکانات، لیست هزینه ها، مجری و سخنران، پذیرایی و تشریفات، اطلاع رسانی مشخص شده باشد.
                    در نهایت شما نیازمند تدوین یک چک لیست کامل از تمامی فعالیت هایی هستید که به شما کمک می کند یک رویداد را با موفقیت کامل برگزار کرده و به نتایج دلخواه خود ، هم راستا با هدف تعیین شده، دست پیدا کنید.                    
                    در این دوره با آشنایی با انواع رویداد ها و نحوه برنامه ریزی اختصاصی برای هر کدام از آنها به صورت اصولی و عملی یاد خواهید گرفت تا چک لیست اجرایی خود را برای برگزاری یک رویداد موفق تهیه و تنظیم کنید */}
            </p>
          </div>
          {/* {userRole === "SuperAdmin" &&
          <Popup />

          } */}
          
          {isValid && userRole && userRole !== "SuperAdmin" && (
  <div className="media-section">
    <div className="accent-line"></div>
    <h2 className="description-title">فایل‌های رویداد</h2>
    {eventMedias && eventMedias.length > 0 ? (
      <div className="media-grid">
        {eventMedias.map((item) => (
          <div key={item.id} className="media-item">
            {getMediaIconn(item.mediaType)}
            <div className="media-details">
              <div className="media-title">{item.name}</div>
              {/* <div className="media-type">{item.mediaType.toUpperCase()}</div> */}
            </div>
            <a
              href={item.mediaPath}
              download
              className="download-button-eventdetail"
              onClick={(e) => {
                e.preventDefault();
                window.open(item.mediaPath, "_blank");
              }}
            >
              <Download size={16} />
            </a>
          </div>
        ))}
      </div>
    ) : (
      <p className="description-text">هیچ فایلی برای این رویداد وجود ندارد.</p>
    )}
  </div>
)}

          <div className='event-details-title'>
          {/* <h2>برگزار کننده‌گان</h2> */}
          </div>
          {/* {id && <EventHost eventId={id} />} */}
          <div className='event-details-title'>
          <h2>نظرات</h2>
          </div>
            <Comments postId={event.id} />

        </div>
        
        <div className={`detail-info box-shadow ${isScrolling ? "outset-shadow" : ""}`} id="stickyDiv">
          <h2>جزئیات رویداد</h2>
          
          <div className="info-row">
            <div className="info-label">از تاریخ</div> 
            <div className="info-value">             
             {new Date(event.fromDate).toLocaleDateString("fa-IR", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
              </div>
          </div>
          <div className="info-row">
            <div className="info-label">تا تاریخ</div>
            <div className="info-value">
              {new Date(event.toDate).toLocaleDateString("fa-IR", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </div>
          </div>
          <div className="info-row">
            <div className="info-label">قیمت بلیت</div> 
            <div className="info-value">{event.basePrice} هزارتومان </div>
          </div>
          <div className="info-row">
            <div className="info-label">نحوه برگزاری</div>
            <div className="info-value">  {event.venueType === "Online" ? "آنلاین" : event.venueType === "Hybrid" ? "ترکیبی" : "حضوری"} </div>
          </div>
          <div className="info-row">
            <div className="info-label">دسته بندی</div>
            <div className="info-value">{event.categories[0] || "عمومی"}</div>
          </div>
          {userRole === "SuperAdmin" &&
              <div className='buy-button-div'>
              <a onClick={() => navigate(`/admin-panel/${id}`)}  className="buy-button"> مدیریت رویداد</a>
              </div> 
          }
          {userRole &&  userRole != "SuperAdmin" && 
              <div className='buy-button-div'>
              <a href="#" onClick={() => setPopupVisible(true)} className="buy-button">خرید بلیت</a>
              </div>
          }
          {/* <div className='buy-button-div'>
          <a href="#" onClick={() => setPopupVisible(true)} className="buy-button">خرید بلیت</a>
          </div> */}
          {isPopupVisible && <TicketPurchasePopup onClose={() => setPopupVisible(false)}  id={id} />}
          {/* {userRole==="SuperAdmin" && <div className='edit-delete-buttons'>
            <a href="#" className="edit-button">ویرایش رویداد</a>
            <a  onClick={handleDelete} href="#" className="delete-button">حذف رویداد</a>
          </div>} */}
        </div>

      </div>
      </div>
      <Footer />
    </>
  );
};

export default EventDetail;


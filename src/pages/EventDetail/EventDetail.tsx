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
import { mockEvents } from '../EventsPage/mockEvents';
import CommentSection from '../../components/Comment';

const EventDetail: React.FC = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const { id } = useParams<{ id: string }>();
  const event = mockEvents.find((e) => e.ID.toString() === id);

  let scrollTimeout: NodeJS.Timeout;

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

  // If event is not found, display a fallback message
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
          <div className="image-div-event">
            <img className="image" src="../public/event.avif" alt={`${event.Category} Thumbnail`} />
          </div>

            <div className="accent-line"></div>
            <h2 className="description-title">{event.Category || "بدون عنوان"}</h2>
            <p className="description-text">
            برگزاری یک رویداد موفق با هر هدفی که باشد آموزش سازمانی، ارائه محصول و خدمت به مشتریان، نمایش دستاوردها و عملکرد سالانه سازمان و … نیازمند تعریف یک فرآیند اجرایی دقیق و شفاف است. فرآیندی که در آن کلیه جزئیات مراحل مختلف همچون برنامه ریزی و تعیین هدف، تیم اجرایی و شرح وظایف آنها، ابزار و امکانات، لیست هزینه ها، مجری و سخنران، پذیرایی و تشریفات، اطلاع رسانی مشخص شده باشد.
                    در نهایت شما نیازمند تدوین یک چک لیست کامل از تمامی فعالیت هایی هستید که به شما کمک می کند یک رویداد را با موفقیت کامل برگزار کرده و به نتایج دلخواه خود ، هم راستا با هدف تعیین شده، دست پیدا کنید.                    
                    در این دوره با آشنایی با انواع رویداد ها و نحوه برنامه ریزی اختصاصی برای هر کدام از آنها به صورت اصولی و عملی یاد خواهید گرفت تا چک لیست اجرایی خود را برای برگزاری یک رویداد موفق تهیه و تنظیم کنید
            </p>
          </div>
            <CommentSection />

        </div>
        <div className={`detail-info box-shadow ${isScrolling ? "outset-shadow" : ""}`} id="stickyDiv">
          <h2>بلیت رویداد</h2>
          
          <div className="info-row">
            <div className="info-label">برگزارکننده</div> 
            <div className="info-value">{event.Location || "نامعلوم"}</div>
          </div>
          <div className="info-row">
            <div className="info-label">تاریخ</div>
            <div className="info-value">
              {new Date(event.FromDate).toLocaleDateString("fa-IR", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </div>

          </div>
          <div className="info-row">
            <div className="info-label">قیمت بلیت</div> 
            <div className="info-value"> {event.MaxCapacity || "رایگان"}هزارتومان </div>
          </div>
          <div className="info-row">
            <div className="info-label">آدرس</div>
            <div className="info-value">{event.Location || "نامعلوم"}</div>
          </div>
          <div className="info-row">
            <div className="info-label">دسته بندی</div>
            <div className="info-value">{event.Category || "عمومی"}</div>
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


import { useEffect, useState } from "react";
import "./HomePage.css"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import apiClient from "../utils/apiClient";
import Navbar from "./NavBar/NavBar";
import Footer from "./Footer/Footer";
import { useAuth } from "../components/AuthContext";

const HomePage = () => {
let slideIndexs: number = 1;



// function carousel(): void {
//   let i: number;
//   let x = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;

//   for (i = 0; i < x.length; i++) {
//     x[i].style.display = "none";
//   }

//   slideIndexs++;
//   if (slideIndexs > x.length) {
//     slideIndexs = 1;
//   }

//   x[slideIndexs - 1].style.display = "block";
  
//   setTimeout(carousel, 4000); // Change image every 2 seconds
// }
// useEffect(carousel,[])

function carousel(): void {
  let i: number;
  let x = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;

  if (!x || x.length === 0) {
    return; // Exit the function if no slides are present
  }

  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }

  slideIndexs++;
  if (slideIndexs > x.length) {
    slideIndexs = 1;
  }

  x[slideIndexs - 1].style.display = "flex";

  // Schedule the next slide
  setTimeout(carousel, 4000); // Change image every 4 seconds
}

useEffect(() => {
  carousel();

  // Optional: Return a cleanup function to clear the timeout when the component unmounts
  return () => {
    clearTimeout(carousel as unknown as NodeJS.Timeout); // Explicitly clear the timeout
  };
}, []);



const [slideIndex, setSlideIndex] = useState<number>(1);  
  
const totalSlides = 2; // Update this based on how many images you have  

useEffect(() => {  
  showSlides(slideIndex);  
}, [slideIndex]); // This runs showSlides whenever slideIndex changes  

const plusSlides = (n: number): void => {  
  setSlideIndex((prevIndex) => {  
    let newIndex = prevIndex + n;  
    if (newIndex > totalSlides) return 1; // Wrap around to the first slide  
    if (newIndex < 1) return totalSlides; // Wrap around to the last slide  
    return newIndex;  
  });  
};  

// const showSlides = (n: number): void => {  
//   const slides = document.getElementsByClassName("mySlides");  

//   // Ensure slideIndex is within valid range  
//   if (n > slides.length) { setSlideIndex(1); }  
//   if (n < 1) { setSlideIndex(slides.length); }  

//   // Hide all slides initially  
//   Array.from(slides).forEach((slide) => {  
//     (slide as HTMLElement).style.display = "none";  
//   });  

//   // Show the current slide  
//   (slides[slideIndex - 1] as HTMLElement).style.display = "flex";  
// };  


const showSlides = (n: number): void => {  
  const slides = document.getElementsByClassName("mySlides");

  // Check if slides are available
  if (!slides || slides.length === 0) {
    console.warn("No slides available to display.");
    return; // Exit if no slides are found
  }

  // Ensure slideIndex is within valid range
  const totalSlides = slides.length;
  if (n > totalSlides) {
    setSlideIndex(1); // Wrap around to the first slide
    return;
  }
  if (n < 1) {
    setSlideIndex(totalSlides); // Wrap around to the last slide
    return;
  }

  // Hide all slides initially
  Array.from(slides).forEach((slide) => {  
    (slide as HTMLElement).style.display = "none";  
  });

  // Show the current slide
  const currentSlide = slides[slideIndex - 1];
  if (currentSlide) {
    (currentSlide as HTMLElement).style.display = "flex";  
  }
};
useEffect(() => {  
  const slides = document.getElementsByClassName("mySlides");
  if (slides.length > 0) {
    showSlides(slideIndex);
  } else {
    console.warn("No slides found during initial rendering.");
  }
}, [slideIndex]);

const [slideIndexSpecial, setSlideIndexSpecial] = useState<number>(1);  
  
// Total number of slides determined by the number of images  
const totalSlidesSpecial = 2; // Update this based on how many images you have  

// useEffect(() => {  


    
//   showSlidesSpecial(slideIndexSpecial);  
// }, [slideIndexSpecial]); // This runs showSlides whenever slideIndex changes  

const plusSlideSpecial = (n: number): void => {  
  setSlideIndexSpecial((prevIndex) => {  
    let newIndex = prevIndex + n;  
    if (newIndex > totalSlidesSpecial) return 1; // Wrap around to the first slide  
    if (newIndex < 1) return totalSlidesSpecial; // Wrap around to the last slide  
    return newIndex;  
  });  
};  

const showSlidesSpecial = (n: number): void => {  
  const slides = document.getElementsByClassName("mySlides-news");  

  // Ensure slideIndex is within valid range  
  if (n > slides.length) { setSlideIndexSpecial(1); }  
  if (n < 1) { setSlideIndexSpecial(slides.length); }  

  // Hide all slides initially  
  Array.from(slides).forEach((slide) => {  
    (slide as HTMLElement).style.display = "none";  
  });  

  // Show the current slide  
  (slides[slideIndexSpecial - 1] as HTMLElement).style.display = "flex";  
};  





//-----------------------FETCHING DATA


interface FormData {
  name: string;
  status: string;
  description: string;
  fromDate: string;
  toDate: string;
  id:Number;
  venue_type: string;
  banner:string;
  createdAt: string;
  basePrice:string;
}



const [initialData, setInitialData] = useState<FormData[]>([]);

useEffect(
  () => {

    async function getEvent(){

      try {  
        
        const response = await apiClient.get('/v1/admin/events', {
          headers: {
            "ngrok-skip-browser-warning": "69420",
            'Content-Type': 'application/json', // Example header
  
          },
        });
        
        if (response.status === 200 && response.data) {
          
          console.log("---------------------EVENT")
          console.log(response.data.data);

          const sortedData = response.data.data
            // .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Sort by date descending
            .slice(0, 5);

            console.log(sortedData); // Optionally log the sorted data
            setInitialData(sortedData); 
          };
  
      } 
         catch (err) {
          console.error("Error fetching events:", err);  
        } finally {  
        }
  } getEvent()},[])
//-----------------------podcast

  interface FormData2 {
    name: string;
    category: string[];
    description: string;
    banner: File;
    ID:Number;

  }
  

  
  
  const [initialPodcast, setInitialPodcast] = useState<FormData2[]>([]);
  
  useEffect(
    () => {
  
      async function getPod(){
  
        try {  
          const response = await axios.get('https://66e1-212-64-199-253.ngrok-free.app/v1/public/podcasts', {
            headers: {
              "ngrok-skip-browser-warning": "69420",
              'Content-Type': 'application/json', // Example header
    
            },
          });
          
          if (response.status === 200 && response.data) {
            console.log(response);
            console.log("-------------------------response.data-------------------------------------------------");
            console.log(response.data.data);
            console.log("--------------------------------respons.data.data------------------------------------------");
  
            const sortedData = response.data.data
              // .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Sort by date descending
              .slice(0, 5);
  
              console.log(sortedData); // Optionally log the sorted data
              setInitialPodcast(sortedData); 
            };
    
        } 
           catch (err) {
            console.error("Error fetching events:", err);  
          } finally {  
          }
    } getPod()},[])











//--------------------------news
 interface NewsOverall {  
  id: number;  
  title: string;  
  description: string;  
  banner: string;  
  banner2:string;
  content: string;  
  content2:string;
  author: string;  
  categories : string[];
  createdAt: string;
}  
const [newsList, setNewsList] = useState<NewsOverall[]>([]); 
const { getUserRoles } = useAuth();



const fetchNews = async () => {
  try {
    let path = "/v1/public/news";




    const response = await apiClient.get(path, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200 && response.data) {
      console.log("this is the news ")
      console.log(response.data.data);
      const processedNews = response.data.data.slice(0, 5)
      // .map((news: NewsOverall) => ({
      //   ...news,
      // }));
      setNewsList(processedNews);
    }
  } catch (err) {
  } finally {
  }
};

useEffect(() => { 
  fetchNews()
 },[])





 //--------------------magazine


 interface magazineData {
  name: string;
  category: string[];
  description: string;
  banner: string;
  id:number;
  createdAt:string;
  journalFile:string;
  author:string;

}




const [initialMagazine, setInitialMagazine] = useState<magazineData[]>([]);

useEffect(
  () => {

    async function getMag(){

      try {  
        const response = await axios.get('https://66e1-212-64-199-253.ngrok-free.app/v1/public/journals', {
          headers: {
            "ngrok-skip-browser-warning": "69420",
            'Content-Type': 'application/json', // Example header
  
          },
        });
        
        if (response.status === 200 && response.data) {
          console.log(response);
          console.log("-------------------------response.data-------------------------------------------------");
          console.log(response.data.data);
          console.log("--------------------------------respons.data.data------------------------------------------");

          const sortedData = response.data.data
            // .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Sort by date descending
            .slice(0, 5);

            console.log(sortedData); // Optionally log the sorted data
            setInitialMagazine(sortedData); 
          };
  
      } 
         catch (err) {
          console.error("Error fetching magazine:", err);  
        } finally {  
        }
  } getMag()},[])
  const navigate = useNavigate();


  return (



    <div className='home-page'>
      <Navbar/>
        <div className="intro-background">

            <div className="transbox">
            <h1 className="writing-text"> انجمن علمی مهندسی کامپیوتر</h1>
            <br/>
            <h2>دانشگاه علم و صنعت </h2>

            </div>

        </div>
        <div className="about-anjoman">
        <h1 className="about-anjoman-titel">
            درباره CESA 
        
        </h1>
        <br/>
        <p>انجمن علمی مهندسی کامپیوتر با هدف ارتقاء دانش فنی و علمی دانشجویان در زمینه‌های مختلف علوم کامپیوتر و فناوری اطلاعات تأسیس شده است. این انجمن با برگزاری کارگاه‌ها، سمینارها، مسابقات علمی و همکاری‌های بین‌المللی، فرصتی برای اعضا فراهم می‌آورد تا به روزترین مباحث و تکنولوژی‌ها را بشناسند و در پروژه‌های کاربردی مشارکت کنند. هدف نهایی انجمن، پرورش تخصص‌های نوآور و کارآفرین در حوزه‌های مهندسی کامپیوتر است.</p>
        </div>

      {/* <div className="anjoman-gallery">
        <a className="prev" onClick={()=>{plusSlides(-1)}}>  &#10095;</a>
        <img className="mySlides" src="public\f.jpg" ></img>
        <img className="mySlides" src="public\intro.jpg"></img>
        <img className="mySlides" src="public\t.jpg"></img>
        <img className="mySlides" src="public\s.jpg"></img>
        <a className="next" onClick={()=>{plusSlides(1)}}>&#10094;</a>

        <div className="anjoman-gallery-link">
        <h2>اینجا میتونی تمام خاطره هایی که ساختیم رو ببینی</h2>
        <button className="btn"> رفتن به گالری </button>
        </div>

      
        
      </div> */}


<div className="news-carousel">
  {newsList.map((news, index) => (
    <div
      key={index}
      className="mySlides"
      style={{ display: index === 0 ? "flex" : "none" }}
    >
     <a className="prev" onClick={()=>{plusSlides(-1)}}>  &#10095;</a>

      {/* News Content Section */}
      <div className="news-carousel-content">
        <h3 className="news-carousel-title">{news.title}</h3>
        <p className="news-carousel-summary">{news.description.split(" ").slice(0, 50).join(" ")||'asdfghjklwertyuiopzxcvbnmdfghjk'}...</p>
        <button onClick={() => {navigate("/news-page");}} className="btn news-carousel-button">رفتن به خبر</button>
      </div>

      {/* News Image Section */}
      <div className="news-carousel-image-container">
        <img src={news.banner || 'https://aglowiditsolutions.com/wp-content/uploads/2022/12/Laravel-Best-Practices.png'} alt={news.banner} className="news-carousel-image" />
      </div>
      <a className="next" onClick={()=>{plusSlides(1)}}>&#10094;</a>

    </div>
  ))}
</div>



       <div className="content">
   
        {/* <div className='title'><span className='title-name'>جدیدترین رویداد‌ها</span> <button className='title-link  '>رفتن به رویداد‌ها</button></div>
            <div className="lists "> 
                <div className="box">
                    <img src="https://aglowiditsolutions.com/wp-content/uploads/2022/12/Laravel-Best-Practices.png" alt="" />
                    <h2 className="product-title">آموزش لاراول </h2>
                    <p className="product-description">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها لازم است</p>
                    <span className="product-status">کامل شده</span>
                    <span className="product-price">790,000 تومان</span>
                    <button className="my_btn">مشاهده اطلاعات </button>
                </div>
               
                     <div className="box box-test" >
                       
                    <img src="https://aglowiditsolutions.com/wp-content/uploads/2022/12/Laravel-Best-Practices.png" alt="" />
                    <h2 className="product-title">آموزش لاراول </h2>
                    <p className="product-description">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها لازم است</p>
                    <span className="product-status">کامل شده</span>
                    <span className="product-price">790,000 تومان</span>
                   
                    <button className="my_btn">مشاهده اطلاعات</button>
                </div>
                
                    <div className="box">
                    <img src="https://aglowiditsolutions.com/wp-content/uploads/2022/12/Laravel-Best-Practices.png" alt="" />
                    <h2 className="product-title">آموزش لاراول </h2>
                    <p className="product-description">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها لازم است</p>
                    <span className="product-status">کامل شده</span>
                    <span className="product-price">790,000 تومان</span>
                    <button className="my_btn">مشاهده اطلاعات</button>
                </div>
                                <div className="box">
                    <img src="https://aglowiditsolutions.com/wp-content/uploads/2022/12/Laravel-Best-Practices.png" alt="" />
                    <h2 className="product-title">آموزش لاراول </h2>
                    <p className="product-description">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها لازم است</p>
                    <span className="product-status">کامل شده</span>
                    <span className="product-price">790,000 تومان</span>
                    <button className="my_btn">مشاهده اطلاعات</button>
                </div>

            </div> */}



<div>
      {/* Section Title */}
      <div className='title'>
        <span className='title-name'>جدیدترین رویداد‌ها</span>
        <button onClick={() => {navigate("/events");}} className='title-link'>رفتن به رویداد‌ها</button>
      </div>

      {/* Events List */}
      <div className="lists">
        {initialData.length > 0 ? (
          initialData.map((event, index) => (
            <div className="box" key={index}>
              <img
                src={event.banner || 'https://aglowiditsolutions.com/wp-content/uploads/2022/12/Laravel-Best-Practices.png'} // Assuming 'image' is a field in event
                alt={event.banner || 'Event Image'}
              />
              <h2 className="product-title">{event.name}</h2> {/* Assuming 'title' is a field */}
              <p className="product-description">{event.description||'asdfghjklwertyuiopzxcvbnmdfghjk'}</p> {/* Assuming 'description' is a field */}
              <span className="product-status">{event.venue_type || 'در حال برگزاری'}</span> {/* Assuming 'status' is a field */}
              <span className="product-price">{event.basePrice+"تومان" || 'قیمت ندارد'}</span> 
              <button onClick={()=>{navigate('/event/'+event.id)}} className="my_btn">مشاهده اطلاعات</button>
            </div>
          ))
        ) : (
          <p>هیچ رویدادی موجود نیست.</p>
        )}
      </div>
    </div>

            {/* <div className='title'><span className='title-name'>جدیدترین دوره‌ها</span> <button className='title-link  '>رفتن به دوره‌ها</button> </div>
            <div className="lists">
                                <div className="box">
                    <img src="https://aglowiditsolutions.com/wp-content/uploads/2022/12/Laravel-Best-Practices.png" alt="" />
                    <h2 className="product-title">آموزش لاراول </h2>
                    <p className="product-description">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها لازم است</p>
                    <span className="product-status">کامل شده</span>
                    <span className="product-price">790,000 تومان</span>
                    <button className="my_btn">مشاهده اطلاعات</button>
                </div>
                                <div className="box">
                    <img src="https://aglowiditsolutions.com/wp-content/uploads/2022/12/Laravel-Best-Practices.png" alt="" />
                    <h2 className="product-title">آموزش لاراول </h2>
                    <p className="product-description">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها لازم است</p>
                    <span className="product-status">کامل شده</span>
                    <span className="product-price">790,000 تومان</span>
                    <button className="my_btn">مشاهده اطلاعات</button>
                </div>
                                <div className="box">
                    <img src="https://aglowiditsolutions.com/wp-content/uploads/2022/12/Laravel-Best-Practices.png" alt="" />
                    <h2 className="product-title">آموزش لاراول </h2>
                    <p className="product-description">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها لازم است</p>
                    <span className="product-status">کامل شده</span>
                    <span className="product-price">790,000 تومان</span>
                    <button className="my_btn">مشاهده اطلاعات</button>
                </div>
                                <div className="box">
                    <img src="https://aglowiditsolutions.com/wp-content/uploads/2022/12/Laravel-Best-Practices.png" alt="" />
                    <h2 className="product-title">آموزش لاراول </h2>
                    <p className="product-description">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها لازم است</p>
                    <span className="product-status">کامل شده</span>
                    <span className="product-price">790,000 تومان</span>
                    <button className="my_btn">مشاهده اطلاعات</button>
                </div>
            </div> */}
        </div>



{/* moarefi */}


        {/* <div className="anjoman-special-part">



        <div className="anjoman-special-part-link">
        <h2>اینجا میتوانی اخبار انجمن با خبر بشی</h2>
        <button className="btn"> رفتن به اخبار </button>
        </div>

        <a className="prev" onClick={()=>{plusSlideSpecial(-1)}}>  &#10095;</a>
        <img className="mySlides-news" src="src\images\f.jpg" ></img>
        <img className="mySlides-news" src="src\images\s.jpg"></img>
        <a className="next" onClick={()=>{plusSlideSpecial(1)}}>&#10094;</a>



        </div> */}








        <div className="content">
          <div className="pudcast-section">
          <div className="about-anjoman-pudcast">
        <h1 className="about-anjoman-pudcast-titel">
            CESA Podcast
        
        </h1>
        <br/>
        <p>پادکست اختصاصی انجمن علمی مهندسی کامپیوتر فرصتی منحصر به فرد برای اعضای انجمن و علاقه‌مندان به دنیای فناوری و مهندسی کامپیوتر است تا از جدیدترین موضوعات علمی، تکنولوژیک و روندهای نوین این حوزه‌ها مطلع شوند. این پادکست با هدف تبادل دانش و ارتقاء سطح علمی جامعه دانشگاهی، به بررسی مباحث مختلفی از جمله توسعه نرم‌افزار، هوش مصنوعی، امنیت سایبری، برنامه‌نویسی، اینترنت اشیاء (IoT) و تحولات در صنعت فناوری اطلاعات می‌پردازد.

پادکست انجمن علمی مهندسی کامپیوتر به طور منظم با حضور اساتید، متخصصین برجسته و دانشجویان فعال در حوزه‌های مختلف کامپیوتر، مصاحبه و گفت‌وگوهایی جذاب و آموزنده تولید می‌کند. این پادکست به اعضا و شنوندگان این امکان را می‌دهد که در هر زمان و مکان به محتواهای علمی و تجربیات ارزشمند دسترسی داشته باشند و مهارت‌های خود را در این حوزه‌ها تقویت کنند.

هدف اصلی این پادکست، گسترش فرهنگ یادگیری مستمر، الهام‌بخشی برای نوآوری و تشویق به پژوهش‌های کاربردی در زمینه‌های مختلف مهندسی کامپیوتر است.</p>
        </div>

          <div className='title '><span className='title-name'>جدیدترین پادکست‌ها</span> 
          <button onClick={() => {navigate("/podcasts");}} className='title-link  '>رفتن به پادکست‌ها</button></div>
            <div className="lists background-color-orange">
                
            {initialPodcast.length > 0 ? (
          initialPodcast.map((event, index) => (
            <div className="box-small" key={index}>
              <h2 className="product-title">{event.name}</h2> {/* Assuming 'title' is a field */}
              <button onClick={() => {navigate('/podcast/'+event.ID);}} className="my_btn">مشاهده اطلاعات</button>
            </div>
          ))
        ) : (
          <p>هیچ پادکستی موجود نیست.</p>
        )}
      </div>
      </div>
          <div className="magazin-section">
          <div className="about-anjoman-magazin">
        <h1 className="about-anjoman-magazin-titel">
            Turing Magazin 
        
        </h1>
        <br/>
        <p>شریه تخصصی "تورینگ" یکی از محصولات علمی و فرهنگی انجمن علمی مهندسی کامپیوتر است که با هدف ارتقاء سطح دانش و پژوهش در زمینه‌های مختلف علوم کامپیوتر و فناوری اطلاعات منتشر می‌شود. این نشریه به نام "تورینگ" (با اشاره به آلن تورینگ، پدر علم رایانه) نام‌گذاری شده است تا به‌نوعی یادآور جایگاه برجسته و تأثیرگذار این دانشمند بزرگ در شکل‌گیری دنیای دیجیتال و محاسبات مدرن باشد.

نشریه تورینگ به صورت دوره‌ای منتشر می‌شود و مقالات علمی، پژوهشی، مصاحبه‌ها، تحلیل‌ها و گزارش‌هایی در زمینه‌های مختلف علوم کامپیوتر و فناوری ارائه می‌دهد. از جمله موضوعاتی که در این نشریه پوشش داده می‌شود می‌توان به الگوریتم‌ها و ساختارهای داده، هوش مصنوعی، یادگیری ماشین، امنیت سایبری، برنامه‌نویسی، محاسبات ابری، اینترنت اشیاء (IoT)، واقعیت افزوده و مجازی و سایر مباحث روز در دنیای فناوری اطلاعات اشاره کرد.

هدف اصلی نشریه تورینگ، فراهم کردن بستری برای تبادل نظر و ارائه تحقیقات نوین در این حوزه‌ها و همچنین آشنایی مخاطبان با آخرین دستاوردهای علمی و صنعتی است. این نشریه فرصتی است برای دانشجویان، اساتید و پژوهشگران جوان تا یافته‌های علمی خود را با دیگران به اشتراک بگذارند و در محیطی علمی و پویا به بحث و تبادل اطلاعات بپردازند.</p>
        </div>
            <div className='title'><span className='title-name'>جدیدترین شماره‌های نشریه</span>
             <button onClick={() => {navigate("/magazines");}} className='title-link  '>رفتن به نشریه</button></div>
            <div className="lists background-color-blue">
                  
            {initialMagazine.length > 0 ? (
          initialMagazine.map((mag, index) => (
            <div className="box-small" key={index}>
              <h2 className="product-title">{mag.name}</h2> {/* Assuming 'title' is a field */}
              <button onClick={() => {navigate('/podcast/'+mag.id);}} className="my_btn">مشاهده اطلاعات</button>
            </div>
          ))
        ) : (
          <p>هیچ نشریه‌ای موجود نیست.</p>
        )}
      </div>

          </div>


            {/* <div className="note-section">
            <div className="about-anjoman-note">
        <h1 className="about-anjoman-note-titel">
            جزوه‌های شما 
        
        </h1>
        <br/>
        <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را می طلبدلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد</p>
        </div>
        <div className='title'><span className='title-name'>جدیدترین جزوه‌ها</span> <button className='title-link  '>رفتن به جزوه‌ها</button></div>
            <div className="lists">
            <div className="box-small">
                    <h2 className="product-title"> آموزش و بالابردن سطح آگاهی </h2>
                    <span className="product-status">کامل شده</span>
                    <button className="my_btn">مشاهده اطلاعات</button>
                </div>
                <div className="box-small">
                    <h2 className="product-title"> آموزش و بالابردن سطح آگاهی </h2>
                    <span className="product-status">کامل شده</span>
                    <button className="my_btn">مشاهده اطلاعات</button>
                </div>
                <div className="box-small">
                    <h2 className="product-title"> آموزش و بالابردن سطح آگاهی </h2>
                    <span className="product-status">کامل شده</span>
                    <button className="my_btn">مشاهده اطلاعات</button>
                </div>
                <div className="box-small">
                    <h2 className="product-title"> آموزش و بالابردن سطح آگاهی </h2>
                    <span className="product-status">کامل شده</span>
                    <button className="my_btn">مشاهده اطلاعات</button>
                </div>
            </div>

            </div> */}
            


        </div>
        <Footer/>

     </div> 

  )
}

export default HomePage
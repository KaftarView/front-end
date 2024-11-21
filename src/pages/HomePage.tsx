// import "/src/components/Reset.css"
import "./HomePage.css"
import { Link } from "react-router-dom"

// import PATHS from "../router/path"
const HomePage = () => {

    // const writingEl = document.querySelector('.writing-text') as HTMLElement; // Type assertion
    // const text = writingEl.innerHTML;
    // writingEl.innerHTML = '';
    // let index = 0;
  
    // const interval = setInterval(function () {
    //   writingEl.innerHTML = text.substring(0, index++);
    //   if (index === text.length + 1) clearInterval(interval);
    // }, 100);

  return (



    <div className='home-page'>
        <div className="intro-background">
        {/* <img src="src\images\photo_2024-11-16_00-01-09.jpg" alt="" /> */}

            <div className="transbox">
            <h1 className="writing-text">به انجمن مهندسی کامپیوتر خوش آمدید</h1>

            </div>
        <button className=" my_button"> <span>ورورد / عضویت</span></button>

        </div>

       <div className="content">

            <div className='title'><span className='title-name'>جدیدترین رویداد‌ها</span> <button className='title-link btn'>رفتن به رویداد‌ها</button></div>
            <div className="lists "> 
            <Link to={'/event/6'}>
                <div className="box">
                    <img src="https://aglowiditsolutions.com/wp-content/uploads/2022/12/Laravel-Best-Practices.png" alt="" />
                    <h2 className="product-title">آموزش لاراول </h2>
                    <p className="product-description">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها لازم است</p>
                    <span className="product-status">کامل شده</span>
                    <span className="product-price">790,000 تومان</span>
                    <button className="my_btn">مشاهده اطلاعات </button>
                </div>
               </Link>
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
                                {/* <div className="box">
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
                </div>                 */}

            </div>
            <div className='title'><span className='title-name'>جدیدترین دوره‌ها</span> <button className='title-link btn'>رفتن به دوره‌ها</button> </div>
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
                                {/* <div className="box">
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
                </div>  */}
            </div>
            <div className='title '><span className='title-name'>جدیدترین پادکست‌ها</span> <button className='title-link btn'>رفتن به پادکست‌ها</button></div>
            <div className="lists background-color-orange">
                
                    <div className="box-small">
                    <h2 className="product-title"> آموزش و بالابردن سطح آگاهی </h2>
                    <span className="product-status">شماره 4</span>
                    <button className="my_btn">مشاهده اطلاعات</button>            
                      </div>
                    <div className="box-small">
                    <h2 className="product-title"> آموزش و بالابردن سطح آگاهی </h2>
                    <span className="product-status">شماره 3</span>
                    <button className="my_btn">مشاهده اطلاعات</button>
                </div>
                    <div className="box-small">
                    <h2 className="product-title"> آموزش و بالابردن سطح آگاهی </h2>
                    <span className="product-status">شماره 2</span>
                    <button className="my_btn">مشاهده اطلاعات</button>
                </div> 
                    <div className="box-small">
                    <h2 className="product-title"> آموزش و بالابردن سطح آگاهی </h2>
                    <span className="product-status">شماره 1</span>
                    <button className="my_btn">مشاهده اطلاعات</button>                </div> 

            </div>
            <div className='title'><span className='title-name'>جدیدترین شماره‌های نشریه</span> <button className='title-link btn'>رفتن به نشریه</button></div>
            <div className="lists background-color-blue">
                                <div className="box-small">
                    {/* <img src="https://aglowiditsolutions.com/wp-content/uploads/2022/12/Laravel-Best-Practices.png" alt="" /> */}
                    <h2 className="product-title"> آموزش و بالابردن سطح آگاهی </h2>
                    <span className="product-status">شماره 4 </span>
                    <button className="my_btn">مشاهده اطلاعات</button>
                </div> 
                    <div className="box-small">
                    <h2 className="product-title"> آموزش و بالابردن سطح آگاهی </h2>
                    <span className="product-status">شماره 3</span>
                    <button className="my_btn">مشاهده اطلاعات</button>
                </div>
                    <div className="box-small">
                    <h2 className="product-title"> آموزش و بالابردن سطح آگاهی </h2>
                    <span className="product-status">شماره 2</span>
                    <button className="my_btn">مشاهده اطلاعات</button>
                     </div>
                    <div className="box-small">
                    <h2 className="product-title"> آموزش و بالابردن سطح آگاهی </h2>
                    <span className="product-status">شماره 1</span>
                    <button className="my_btn">مشاهده اطلاعات</button>
                </div>
                               
            </div>
            <div className='title'><span className='title-name'>جدیدترین جزوه‌ها</span> <button className='title-link btn'>رفتن به جزوه‌ها</button></div>
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

        </div>

     </div> 

  )
}

export default HomePage
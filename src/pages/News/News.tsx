import React, { useEffect, useRef, useState } from "react";
import "./News.css";
import axios, { CanceledError } from "axios";
import sampleNews from "./Samplenews";
import Navbar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { useParams } from "react-router-dom";

export type NewsData = {
  title: string;
  description: string;
  content: string;
  content2?: string;
  banner: string;
  banner2?: string;
  categories: string[];
  author: string;
};

const NewsPageshow: React.FC = () => {
  const [newsData, setNewsData] = useState<NewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { NewsId } = useParams<{ NewsId: string }>();
  useEffect(() => {
    const handleScroll = () => {
      console.log("handle");
      const scrollTop = window.scrollY; 
      const scrollHeight = document.documentElement.scrollHeight; 
      const clientHeight = document.documentElement.clientHeight; 
      const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollProgress(progress);

      console.log({
        scrollTop,
        scrollHeight,
        clientHeight,
        progress,
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://66e1-212-64-199-253.ngrok-free.app/v1/public/news/${NewsId}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "69420",
              "Content-Type": "application/json",
            },
          }
        );
        const newsData = response.data.data;

       
        console.log(newsData);
        setNewsData(newsData);
        setLoading(false);
        console.log(response.data);
        // setInitialData(newsData);
        // console.log(initialData)
      } catch (error) {
        if (error instanceof CanceledError) return;
        console.error("Unable to fetch news data:", error);
        // setError(error.message);
        setLoading(false);
      } finally {
        setLoading(false);
        // setNewsData(sampleNews);
      }
    };

    if (NewsId) {
      fetchNews();
    }
  }, [NewsId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!newsData) return <div>خبر یافت نشد</div>;

  return (
    <>
      <Navbar />
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      <div className="page-container">
        <div className="news-container">
          <div className="news-title">{newsData.title}</div>
          <div className="news-description">{newsData.description}</div>
          {newsData.banner && (
            <img
              className="news-banner"
              src={newsData.banner}
              alt="News Banner"
            />
          )}
          <div className="news-content">{newsData.content}</div>
          {newsData.banner2 && (
            <img
              className="news-banner"
              src={newsData.banner2}
              alt="News Banner"
            />
          )}
          {newsData.content2 && (
            <div className="news-content">{newsData.content2}</div>
          )}
        </div>
       
        <div className="Container-footer">
          <div className="footerNews">
            <p className="author">نویسنده: {newsData.author}</p>
            <div className="categories">
              {newsData.categories && newsData.categories.length > 0 ? (
                newsData.categories.map((cat, index) => (
                  <span key={index} className="category-tag">
                    {cat}
                  </span>
                ))
              ) : (
                <span className="no-category">No categories available</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewsPageshow;

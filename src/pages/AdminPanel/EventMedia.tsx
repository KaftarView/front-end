import React , {useEffect , useState} from "react";
import { FileText, Film, PresentationIcon , Image , AudioLines , Trash , Download} from "lucide-react";
import apiClient from '../../utils/apiClient'
import "./EventMedia.css";
import { useParams } from 'react-router-dom';

interface MediaItem {
  id: number;
  type: "video" | "word" | "pptx";
  title: string;
  src: string;
  thumbnail?: string;
  description?: string;
}

interface Media {
    id: number;
    mediaType: string;
    name: string;
    mediaPath: string;
    mediaSize: number;
    createdAt: string;
}

const MediaPage: React.FC = () => {
  const mediaItems: MediaItem[] = [
    {
      id: 1,
      type: "video",
      title: "Event Highlights",
      src: "/media/video1.mp4",
      thumbnail: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=800&auto=format&fit=crop&q=60",
      description: "Watch the highlights from our amazing event"
    },
    {
      id: 2,
      type: "word",
      title: "Event Brochure",
      src: "/media/document1.docx",
      description: "Detailed information about the event schedule and activities"
    },
    {
      id: 3,
      type: "pptx",
      title: "Event Presentation",
      src: "/media/slides1.pptx",
      description: "Complete presentation slides from the keynote speech"
    },
  ];
  const[medias , setMedias] = useState<Media[]>([]);
  const { id } = useParams();

  useEffect(() => {  
    const fetchData = async () => {  
      try {  
        const response = await apiClient.get(`/v1/admin/events/${id}/media`, {  
            headers: {  
              "ngrok-skip-browser-warning": "69420",  
              'Content-Type': 'application/json',
            },  
          });  
        console.log(response.data.data);
        setMedias(response.data.data);
        console.log(medias)
          
      } catch (error) {  
         
      } finally {  
        
      }  
    };  

    fetchData();  
  }, []);

  return (
    <div className="media-page">
      <header className="page-header">
        <h1>گالری رویداد</h1>
        <p>تمام مدیاهای موجود برای این رویداد</p>
      </header>

      <section className="admin-media-section">
        <h2>
          <Image className="section-icon" />
          تصاویر
        </h2>
        <div className="video-container">
          {medias
            .filter((item) => item.mediaType.startsWith("image/"))
            .map((video) => (
                <>
              <div key={video.id} className="video-card">
                <div className="get-media-image">
                  <img src={video.mediaPath} alt={video.name} />
                </div>
              </div>
              <div key={video.id} className="video-card">
                <div className="get-media-image">
                  <img src={video.mediaPath} alt={video.name} />
                </div>
              </div>
              <div key={video.id} className="video-card">
                <div className="get-media-image">
                  <img src={video.mediaPath} alt={video.name} />
                </div>
              </div>
              <div key={video.id} className="video-card">
                <div className="get-media-image">
                  <img src={video.mediaPath} alt={video.name} />
                </div>
              </div>
              <div key={video.id} className="video-card">
                <div className="get-media-image">
                  <img src={video.mediaPath} alt={video.name} />
                </div>
              </div>
              <div key={video.id} className="video-card">
                <div className="get-media-image">
                  <img src={video.mediaPath} alt={video.name} />
                </div>
              </div>
              </>
            ))}
        </div>
      </section>

      <section className="admin-media-section">
        <h2>
          <Film className="section-icon" />
          ویدیوها
        </h2>
        <div className="video-container">
          {medias
            .filter((item) => item.mediaType.startsWith("video/"))
            .map((video) => (
              <div key={video.id} className="video-card">
            <video height={160} width={300} controls> 
            <source src={video.mediaPath} type="video/mp4" />
            </video>

                <div className="video-info">
                  <h3>{video.name}</h3>
                  <p>size : {(video.mediaSize / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              </div>
            ))}
        </div>
      </section>

      <section className="admin-media-section">
        <h2>
          <AudioLines className="section-icon" />
                فایل‌های صوتی
        </h2>
        <div className="document-container">
          {medias
            .filter((item) => item.mediaType.startsWith('audio/'))
            .map((audio) => (
              <div key={audio.id} className="document-card">

                <div className="document-icon">
                  <AudioLines />
                  
                </div>
                <h4>{audio.name}</h4>
                <div className="media-audioplay">
                <audio controls>

                    <source src={audio.mediaPath} />
                </audio>
                </div>
                <div className="media-delete-download-icons">
                 <Download />   
                 <Trash/>
                </div>
              </div>
            ))}
        </div>
      </section>


      <section className="admin-media-section">
        <h2>
          <FileText className="section-icon" />
          فایل‌ها
        </h2>
        <div className="document-container">
          {medias
            .filter((item) => item.mediaType.split('/').pop() === "pdf" || item.mediaType.split('.').pop() === "document")
            .map((doc) => (
              <div key={doc.id} className="document-card">
                <div className="document-icon">
                  <FileText />
                </div>
                <div className="document-info">
                  <h3>{doc.name}</h3>
                  <p>size : {(doc.mediaSize / (1024 * 1024)).toFixed(2)} MB</p>
                  
                </div>
                <div className="media-delete-download-icons">
                 <Download />   
                 <Trash/>
                </div>
              </div>
            ))}
        </div>
      </section>

      <section className="admin-media-section">
        <h2>
          <PresentationIcon className="section-icon" />
          پاورپوینت
        </h2>
        <div className="document-container">
          {medias
            .filter((item) => item.mediaType.split('.').pop() === "presentation")
            .map((ppt) => (
              <div key={ppt.id} className="document-card">
                <div className="document-icon">
                  <PresentationIcon />
                </div>
                <div className="document-info">
                  <h3>{ppt.name}</h3>
                  <p>size: {(ppt.mediaSize / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
                {/* <a href={ppt.mediaPath} className="download-button" target="_blank" rel="noopener noreferrer">
                  Download
                </a> */}
                <div className="media-delete-download-icons">
                 <Download />   
                 <Trash/>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};


export default MediaPage;

// {medias
//     .filter((item) => item.mediaType.startsWith("video/"))
//     .map((video) => (
//       <div key={video.id} className="video-card">
//     <div className="video-thumbnail">
//         <video height={160} width={300} controls> 
//             <source src={video.mediaPath} type="video/mp4" />
//         </video>
//         <div className="video-info">
//           <h3>{video.name}</h3>
//           <p>{video.createdAt}</p>
//         </div>
//         </div>
//       </div>
//     ))}
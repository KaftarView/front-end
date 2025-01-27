import React, { useEffect, useState } from "react";
import "./createEpisode.css";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../utils/apiClient";
import axios, { CanceledError } from "axios";

interface Episode {
  name: string;
  description: string;
  banner: File;
  audio:File;
}

const Episode = () => {
  const { EpisodeId } = useParams<{ EpisodeId: string }>();
  const [Episodes, setEpisodes] = useState<Episode[]>([]);
  const [newEpisode, setNewEpisode] = useState<Episode>({
    name: "",
    description: "",
    audio:{} as File,
    banner: {} as File 

  });
  const [EpisodeType, setEpisodeType] = useState<string>(""); 
  const [errors, setErrors] = useState<Partial<Record<keyof Episode, string>>>( {});
  const [categories1, setCategories] = useState<string[]>([]);
  const [customCategories, setCustomCategories] = useState<string[]>([""]); 
  const [isCustomCategories, setIsCustomCategories] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const navigate = useNavigate();

  const handleEpisodeChange = (field: keyof Episode, value: string[] |string | number | File) => {
    setNewEpisode({ ...newEpisode, [field]: value });
    setErrors({ ...errors, [field]: "" });

  };

  const validateFields = (): boolean => {
    const newErrors: Partial<Record<keyof Episode, string>> = {};

    if (!newEpisode.name.trim()) newErrors.name = "نام الزامی است";
    if (!newEpisode.description.trim()) newErrors.description = "توضیحات الزامی است";



    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };


  const onSubmit = async () => {
    if (!validateFields()) return;
  

    let finalCategories: string[] = [];

  
    console.log("Final Categories:", finalCategories);
  
    const formData = new FormData();
    formData.append("name", newEpisode.name);
    formData.append("description", newEpisode.description);

  


  
    if (newEpisode.banner) formData.append("banner", newEpisode.banner);
    if (newEpisode.audio) formData.append("audio", newEpisode.banner);

  
    console.log([...formData]);
  
    try {
      const res = await apiClient.post("v1/admin/podcasts/49/episodes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      console.log(res);
    
      const EpisodeId = res.data.data; 
      console.log("Episode created successfully. Episode ID:", EpisodeId);
      alert("رویداد با موفقیت اضافه شد");
      navigate(`/Tickets/${EpisodeId}`);
     } catch (err) {
      console.error("Error creating Episode:", err);
    
      if (axios.isAxiosError(err)) {
        // Log or display the general error message
        console.error("Axios error message:", err.message);
    
        // Check for a server response
        if (err.response) {
          console.error("Response status code:", err.response.status);
          console.error("Response data:", err.response.data);
    
          // Extract specific error messages, if available
          const serverMessages = err.response.data.messages;
          if (serverMessages) {
            const formattedMessage = JSON.stringify(serverMessages)
                .replace(/["{}]/g, '') 
                .replace(/,/g, '\n')  
                .split('\n')          
                .map(line => {
                    const parts = line.split(':'); 
                    return parts.length > 2 
                        ? ` ${parts.slice(2).join(':')}` 
                        : line; 
                })
                .join('\n');
        
            console.log("meee " + formattedMessage);
            alert(formattedMessage);
        } else {
            alert("An error occurred: " + err.response.data.message);
        }
        
        
        } else {
          console.error("No response from server:", err.request);
          alert("پاسخی از سرور دریافت نشد مجدد تلاش کنید");
        }
      } 
    }
  };
  
  const resetForm = () => {
    setNewEpisode({
      name: "",

      description: "",

      banner: {} as File,
      audio: {} as File,


    });
    setEpisodeType("");
    setCustomCategories([]);
  };
  const handleNextPage = () => {
    navigate(`/podcast/${EpisodeId}`);
  };
  return (
    <html id="Episodeaa">
    <div className="addEpisode">
      <form className="addEpisode-form" encType="multipart/form-data">
        <h3 className="infoEpisode">مشخصات اپیزود</h3>

        <label className="LabeladdEpisode" htmlFor="name">
          عنوان اپیزود
        </label>
        <input
          type="text"
          id="name"
          value={newEpisode.name}
          onChange={(e) => handleEpisodeChange("name", e.target.value)}
          className={`addinput-fieldEpisode ${errors.name ? "error-field" : ""}`}
        />
        {errors.name && <span className="error-messageEpisode">{errors.name}</span>}

        
         <label className="LabeladdEpisode" htmlFor="description">توضیحات</label>
         <textarea
           id="description"
           onChange={(e) => handleEpisodeChange("description", e.target.value)}
          className={`addinput-fieldtik textarea-fieldtik  ${errors.description ? "error-field" : ""}`}

         />
         {errors.description && <span className="error-messageEpisode">{errors.description}</span>}




<label className="LabeladdEpisode" htmlFor="banner">محل بارگزاری عکس</label>

    <div className="L1Episode" >
      
        <input
          type="file"
          id="banner"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]; 
            if (file) {
              handleEpisodeChange("banner", file);
            }
          }}
          className={`a ${errors.banner ? "error-messageEpisode" : ""}`}
        />

</div>

<label className="LabeladdEpisode" htmlFor="banner">محل بارگزاری فایل</label>

    <div className="L1Episode" >
      
        <input
          type="file"
          id="audio"
          accept="audio/*"
          onChange={(e) => {
            const file = e.target.files?.[0]; 
            if (file) {
              handleEpisodeChange("audio", file);
            }
          }}
          className={`a ${errors.banner ? "error-messageEpisode" : ""}`}
        />

</div>

        <div className="buttonadd-containerEpisode">
          <button type="button" onClick={onSubmit} className="submitaddEpisode">
            ثبت
          </button>
          <button
        type="button"
        className="cancelEpisode"
        onClick={() => navigate("/Episodes")}
      >
        لغو
      </button>
        </div>
      </form>
    </div>
    </html>
  );
};

export default Episode;

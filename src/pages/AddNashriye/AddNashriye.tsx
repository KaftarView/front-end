

import React, { useEffect, useState } from "react";
import "./AddNashriye.css";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../utils/apiClient";
import axios, { CanceledError } from "axios";

interface Nashriye {
  name: string;
  description: string;
  // writers: { name: string }[];
  file: File|null;
  banner: File|null;
}

const Nashriye = () => {
  const { NashriyeId } = useParams<{ NashriyeId: string }>();
  const [Nashriyes, setNashriyes] = useState<Nashriye[]>([]);
  const [newNashriye, setNewNashriye] = useState<Nashriye>({
    name: "",
    description: "",
    file: null,
    banner: null, 

  });
  const [NashriyeType, setNashriyeType] = useState<string>(""); 
  const [errors, setErrors] = useState<Partial<Record<keyof Nashriye, string>>>( {});
  const navigate = useNavigate();
  const handleNashriyeChange = (field: keyof Nashriye, value: string[] |string | number | File) => {
    setNewNashriye({ ...newNashriye, [field]: value });
    setErrors({ ...errors, [field]: "" });
// Clear error for this field
  };

  const validateFields = (): boolean => {
    const newErrors: Partial<Record<keyof Nashriye, string>> = {};

    if (!newNashriye.name.trim()) newErrors.name = "نام الزامی است";
    if (!newNashriye.description.trim()) newErrors.description = "توضیحات الزامی است";
    if (!newNashriye.banner) newErrors.banner = "عکس الزامی است";
    if (!newNashriye.file) newErrors.file = "فایل الزامی است";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };


  const onSubmit = async () => {
    if (!validateFields()) return;
  


  
    const formData = new FormData();
    formData.append("name", newNashriye.name);
    formData.append("description", newNashriye.description);


    if (newNashriye.banner) formData.append("banner", newNashriye.banner);
    if (newNashriye.file) formData.append("file", newNashriye.file);

  
    console.log([...formData]);
  
    try {
      const res = await apiClient.post("/v1/admin/journal", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      console.log(res);
      const NashriyeId = res.data.data;
      console.log("Nashriye created successfully. Nashriye ID:", NashriyeId);
      alert("نشریه با موفقیت اضافه شد");
  

      navigate(`/nashriye`);
    } catch (err) {
      console.error("Error creating Event:", err);
    
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
            alert("Error: " + JSON.stringify(serverMessages));
          } else {
            alert("An error occurred: " + err.response.data);
          }
        } else {
          console.error("No response from server:", err.request);
          alert("No response from server. Please try again later.");
        }
      } 
    }
  };
  
  const resetForm = () => {
    setNewNashriye({
      name: "",
      description: "",

      banner: {} as File,
      file: {} as File,

    });
    setNashriyeType("");
  };
  const handleNextPage = () => {
    navigate(`/Discount/${NashriyeId}`);
  };
  return (
    <html id="nashriyee">
    <div className="eventnas">
      <form className="event-formnas" encType="multipart/form-data">
        <h3 className="infonas">مشخصات نشریه</h3>

        <label className="Labelnas" htmlFor="name">
          عنوان نشریه
        </label>
        <input
          type="text"
          id="name"
          value={newNashriye.name}
          onChange={(e) => handleNashriyeChange("name", e.target.value)}
          className={`addinput-fieldnas ${errors.name ? "error-field" : ""}`}
        />
        {errors.name && <span className="error-messageorg">{errors.name}</span>}



        
         <label className="Labelnas" htmlFor="description">توضیحات</label>
         <textarea
           id="description"
           onChange={(e) => handleNashriyeChange("description", e.target.value)}
          className={`addinput-fieldnas textarea-fieldnas ${errors.description ? "error-field" : ""}`}

         />
         {errors.description && <span className="error-messageorg">{errors.description}</span>}


         <label className="Labelnas" htmlFor="file">محل بارگزاری فایل</label>

    {/* <div className="L1nas" > */}
      
        <input
          type="file"
          id="file"
          accept="application/pdf"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleNashriyeChange("file", file);
            }
          }}
          className={`addinput-fieldnas ${errors.file ? "error-field" : ""}`}
          />

{/* </div> */}
{errors.file && (
            <span className="error-messageorg">{errors.file}</span>
          )}



<label className="Labelnas" htmlFor="banner">محل بارگزاری عکس</label>

    {/* <div className="L1nas" > */}
      
        <input
          type="file"
          id="banner"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleNashriyeChange("banner", file);
            }
          }}
          className={`addinput-fieldnas ${errors.banner ? "error-field" : ""}`}
          />

{/* </div> */}
{errors.file && (
            <span className="error-messageorg">{errors.banner}</span>
          )}

        <div className="buttonadd-containernas">
          <button type="button" onClick={onSubmit} className="submitnas">
            ثبت 
          </button>
          <button
        type="button"
        className="cancelnas"
        onClick={() => navigate("/Nashriyes")}
      >
        لغو
      </button>
        </div>
      </form>
    </div>
    </html>
  );
};

export default Nashriye;

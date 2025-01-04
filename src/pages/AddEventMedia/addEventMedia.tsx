// src/UploadPodcast.tsx

import React, { useState } from 'react';
import axios, { AxiosProgressEvent } from 'axios';
import { register } from 'module';
import "./addMedia.css"
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import apiClient from '../../utils/apiClient';


interface FormData {
    name: string;
    // banner: FileList;
    media:File; // Changed to FileList to handle file inputs properly
  }



const UploadMedia = () => {


  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  const { Id } = useParams<{ Id: string }>();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
  });
  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        const allowedTypes = [
            "audio/*",
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/vnd.ms-powerpoint",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            "image/*",
            "video/*",
          ];
          if (!allowedTypes.some((type) => file.type.match(type))) {
            setUploadError("Invalid file type. Please upload a valid file.");
            setSelectedFile(null);
            return;
          }
      setSelectedFile(file);
      setUploadError(null); // Reset error when file is selected again
    }
  };

  // Handle form submission and file upload
  const handleUpload = async (data: FormData) => {
    // const formData= new FormDataEvent();
    if (!selectedFile) {
      setUploadError('Please select a podcast file to upload.');
      return;
    }
    // console.log(data.audio);
    //  console.log(data.banner[0]);
    console.log(data.name);
    const formData = new FormData();
    formData.append("name", data.name);
    // if (data.banner && data.banner[0]) {
    //     formData.append("banner", data.banner[0]);
    //   }

    formData.append('media', selectedFile);
    // formData.append('')

    try {
      setIsUploading(true);
      setUploadProgress(0);
      setUploadSuccess(null);

      // Replace this URL with your actual API endpoint
      const apiUrl = `/v1/events/${Id}/media`;

      // Upload the file with progress
      const response=await apiClient.post(apiUrl, formData, {
        withCredentials: true,

        headers: {
           // "ngrok-skip-browser-warning": "69420",
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percent);
          }
        },
      });
      console.log(response);
      const eventId = response.data.data;
      console.log("episode created successfully. episode ID:", eventId);


      setIsUploading(false);
      setUploadSuccess('Podcast uploaded successfully!');
      setSelectedFile(null);
    } catch (error) {
      setIsUploading(false);
      setUploadError('An error occurred while uploading the podcast.');
      console.error('Upload failed:', error);
    }
  };

  return (
    <html id="e">
    <div className="upload-container-episode">
        <form 
        className='add-episod-form'
               encType="multipart/form-data"
               onSubmit={handleSubmit(handleUpload)}>
        <div>
        <label className="Labeladd-media" htmlFor="name">نام</label>
        <input
          type="string"
          id="name"
          {...register("name", { required: "نام رویداد الزامی است" })}

          className="addinput-field"
        />
                {errors.name && <p className="erroradd">{errors.name.message}</p>}

      </div>

      {/* <div className="event-banner">
      <label className="Labeladd" htmlFor="banner">عکس خود را بارگذاری کنید</label>
      <input
        className="addinput-field"
        type="file"
        id="banner"
        accept="image/*"
        {...register("banner", { required: "بارگذاری عکس الزامی است" })}

      />
       {errors.banner && <p className="erroradd">{errors.banner.message}</p>}

    </div> */}

      {/* <div>
      <label className="Labeladd" htmlFor="audio">فایل خود را بارگذاری کنید</label>

        <input className="addinput-field" type="file" accept="audio/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,image/*,video/*" onChange={handleFileChange} />
      </div>

      {uploadError && <p className="error">{uploadError}</p>}
      {uploadSuccess && <p className="success">{uploadSuccess}</p>}

      {selectedFile && !isUploading && (
        <div>
          <p>Selected file: {selectedFile.name}</p>
          <button onClick={()=>navigate("#")}
                    disabled={!isValid}
                    className={`submit-episod ${!isValid ? "submit-disabled" : ""}`}
            >بارگذاری قسمت جدید</button>
        </div>
      )}

      {isUploading && (
        <div>
          <p>Uploading... {uploadProgress}%</p>
        </div>
      )} */}
      <div>
  <label className="Labeladd-media" htmlFor="media">فایل خود را بارگذاری کنید</label>
  <input
    className="addinput-field"
    type="file"
    accept="audio/*,application/pdf,image/*,video/*,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-powerpoint"
    onChange={handleFileChange}
    key={uploadSuccess ? 'new-upload' : undefined} // Reset input on success
  />
</div>

{uploadError && <p className="error">{uploadError}</p>}
{uploadSuccess && <p className="success">{uploadSuccess}</p>}


{selectedFile && !isUploading && (
        <div>
          <p>Selected file: {selectedFile.name}</p>
          <button onClick={()=>{
      navigate("#")
   }// Reset errors
        }
                    disabled={!isValid}
                    className={`submit-episod ${!isValid ? "submit-disabled" : ""}`}
            >بارگذاری فایل جدید</button>
        </div>
      )}

{isUploading && (
  <div>
    <p>Uploading... {uploadProgress}%</p>
  </div>
)}

{uploadSuccess && (
    <div
    onClick={() => {
      setSelectedFile(null); // Clear file state
      setUploadSuccess(null); // Hide success message
      setUploadError(null); // Reset errors
    }}


  >

  </div>
)}


        </form>
    </div>
    </html>
  );
};

export default UploadMedia;

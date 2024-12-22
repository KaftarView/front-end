// src/UploadPodcast.tsx

import React, { useState } from 'react';
import axios, { AxiosProgressEvent } from 'axios';
import { register } from 'module';
import "./createEpisode.css"
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import apiClient from '../../utils/apiClient';


interface FormData {
    name: string;
    description: string;
    banner: FileList;
    audio:File; // Changed to FileList to handle file inputs properly
  }







const UploadPodcast = () => {


  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  const { podcastId } = useParams<{ podcastId: string }>();

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
     console.log(data.banner[0]);
    console.log(data.description);
    console.log(data.name);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    if (data.banner && data.banner[0]) {
        formData.append("banner", data.banner[0]);
      }

    formData.append('audio', selectedFile);
    // formData.append('')

    try {
      setIsUploading(true);
      setUploadProgress(0);
      setUploadSuccess(null);

      // Replace this URL with your actual API endpoint
      const apiUrl = `/v1/podcasts/${podcastId}/episodes`;

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
        <label className="Labeladd" htmlFor="name">نام اپیزود</label>
        <input
          type="string"
          id="name"
          {...register("name", { required: "نام اپیزود الزامی است" })}

          className="addinput-field"
        />
                {errors.name && <p className="erroradd">{errors.name.message}</p>}

      </div>
      <div>
      <label className="Labeladd" htmlFor="description"> توضیحات</label>
        <textarea
        //   type="text"
          id="description"
          className="addinput-field textarea-field"
          {...register("description", { required: "توضیحات الزامی است" })}

        />
                {errors.description && <p className="erroradd">{errors.description.message}</p>}

      </div>




      <div className="event-banner">
      <label className="Labeladd" htmlFor="banner">عکس خود را بارگذاری کنید</label>
      <input
        className="addinput-field"
        type="file"
        id="banner"
        accept="image/*"
        {...register("banner", { required: "بارگذاری عکس الزامی است" })}

      />
       {errors.banner && <p className="erroradd">{errors.banner.message}</p>}

    </div>






      <div>
      <label className="Labeladd" htmlFor="audio">فایل صوتی خود را بارگذاری کنید</label>

        <input className="addinput-field" type="file" accept="audio/*" onChange={handleFileChange} />
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
      )}

        </form>
    </div>
    </html>
  );
};

export default UploadPodcast;

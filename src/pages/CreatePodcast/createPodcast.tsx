// src/UploadPodcast.tsx

import React, { useEffect, useState } from 'react';
import axios, { AxiosProgressEvent, CanceledError } from 'axios';
import { register } from 'module';
import "./createPodcast.css"
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import apiClient from '../../utils/apiClient';


interface FormData {
    name: string;
    description: string;
    banner: FileList;
    category: string[];
  }







const AddPodcast = () => {


    const [categories, setCategories] = useState<string[]>([]);
    const [customCategory, setCustomCategory] = useState<string>("");
    const [isCustomCategory, setIsCustomCategory] = useState(false); 
    const [loadingCategories, setLoadingCategories] = useState(false);
  

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
  });
  // Handle file selection
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "other") {
      setIsCustomCategory(true);
    } else {
      setIsCustomCategory(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await apiClient.get("/v1/public/categories", {
          headers: {"ngrok-skip-browser-warning": "69420",
                'Content-Type': 'application/json' },
        });
        console.log(response.data.data); 
        setCategories(response.data.data); // Assuming response.data.category is string[]
      } catch (error) {
        if (error instanceof CanceledError) return;
        console.error("Error fetching categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };
  
    fetchCategories();
  }, []);

  // Handle form submission and file upload
  const handleCreate = async (data: FormData) => {
    // const formData= new FormDataEvent();
    // console.log(data.audio);
    const formData = new FormData();
    const selectedCategories = isCustomCategory
    ? customCategory
    : data.category;

    console.log(data.banner[0]);
    console.log(data.description);
    console.log(data.name);
    console.log(selectedCategories.toString());

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", selectedCategories.toString()); // Append categories

    if (data.banner && data.banner[0]) {
        formData.append("banner", data.banner[0]);
      }

      // formData.append('')

    try {


      // Replace this URL with your actual API endpoint
      const apiUrl = '/v1/podcasts';

      // Upload the file with progress
      const response=await apiClient.post(apiUrl, formData, {
        withCredentials: true,

        headers: {
            // "ngrok-skip-browser-warning": "69420",
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      const eventId = response.data.data;
      console.log("podcast created successfully. podcast ID:", eventId);
      navigate(`#`);

    } catch (error) {
        if (error instanceof CanceledError) return;
      console.error('creating failed:', error);
    }
  };

  return (
    <html id="e">

    <div className="upload-container-podcast">
        <form 
        className='add-podcast-form'
               encType="multipart/form-data"
               onSubmit={handleSubmit(handleCreate)}>
        <div>
        <label className="Labeladd" htmlFor="name">نام</label>
        <input
          type="string"
          id="name"
          {...register("name", { required: "نام پادکست الزامی است" })}

          className="addinput-field"
        />
         {errors.name && <p className="erroradd">{errors.name.message}</p>}

      </div>
      <div>
      <label className="Labeladd" htmlFor="description"> توضیحات</label>
        <textarea
          //type="text"
          id="description"
          className="addinput-field textarea-field"
          {...register("description", { required: "توضیحات الزامی است" })}

        />
        {errors.description && <p className="erroradd">{errors.description.message}</p>}

      </div>

      <label className="Labeladd" htmlFor="category">موضوع پادکست</label>
                  <select
                    id="category"
                    {...register("category", { required: "موضوع پادکست الزامی است" })}
                    onChange={handleCategoryChange}
                    className="custom-dropdown"
                  >
                    <option value="">انتخاب کنید</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
          <option value="other">سایر</option>
        </select>
        {errors.category && <p className="erroradd">{errors.category.message}</p>}
        {/* فیلد برای وارد کردن موضوع دلخواه */}
        {isCustomCategory && (
          <>
            <label className="Labeladd" htmlFor="category">موضوع دلخواه</label>
            <input
              type="text"
              id="category"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              className="addinput-field"
            />
          </>
        )}  


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
        <button onClick={()=>navigate("#")}
                    disabled={!isValid}
                    className={`submit-episod ${!isValid ? "submit-disabled" : ""}`}
>ساخت  پادکست</button>
        </div>
    



        </form>
    </div>
    </html>
  );
};

export default AddPodcast;

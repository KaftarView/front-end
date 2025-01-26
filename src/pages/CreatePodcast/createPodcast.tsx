import React, { useEffect, useState } from "react";
import "./createPodcast.css";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../utils/apiClient";
import axios, { CanceledError } from "axios";

interface Podcast {
  name: string;
  description: string;
  banner: File;
  categories: string[];
}

const Podcast = () => {
  const { PodcastId } = useParams<{ PodcastId: string }>();
  const [Podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [newPodcast, setNewPodcast] = useState<Podcast>({
    name: "",
    description: "",
    banner: {} as File, 
    categories: [],
  });
  const [PodcastType, setPodcastType] = useState<string>(""); 
  const [errors, setErrors] = useState<Partial<Record<keyof Podcast, string>>>( {});
  const [categories1, setCategories] = useState<string[]>([]);
  const [customCategories, setCustomCategories] = useState<string[]>([""]); 
  const [isCustomCategories, setIsCustomCategories] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const navigate = useNavigate();

  const handlePodcastChange = (field: keyof Podcast, value: string[] |string | number | File) => {
    setNewPodcast({ ...newPodcast, [field]: value });
    setErrors({ ...errors, [field]: "" });
    if (field=="categories" )
      {
        if(value=="other")
        {
          setIsCustomCategories(true);
        }
        else{
          setIsCustomCategories(false);

        }
      }
  };
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await apiClient.get("/v1/public/categories", {
          headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
          },
        });
        console.log(response.data.data);
        setCategories(response.data.data);
      } catch (error) {
        if (error instanceof CanceledError) return;
        console.error("Error fetching categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);
  const handleCategoriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    if (selectedCategory === "other") {
      setIsCustomCategories(true); 
    } else {
      setIsCustomCategories(false);
      setNewPodcast((prevPodcast) => ({
        ...prevPodcast,
        categories: [selectedCategory], 
      }));
    }
  };

  const handleCustomCategoryChange = (index: number, value: string) => {
    const newCustomCategories = [...customCategories];
    newCustomCategories[index] = value;
    setCustomCategories(newCustomCategories);
  };
  const handleAddCategory = () => {
    setCustomCategories((prev) => [...prev, ""]); 
  };
  const validateFields = (): boolean => {
    const newErrors: Partial<Record<keyof Podcast, string>> = {};

    if (!newPodcast.name.trim()) newErrors.name = "نام الزامی است";
    if (!newPodcast.description.trim()) newErrors.description = "توضیحات الزامی است";




    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };


  const onSubmit = async () => {
    if (!validateFields()) return;
  

    let finalCategories: string[] = [];
  
    if (isCustomCategories) {

      finalCategories = customCategories.filter((cat) => cat.trim() !== ""); // Remove empty entries
    } else {
    
      newPodcast.categories.forEach((category) => {
        finalCategories = [...finalCategories, ...category.split(",").map((cat) => cat.trim())];
      });
    }
  
    console.log("Final Categories:", finalCategories);
  
    const formData = new FormData();
    formData.append("name", newPodcast.name);

    formData.append("description", newPodcast.description);

    if (newPodcast.banner) formData.append("banner", newPodcast.banner);

    finalCategories.forEach((category) => {
      formData.append("categories", category);
    });

  
    console.log([...formData]);
  
    try {
      const res = await apiClient.post("/v1/admin/podcasts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      console.log(res);
    
      const PodcastId = res.data.data; 
      console.log("Podcast created successfully. Podcast ID:", PodcastId);
      alert("پادکست با موفقیت اضافه شد");
      navigate(`/podcasts`);
     } catch (err) {
      console.error("Error creating Podcast:", err);
    
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
            alert("An error occurred: " + err.response.data);
        }
        
        
        } else {
          console.error("No response from server:", err.request);
          alert("پاسخی از سرور دریافت نشد مجدد تلاش کنید");
        }
      } 
    }
  };
  
  const resetForm = () => {
    setNewPodcast({
      name: "",
      description: "",
      banner: {} as File, 
      categories: [],
    });
    setPodcastType("");
    setCustomCategories([]);
  };
  const handleNextPage = () => {
    navigate(`/podcasts`);
  };
  return (
    <html id="Podcastaa">
    <div className="addPodcast">
      <form className="addPodcast-form" encType="multipart/form-data">
        <h3 className="infoPodcast">مشخصات پادکست</h3>

        <label className="LabeladdPodcast" htmlFor="name">
          عنوان پادکست
        </label>
        <input
          type="text"
          id="name"
          value={newPodcast.name}
          onChange={(e) => handlePodcastChange("name", e.target.value)}
          className={`addinput-fieldPodcast ${errors.name ? "error-field" : ""}`}
        />
        {errors.name && <span className="error-messagePodcast">{errors.name}</span>}




        <label className="LabeladdPodcast" htmlFor="categories">موضوع رویداد</label>
        <select onChange={handleCategoriesChange} className="custom-dropdownePodcast">
          <option>انتخاب کنید</option>
          {categories1.map((category) => (
            <option value={category}>{category}</option>
          ))}
          <option value="other">سایر</option>
        </select>

        {isCustomCategories && (
          <>
            <div>
              {customCategories.map((category, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => handleCustomCategoryChange(index, e.target.value)}
                    className="addinput-fieldPodcast"
                  />
                </div>
              ))}
                      <div className="buttonadd-containerPodcast">
              <button className="submitaddPodcast" type="button" onClick={handleAddCategory}>
                افزودن
              </button>
              </div>
            </div>
          </>
        )}
        
         <label className="LabeladdPodcast" htmlFor="description">توضیحات</label>
         <textarea
           id="description"
           onChange={(e) => handlePodcastChange("description", e.target.value)}
          className={`addinput-fieldtik textarea-fieldtik  ${errors.description ? "error-field" : ""}`}

         />
         {errors.description && <span className="error-messagePodcast">{errors.description}</span>}


<label className="LabeladdPodcast" htmlFor="banner">محل بارگزاری عکس</label>

    <div className="L1Podcast" >
      
        <input
          type="file"
          id="banner"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]; 
            if (file) {
              handlePodcastChange("banner", file);
            }
          }}
          className={`a ${errors.banner ? "error-messagePodcast" : ""}`}
        />

</div>

        <div className="buttonadd-containerPodcast">
          <button type="button" onClick={onSubmit} className="submitaddPodcast">
            ثبت
          </button>
          <button
        type="button"
        className="cancelPodcast"
        onClick={() => navigate("/podcasts")}
      >
        لغو
      </button>
        </div>
      </form>
    </div>
    </html>
  );
};

export default Podcast;

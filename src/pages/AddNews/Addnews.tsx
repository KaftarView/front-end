import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./AddNews.css";
import axios, { all, CanceledError } from "axios";
import apiClient from "../../utils/apiClient";

interface FormData {
  title: string;
  description: string;
  content: string;
  content2?: string;
  categories: string[];
  banner: FileList;
  banner2?: FileList;
}

const Addnews: React.FC = () => {
  const [template, setTemplate] = useState<1 | 2>(1);
  const [categories1, setCategories] = useState<string[]>([]);
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [isCustomCategories, setIsCustomCategories] = useState(false);
  const [categories2, setCategories2] = useState<string>();
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<FormData>({
    mode: "onChange",
  });

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
        // console.log(response.data.data)
        setCategories(response.data.data);
        // console.log(";;;;;;;;;;")
        // console.log(categories1)
      } catch (error) {
        if (error instanceof CanceledError) return;
        console.error("Error fetching categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = () => {
    setCustomCategories((prev) => [...prev, ""]);
  };

  const handleCustomCategoryChange = (index: number, value: string) => {
    setCustomCategories((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  // const handleCategoriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const value = e.target.value;
  //   if (value === "other") {
  //     setIsCustomCategories(true);
  //     handleAddCategory();
  //   } else if (value) {
  //     // setCategories2((prev) => [...new Set(value)]);
  //     setCategories2(e.target.value);
  //     setIsCustomCategories(false);
  //   }
  // };

  const handleCategoriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "other") {
      setIsCustomCategories(true); // Show custom category input
      setCategories2(undefined); // Clear the selected predefined category
    } else if (value) {
      setCategories2(value); // Set the selected predefined category
      setIsCustomCategories(false); // Hide custom category input
    }
  };

  const validateFields = (data: FormData): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!data.title.trim()) {
      newErrors.title = "نام خبر الزامی است";
    }
    if (!data.description.trim()) {
      newErrors.description = "توضیحات خبر الزامی است";
    }
    if (!data.content.trim()) {
      newErrors.content = "محتوا الزامی است";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (data: FormData) => {
    // console.log(data)
    // console.log("data")
    if (!validateFields(data)) return;
    // console.log(data)

    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("content", data.content);
 
  const allCategories =
  isCustomCategories && customCategories.length > 0
    ? customCategories
    : categories2;

console.log(categories2);
console.log(customCategories);

// Prepare categories array
const categoriesArray: string[] = Array.isArray(allCategories)
  ? [...allCategories] // Copy all elements if it's an array
  : allCategories
  ? [allCategories] // Wrap single value into an array
  : [];

// Filter out undefined values (if any)
const filteredCategoriesArray = categoriesArray.filter(
  (category): category is string => category !== undefined
);

// Append categories array to FormData
filteredCategoriesArray.forEach((category) => {
  formData.append("categories", category); // Adjust key format to what backend expects
});

console.log(filteredCategoriesArray);

    if (data.banner) {
      formData.append("banner", data.banner[0]);
      console.log(data.banner);
    }

    if (template === 2 && data.content2) {
      formData.append("content2", data.content2);
    }

    if (template === 2 && data.banner2 && data.banner2[0]) {
      formData.append("banner2", data.banner2[0]);
    }
    console.log(...formData);

    try {
      const response = await apiClient.post("/v1/admin/news", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Event created successfully:", response.data);
      reset();
    } catch (err) {
      if (err instanceof CanceledError) return;
      console.error("Error creating news:", err);
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

  return (
    <html id="eeee">
      <div className="eventadd">
        <form
          className="eventadd-formeditnews"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="infoaddetidnews">مشخصات خبر</h3>

          <label htmlFor="template" className="Labeladd">
            انتخاب قالب
          </label>
          <select
            id="template"
            value={template}
            onChange={(e) => setTemplate(Number(e.target.value) as 1 | 2)}
            className="addinput-fieldevent"
          >
            <option value={1}>قالب 1</option>
            <option value={2}>قالب 2</option>
          </select>

          <label htmlFor="title" className="Labeladd">
            خبر
          </label>
          <input
            type="text"
            id="title"
            {...register("title")}
            className={`addinput-fieldevent ${
              errors.title ? "error-field" : ""
            }`}
          />
          {errors.title && (
            <span className="error-messageevent">{errors.title}</span>
          )}

          <label htmlFor="description" className="Labeladd">
            توضیحات
          </label>
          <textarea
            id="description"
            {...register("description")}
            className={`addinput-fieldevent textarea-field ${
              errors.description ? "error-field" : ""
            }`}
          />
          {errors.description && (
            <span className="error-messageevent">{errors.description}</span>
          )}

          <label className="Labeladd" htmlFor="Categories">
            موضوع رویداد
          </label>
          <select
            onChange={handleCategoriesChange}
            className="custom-dropdowneNews"
          >
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
                      onChange={(e) =>
                        handleCustomCategoryChange(index, e.target.value)
                      }
                      className="addinput-fieldevent"
                    />
                  </div>
                ))}
                <div className="buttonadd-containerNews">
                  <button
                    className="submitaddNews"
                    type="button"
                    onClick={handleAddCategory}
                  >
                    افزودن
                  </button>
                </div>
              </div>
            </>
          )}

          <label htmlFor="content1" className="Labeladd">
            محتوا
          </label>
          <textarea
            id="content1"
            {...register("content")}
            className={`addinput-fieldevent textarea-field ${
              errors.content ? "error-field" : ""
            }`}
          />
          {errors.content && (
            <span className="error-messageevent">{errors.content}</span>
          )}

          <label className="Labeladd" htmlFor="banner">
            عکس خود را بارگذاری کنید
          </label>
          <input
            type="file"
            id="banner"
            accept="image/*"
            {...register("banner", { required: true })} // Register the banner input
            className={`addinput-fieldevent`}
          />

          {template === 2 && (
            <>
              <label htmlFor="content2" className="Labeladd">
                محتوای اضافی
              </label>
              <textarea
                id="content2"
                {...register("content2")}
                className="addinput-fieldevent textarea-field"
              />
              <label className="Labeladd" htmlFor="banner">
                بارگذاری بنر اضافی
              </label>
              <input
                type="file"
                id="banner2"
                accept="image/*"
                {...register("banner2", { required: true })} // Register the banner input
                className={`addinput-fieldevent `}
              />
            </>
          )}

          <div className="buttonadd-container">
            <button
              type="submit"
              disabled={!isValid}
              className={`submitadd ${!isValid ? "submit-disabled" : ""}`}
            >
              ثبت
            </button>
            <button
              type="button"
              className="canceladd"
              onClick={() => navigate("/news-page")}
            >
              لغو
            </button>
          </div>
        </form>
      </div>
    </html>
  );
};

export default Addnews;


import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./AddNews.css";
import axios, { CanceledError } from "axios";
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
  const [categories2, setCategories2] = useState<string[]>([]);
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
        const response = await axios.get(
          "https://66e1-212-64-199-253.ngrok-free.app/v1/public/categories",
          {
            headers: {
              "ngrok-skip-browser-warning": "69420",
              "Content-Type": "application/json",
            },
          }
        );
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

  const handleCategoriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "other") {
      setIsCustomCategories(true);
      handleAddCategory();
    } else if (value) {
      setCategories2((prev) => [...new Set([value])]);
      setIsCustomCategories(false);
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

    const allCategories = [...categories2, ...customCategories].filter(Boolean);

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("content", data.content);
    formData.append("categories", JSON.stringify(allCategories));
    console.log(allCategories);

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

    try {
      const response = await apiClient.post("/v1/admin/news", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Event created successfully:", response.data);
      reset();
    } catch (error) {
      if (error instanceof CanceledError) return;
      console.error("Error creating event:", error);
    }
  };

  return (
    <html id="eeee">
      <div className="eventadd">
        <form
          className="eventadd-form"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="infoadd">مشخصات خبر</h3>

          <label htmlFor="template" className="Labeladd">
            انتخاب قالب
          </label>
          <select
            id="template"
            value={template}
            onChange={(e) => setTemplate(Number(e.target.value) as 1 | 2)}
            className="addinput-field"
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
            className={`addinput-field ${errors.title ? "error-field" : ""}`}
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
            className={`addinput-field textarea-field ${
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
                      className="addinput-field"
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
            className={`addinput-field textarea-field ${
              errors.content ? "error-field" : ""
            }`}
          />
          {errors.content && (
            <span className="error-messageevent">{errors.content}</span>
          )}

          <div className="inadd">
            <label className="Labeladd" htmlFor="banner">
              عکس خود را بارگذاری کنید
            </label>
            <input
              type="file"
              id="banner"
              accept="image/*"
              className="addinput-field"
            />
            
          </div>

          {template === 2 && (
            <>
              <label htmlFor="content2" className="Labeladd">
                محتوای اضافی
              </label>
              <textarea
                id="content2"
                {...register("content2")}
                className="addinput-field textarea-field"
              />
              <label htmlFor="banner2" className="Labeladd">
                بارگذاری بنر اضافی
              </label>
              <input
                type="file"
                id="banner2"
                accept="image/*"
                className="addinput-field"
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

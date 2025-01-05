import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios, { CanceledError } from "axios";
import "./EditNew.css";
import apiClient from "../../utils/apiClient";
import { FaTrash } from "react-icons/fa";

interface FormData {
  title: string;
  description: string;
  content: string;
  content2?: string;
  banner: File | string | null;
  banner2?: File | string | null;
  categories: string[];
  // author: string;
}

const EditNews: React.FC = () => {
  const { NewsId } = useParams<{ NewsId: string }>();
  const [initialData, setInitialData] = useState<FormData | null>(null);
  const [newEdit, setNewEdit] = useState<FormData>({
    title: "",
    description: "",
    content: "",
    content2: "",
    banner: null,
    banner2: null,
    categories: [],
    // author: "",
  });
  const [selectedTemplate, setSelectedTemplate] = useState<
    "template1" | "template2"
  >("template1");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await apiClient.get(`/v1/public/news/${NewsId}`, {
          headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
          },
        });
        const newsData = response.data.data;
        console.log(newsData);
        const cat = Array.isArray(newsData.categories)
          ? newsData.categories
          : newsData.categories
          ? newsData.categories.split(",")
          : [];

        setInitialData(newsData);
        setNewEdit({
          title: newsData.title,
          description: newsData.description,
          content: newsData.content,
          content2: newsData.content2 || "",
          banner: newsData.banner || null,
          banner2: newsData.banner2 || null,
          categories: cat,
          // author: newsData.author,
        });
        console.log(newEdit.title);

        setSelectedTemplate(
          newsData.content2 || newsData.banner2 ? "template2" : "template1"
        );
      } catch (error) {
        if (error instanceof CanceledError) return;
        console.error("Unable to fetch news data:", error);
      }
    };

    if (NewsId) {
      fetchNews();
    }
  }, [NewsId]);

  const handleFieldChange = (
    field: keyof FormData,
    value: string | File | null
  ) => {
    setNewEdit({ ...newEdit, [field]: value });
  };

  const handleFileChange =
    (field: "banner" | "banner2") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const file = event.target.files[0];
        handleFieldChange(field, file);
      }
    };


  const handleTemplateChange = (template: "template1" | "template2") => {
    setSelectedTemplate(template);

    // Reset fields if switching to template1
    if (template === "template1") {
      setNewEdit((prev) => ({
        ...prev,
        content2: "",
        banner2: null,
      }));
    }
  };

  

  const handleCategoryChange = (index: number, value: string) => {
    const updatedCategories = [...newEdit.categories];
    updatedCategories[index] = value;
    setNewEdit({ ...newEdit, categories: updatedCategories });
  };
  const addCategory = () => {
    setNewEdit({ ...newEdit, categories: [...newEdit.categories, ""] });
  };

  const deleteCategory = (index: number) => {
    const updatedCategories = newEdit.categories.filter((_, i) => i !== index);
    setNewEdit({ ...newEdit, categories: updatedCategories });
  };

  const onSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const formData = new FormData();

    if (newEdit.title && newEdit.title !== initialData?.title) {
      formData.append("title", newEdit.title);
    }
    if (
      newEdit.description &&
      newEdit.description !== initialData?.description
    ) {
      formData.append("description", newEdit.description);
    }
    if (newEdit.content && newEdit.content !== initialData?.content) {
      formData.append("content", newEdit.content);
    }
    if (
      selectedTemplate === "template2" &&
      newEdit.content2 &&
      newEdit.content2 !== initialData?.content2
    ) {
      formData.append("content2", newEdit.content2);
    }
    if (newEdit.banner && newEdit.banner !== initialData?.banner) {
      formData.append("banner", newEdit.banner);
    }
    // if (selectedTemplate === "template2" && newEdit.banner2) {
    //   formData.append("banner2", newEdit.banner2);
    // }
    if (
      selectedTemplate === "template2" &&
      newEdit.banner2 &&
      newEdit.banner2 !== initialData?.banner2
    ) {
      formData.append("banner2", newEdit.banner2);
    }
    const newCategories = newEdit.categories;

    newCategories.forEach((category) => {
      formData.append("categories", category); 
    });

    // if (selectedTemplate === "template1") {
    //   formData.append("content2", "");
    //   formData.append("banner2", "");
    // }

    try {
      console.log("Submitting form data...");
      console.log(selectedTemplate);
      console.log(formData.keys);
      const response = await apiClient.put(
        `/v1/admin/news/${NewsId}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("News updated successfully:", response.data);
      // navigate(`/news/${NewsId}`);
    } catch (error) {
      console.error("Error updating news:", error);
    }
  };

  return (
    <html id="eeee">
      <div className="eventadd">
        <form className="eventadd-form">
          <h3 className="form-title">ویرایش خبر</h3>

          <label htmlFor="template" className="Labeladd">
            انتخاب قالب
          </label>
          <select
            id="template"
            value={selectedTemplate}
            onChange={(e) =>
              handleTemplateChange(e.target.value as "template1" | "template2")
            }
            className="addinput-field"
          >
            <option value="template1">قالب 1</option>
            <option value="template2">قالب 2</option>
          </select>

          <label className="Labeladd" htmlFor="title">
            عنوان{" "}
          </label>
          <input
            // type="text"
            id="title"
            value={newEdit.title}
            onChange={(e) => handleFieldChange("title", e.target.value)}
            className="addinput-field"
            required
          />

          <label htmlFor="description" className="Labeladd">
            توضیحات
          </label>
          <textarea
            id="description"
            value={newEdit.description}
            onChange={(e) => handleFieldChange("description", e.target.value)}
            required
            className="addinput-field textarea-field"
          />

          <label htmlFor="content" className="Labeladd">
            محتوا
          </label>
          <textarea
            id="content"
            value={newEdit.content}
            onChange={(e) => handleFieldChange("content", e.target.value)}
            required
            className="addinput-field textarea-field"
          />

          {selectedTemplate === "template2" && (
            <>
              <label htmlFor="content2" className="Labeladd">
                محتوای اضافی
              </label>
              <textarea
                id="content2"
                value={newEdit.content2}
                onChange={(e) => handleFieldChange("content2", e.target.value)}
                className="addinput-field textarea-field"
              />

              <label htmlFor="banner2" className="Labeladd">
                بنر اضافی
              </label>
              <div className="L1">
                <input
                  type="file"
                  id="banner2"
                  accept="image/*"
                  onChange={handleFileChange("banner2")}
                  className="addinput-field"
                />
                {typeof newEdit.banner2 === "string" && (
                  <img
                    src={newEdit.banner2}
                    alt="Current banner2"
                    width="100"
                  />
                )}
              </div>
            </>
          )}
          <label className="Labelpad" htmlFor="categories">
            موضوعات
          </label>
          {newEdit.categories.map((category, index) => (
            <div key={index} className="writer-field">
              <input
                type="text"
                value={category}
                onChange={(e) => handleCategoryChange(index, e.target.value)}
                className="addinput-fieldpad"
                required
              />
              <FaTrash
                className="trash-icon"
                onClick={() => deleteCategory(index)}
              />
            </div>
          ))}

          <div className="buttonadd-containerpad">
            <button type="button" onClick={addCategory} className="submitpad">
              افزودن
            </button>
          </div>


          <label htmlFor="banner" className="Labeladd">
            بنر
          </label>
          <div className="L1">
            <input
              type="file"
              id="banner"
              accept="image/*"
              onChange={handleFileChange("banner")}
              // onChange={handleFileChange}
              className="addinput-field"
            />
            {/* {typeof newEdit.Banner === "string" && (
            <img src={newEdit.Banner} alt="Current banner" width="100" />
          )} */}
            {typeof newEdit.banner === "string" && newEdit.banner && (
              <div>
                <img
                  src={newEdit.banner}
                  alt="Current banner"
                  style={{ width: "100px", height: "100px" }}
                />
                <p>تصویر فعلی</p>
              </div>
            )}
          </div>

          <div className="buttonadd-container">
            <button type="submit" onClick={onSubmit} className={"submitadd "}>
              ثبت
            </button>
          </div>
        </form>
      </div>
    </html>
  );
};

export default EditNews;

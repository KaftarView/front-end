import React, { useEffect, useState } from "react"; 
import { useNavigate, useParams } from "react-router-dom";
import axios, { CanceledError } from "axios";
import apiClient from "../../utils/apiClient";
import "./EditPadcast.css";
import { FaTrash } from "react-icons/fa";

interface EditPadcast {
  name: string;
  categories: string[];
  banner: File | string | null;
}

const EditPadcast: React.FC = () => {
  const { Ticketid } = useParams<{ Ticketid: string }>();
  const [initialData, setInitialData] = useState<EditPadcast | null>(null);
  const [newedit, setnewedit] = useState<EditPadcast>({
    name: "",
    categories: [],
    banner: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await apiClient.get(`/v1/public/podcasts/2`, {
          headers: { "ngrok-skip-browser-warning": "69420" },
        });
        const eventData = response.data.data;
  
        console.log(eventData);
  
        setInitialData(eventData);

        const categories = Array.isArray(eventData.categories)
          ? eventData.categories
          : eventData.categories ? eventData.categories.split(",") : []; 
  
        setnewedit({
          name: eventData.name,
          categories: categories,
          banner: eventData.banner || null,
        });
      } catch (error) {
        if (error instanceof CanceledError) return;
        console.error("Unable to fetch event data:", error);
      }
    };
  
    fetchEvent();
  }, [Ticketid]);

  const handleTicketChange = (field: keyof EditPadcast, value: string | File | null) => {
    setnewedit({ ...newedit, [field]: value });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      handleTicketChange("banner", file); 
    }
  };

  const handleCategoryChange = (index: number, value: string) => {
    const updatedCategories = [...newedit.categories];
    updatedCategories[index] = value;
    setnewedit({ ...newedit, categories: updatedCategories });
  };

  const addCategory = () => {
    setnewedit({ ...newedit, categories: [...newedit.categories, ""] });
  };

  const deleteCategory = (index: number) => {
    const updatedCategories = newedit.categories.filter((_, i) => i !== index);
    setnewedit({ ...newedit, categories: updatedCategories });
  };

  const onSubmit = async () => {
    try {
      const formData = new FormData();
  
      if (newedit.name && newedit.name !== initialData?.name) {
        formData.append("name", newedit.name);
      }
  

      const newCategories = newedit.categories;
  

      newCategories.forEach((category) => {
        formData.append("categories", category); 
      });
  
      if (newedit.banner && newedit.banner !== initialData?.banner) {
        formData.append("banner", newedit.banner);
      }
      console.log([...formData]);
  
      const res = await apiClient.put(`/v1/admin/podcasts/2`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Podcast updated successfully:", res.data);
      alert("پادکست با موفقیت ادیت شد");

      navigate("/podcasts"); 
    } catch (err) {
      if (err instanceof CanceledError) return;
      console.error("Error updating podcast:", err);
    }
  };
  
  return (
    <html id="podcaste">
    <div className="eventpad">
      <form className="event-formpad">
        <h3 className="infopad">ویرایش پادکست</h3>

        <div className="ticket-formpad">
          <label className="Labelpad" htmlFor="name">عنوان پادکست</label>
          <input
            type="text"
            id="name"
            value={newedit.name}
            onChange={(e) => handleTicketChange("name", e.target.value)}
            className="addinput-fieldpad"
            required
          />

           <label className="Labelpad" htmlFor="categories">موضوعات</label>
           {newedit.categories.map((category, index) => (
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

          <label className="Labelpad" htmlFor="banner">محل بارگزاری عکس</label>
          <div className="L1pad">
            <input
              type="file"
              id="banner"
              accept="image/*"
              onChange={handleFileChange} 
            />
            {typeof newedit.banner === "string" && newedit.banner && (
              <div>
                <img
                  src={newedit.banner}
                  alt="Current banner"
                  style={{ width: "100px", height: "100px" }}
                />
                <p>تصویر فعلی</p>
              </div>
            )}
          </div>

          <div className="buttonadd-containerpad">
            <button type="button" onClick={onSubmit} className="submitpad">
              ثبت
            </button>
            <button
        type="button"
        className="cancelnas"
        onClick={() => navigate("/podcasts")}
      >
        لغو
      </button>
          </div>
        </div>
      </form>
    </div>
    </html>
  );
};

export default EditPadcast;


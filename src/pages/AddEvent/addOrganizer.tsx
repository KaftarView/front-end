import React, { useState } from "react";
import "./addOrganizer.css";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../utils/apiClient";
import axios from "axios";

interface Organizer {
  name: string;
  description: string;
  email: string;
  profile: File | null;
}

const Organizer = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [organizers, setOrganizers] = useState<Organizer[]>([]);
  const [newOrganizer, setNewOrganizer] = useState<Organizer>({
    name: "",
    description: "",
    email: "",
    profile: null,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Organizer, string>>>(
    {}
  );

  const navigate = useNavigate();

  const handleOrganizerChange = (
    field: keyof Organizer,
    value: string | File | null
  ) => {
    setNewOrganizer({ ...newOrganizer, [field]: value });
    setErrors({ ...errors, [field]: "" }); 
  };

  const validateFields = (): boolean => {
    const newErrors: Partial<Record<keyof Organizer, string>> = {};

    if (!newOrganizer.name.trim()) newErrors.name = "نام الزامی است";
    if (!newOrganizer.description.trim())
      newErrors.description = "توضیحات الزامی است";
    if (!newOrganizer.email.trim()) newErrors.email = "ایمیل الزامی است";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newOrganizer.email))
      newErrors.email = "فرمت ایمیل نامعتبر است";
    if (!newOrganizer.profile) newErrors.profile = "عکس الزامی است";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const onSubmit = async () => {
    if (!validateFields()) return;

    const formData = new FormData();
    formData.append("name", newOrganizer.name);
    formData.append("description", newOrganizer.description);
    formData.append("email", newOrganizer.email);
    if (newOrganizer.profile) formData.append("profile", newOrganizer.profile);
    console.log(newOrganizer.name);
    console.log(newOrganizer.description);
    console.log(newOrganizer.profile);

    console.log(newOrganizer.email);
  


    try {
      const res = await apiClient.post(
        `/v1/admin/events/add-organizer/${eventId}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Organizer created successfully:", res.data);
      alert("برگزارکننده با موفقیت اضافه شد");

      setOrganizers([...organizers, newOrganizer]);
      setNewOrganizer({
        name: "",
        description: "",
        email: "",
        profile: null,
      });
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

  const handleNextPage = () => {
    navigate(`/events`);
  };

  return (
    <html id="orge">
      <div className="eventorg">
        <form className="event-formorg" encType="multipart/form-data">
          <h3 className="infoorg">مشخصات برگزارکننده</h3>

          <label className="Labeladdorg" htmlFor="name">
            نام
          </label>
          <input
            type="text"
            id="name"
            value={newOrganizer.name}
            onChange={(e) => handleOrganizerChange("name", e.target.value)}
            className={`addinput-fieldorg ${errors.name ? "error-field" : ""}`}
          />
          {errors.name && <span className="error-messageorg">{errors.name}</span>}

          <label className="Labeladdorg" htmlFor="email">
            ایمیل
          </label>
          <input
            type="text"
            id="email"
            value={newOrganizer.email}
            onChange={(e) => handleOrganizerChange("email", e.target.value)}
            className={`addinput-fieldorg ${errors.email ? "error-field" : ""}`}
          />
          {errors.email && <span className="error-messageorg">{errors.email}</span>}

          <label className="Labeladdorg" htmlFor="description">
            توضیحات
          </label>
          <textarea
            id="description"
            value={newOrganizer.description}
            onChange={(e) =>
              handleOrganizerChange("description", e.target.value)
            }
            className={`addinput-fieldevent textarea-fieldevent ${
              errors.description ? "error-field" : ""
            }`}
          />
          {errors.description && (
            <span className="error-messageorg">{errors.description}</span>
          )}

          <label className="Labeladdorg" htmlFor="profile">
            عکس
          </label>
          <input
            type="file"
            id="profile"
            accept="image/*"
            onChange={(e) =>
              handleOrganizerChange("profile", e.target.files?.[0] || null)
            }
            className={`addinput-fieldorg ${errors.profile ? "error-field" : ""}`}
          />
          {errors.profile && (
            <span className="error-messageorg">{errors.profile}</span>
          )}

          <div className="buttonadd-containerorg">
            <button type="button" onClick={onSubmit} className="submitorg">
              ثبت
            </button>
            <button
              type="button"
              onClick={handleNextPage}
              className="next-page-btnorg"
            >
              پایان
            </button>
          </div>
        </form>
      </div>
    </html>
  );
};

export default Organizer;

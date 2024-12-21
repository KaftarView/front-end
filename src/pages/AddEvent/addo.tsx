import React, { useState } from "react";
import "./addo.css";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../utils/apiClient";

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
    setErrors({ ...errors, [field]: "" }); // Clear error for this field
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
    return Object.keys(newErrors).length === 0; // Return true if no errors
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
        `/v1/events/add-organizer/${eventId}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Organizer created successfully:", res.data);

      setOrganizers([...organizers, newOrganizer]);
      setNewOrganizer({
        name: "",
        description: "",
        email: "",
        profile: null,
      });
    } catch (err) {
      console.error("Error creating Organizer:", err);
    }
  };

  const handleNextPage = () => {
    navigate(`/events`);
  };

  return (
    <html id="ee">
      <div className="eventtik">
        <form className="event-formtik" encType="multipart/form-data">
          <h3 className="infotik">مشخصات برگزارکننده</h3>

          <label className="Labeladd" htmlFor="name">
            نام
          </label>
          <input
            type="text"
            id="name"
            value={newOrganizer.name}
            onChange={(e) => handleOrganizerChange("name", e.target.value)}
            className={`addinput-field ${errors.name ? "error-field" : ""}`}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}

          <label className="Labeladd" htmlFor="email">
            ایمیل
          </label>
          <input
            type="text"
            id="email"
            value={newOrganizer.email}
            onChange={(e) => handleOrganizerChange("email", e.target.value)}
            className={`addinput-field ${errors.email ? "error-field" : ""}`}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}

          <label className="Labeladd" htmlFor="description">
            توضیحات
          </label>
          <textarea
            id="description"
            value={newOrganizer.description}
            onChange={(e) =>
              handleOrganizerChange("description", e.target.value)
            }
            className={`addinput-field textarea-field ${
              errors.description ? "error-field" : ""
            }`}
          />
          {errors.description && (
            <span className="error-message">{errors.description}</span>
          )}

          <label className="Labeladd" htmlFor="profile">
            عکس
          </label>
          <input
            type="file"
            id="profile"
            accept="image/*"
            onChange={(e) =>
              handleOrganizerChange("profile", e.target.files?.[0] || null)
            }
            className={`addinput-field ${errors.profile ? "error-field" : ""}`}
          />
          {errors.profile && (
            <span className="error-message">{errors.profile}</span>
          )}

          <div className="buttonadd-container">
            <button type="button" onClick={onSubmit} className="submittik">
              ثبت
            </button>
            <button
              type="button"
              onClick={handleNextPage}
              className="next-page-btntik"
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


import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios, { CanceledError } from "axios";
import apiClient from "../../utils/apiClient";
import "./EditEpisode.css";

interface EditEpisode {
  name: string;
  audio: File | string | null;
}

const EditEpisode: React.FC = () => {
  const { Ticketid } = useParams<{ Ticketid: string }>();
  const [initialData, setInitialData] = useState<EditEpisode | null>(null);
  const [newedit, setnewedit] = useState<EditEpisode>({
    name: "",
    audio: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await apiClient.get(`/v1/public/episodes/2`, {
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
          audio: eventData.audio || null,
        });
      } catch (error) {
        if (error instanceof CanceledError) return;
        console.error("Unable to fetch event data:", error);
      }
    };
  
    fetchEvent();
  }, [Ticketid]);

  const handleTicketChange = (field: keyof EditEpisode, value: string | File | null) => {
    setnewedit({ ...newedit, [field]: value });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      handleTicketChange("audio", file); 
    }
  };



  const onSubmit = async () => {
    try {
      const formData = new FormData();

      // Only append if the value has changed
      if (newedit.name && newedit.name !== initialData?.name) {
        formData.append("name", newedit.name);
      }

      // Append categories as a comma-separated string

      // Append the audio (whether it's a file or URL)
      if (newedit.audio && newedit.audio !== initialData?.audio) {
        formData.append("audio", newedit.audio); // Append the audio file or URL
      }

      const res = await apiClient.put(`/v1/episodes/2`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Podcast updated successfully:", res.data);

    } catch (err) {
      if (err instanceof CanceledError) return;
      console.error("Error updating podcast:", err);
    }
  };

  return (
    <html id="ee">
      <div className="eventtik">
        <form className="event-formtik">
          <h3 className="infotik">ویرایش اپیزود</h3>

          <div className="ticket-formtik">
            <label className="Labeladd" htmlFor="name">عنوان اپیزود</label>
            <input
              type="text"
              id="name"
              value={newedit.name}
              onChange={(e) => handleTicketChange("name", e.target.value)}
              className="addinput-field"
              required
            />

                <label className="Labeladd" htmlFor="audio">محل بارگزاری صوت</label>
                <div className="L1">
                <input
                    type="file"
                    id="audio"
                    accept="audio/*" // Accept audio files
                    onChange={handleFileChange} // Handle the file change
                />
                {/* Display the existing audio if it's a string (URL) */}
                {typeof newedit.audio === "string" && newedit.audio && (
                    <div>
                    <audio controls style={{ width: "100%" }}>
                        <source src={newedit.audio} type="audio/mpeg" />
                        مرورگر شما از پخش فایل صوتی پشتیبانی نمی‌کند.
                    </audio>
                    <p>فایل صوتی فعلی</p>
                    </div>
                )}
                </div>


            <div className="buttonadd-container">
              <button type="button" onClick={onSubmit} className="submittik">
                ثبت
              </button>
            </div>
          </div>
        </form>
      </div>
    </html>
  );
};

export default EditEpisode;

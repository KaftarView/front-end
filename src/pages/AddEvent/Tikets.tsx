import React, { useState } from "react";
import "./Tickets.css";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../utils/apiClient";
import axios from "axios";

interface Ticket {
  name: string;
  description: string;
  price: number;
  sold: number;
  quantity: number;
  isAvailable: boolean;
  availableFrom: string;
  availableUntil: string;
}

const Tikets = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [newTicket, setNewTicket] = useState<Ticket>({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    sold: 0,
    isAvailable: true,
    availableFrom: "",
    availableUntil: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Ticket, string>>>(
    {}
  );

  const navigate = useNavigate();

  const handleTicketChange = (field: keyof Ticket, value: string | number) => {
    setNewTicket({ ...newTicket, [field]: value });
    setErrors({ ...errors, [field]: "" }); 
  };

  const validateFields = (): boolean => {
    const newErrors: Partial<Record<keyof Ticket, string>> = {};

    if (!newTicket.name.trim()) newErrors.name = "نام الزامی است";

    if (newTicket.price <= 0) newErrors.price = "قیمت باید بزرگتر از 0 باشد";
    if (newTicket.quantity <= 0)
      newErrors.quantity = "تعداد باید بزرگتر از 0 باشد";
    if (!newTicket.availableFrom.trim())
      newErrors.availableFrom ="تاریخ شروع الزامی است";
    if (!newTicket.availableUntil.trim())
      newErrors.availableUntil = "تاریخ پایان الزامی است";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const onSubmit = async () => {
    if (!validateFields()) return;

    const updatedTicket = {
      ...newTicket,
      availableFrom: newTicket.availableFrom + ":00Z",
      availableUntil: newTicket.availableUntil + ":00Z",
    };

    try {
      const res = await apiClient.post(
        `/v1/admin/events/add-ticket/${eventId}`,
        updatedTicket,
        { withCredentials: true }
      );
      console.log("Ticket created successfully:", res.data);
      alert("بلیت با موفقیت اضافه شد");
      setTickets([...tickets, newTicket]);
      setNewTicket({
        name: "",
        description: "",
        price: 0,
        quantity: 0,
        sold: 0,
        isAvailable: true,
        availableFrom: "",
        availableUntil: "",
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
    navigate(`/Discount/${eventId}`);
  };

  return (
    <html id="tickete">
    <div className="eventtik">
      <form className="event-formtik" encType="multipart/form-data">
        <h3 className="infotik">مشخصات بلیت</h3>

        <label className="Labeltik" htmlFor="name">
          عنوان بلیت
        </label>
        <input
          type="text"
          id="name"
          value={newTicket.name}
          onChange={(e) => handleTicketChange("name", e.target.value)}
          className={`addinput-fieldtik ${errors.name ? "error-fieldtik" : ""}`}
        />
        {errors.name && <span className="error-messagetik">{errors.name}</span>}

        <label className="Labeltik" htmlFor="description">
          توضیحات
        </label>
        <textarea
          id="description"
          value={newTicket.description}
          onChange={(e) => handleTicketChange("description", e.target.value)}
          className="addinput-fieldtik textarea-fieldtik" 
        />
        {errors.description && (
          <span className="error-messagetik">{errors.description}</span>
        )}

        <label className="Labeltik" htmlFor="price">
          قیمت
        </label>
        <input
          type="number"
          id="price"
          value={newTicket.price}
          onChange={(e) =>
            handleTicketChange("price", parseFloat(e.target.value))
          }
          className={`addinput-fieldtik ${errors.price ? "error-fieldtik" : ""}`}
        />
        {errors.price && <span className="error-messagetik">{errors.price}</span>}

        <label className="Labeltik" htmlFor="quantity">
          تعداد
        </label>
        <input
          type="number"
          id="quantity"
          value={newTicket.quantity}
          onChange={(e) =>
            handleTicketChange("quantity", parseInt(e.target.value, 10))
          }
          className={`addinput-fieldtik ${errors.quantity ? "error-fieldtik" : ""}`}
        />
        {errors.quantity && (
          <span className="error-messagetik">{errors.quantity}</span>
        )}

        <label className="Labeltik" htmlFor="availableFrom">
          تاریخ شروع فروش
        </label>
        <input
          type="datetime-local"
          id="availableFrom"
          value={newTicket.availableFrom}
          onChange={(e) => handleTicketChange("availableFrom", e.target.value)}
          className={`addinput-fieldtik ${
            errors.availableFrom ? "error-fieldtik" : ""
          }`}
        />
        {errors.availableFrom && (
          <span className="error-messagetik">{errors.availableFrom}</span>
        )}

        <label className="Labeltik" htmlFor="availableUntil">
          تاریخ پایان فروش
        </label>
        <input
          type="datetime-local"
          id="availableUntil"
          value={newTicket.availableUntil}
          onChange={(e) => handleTicketChange("availableUntil", e.target.value)}
          className={`addinput-fieldtik ${
            errors.availableUntil ? "error-fieldtik" : ""
          }`}
        />
        {errors.availableUntil && (
          <span className="error-messagetik">{errors.availableUntil}</span>
        )}

        <div className="buttonadd-containerdis">
          <button type="button" onClick={onSubmit} className="submitdis">
            ثبت 
          </button>
          <button
            type="button"
            onClick={handleNextPage}
            className="next-page-btndis"
          >
            صفحه بعد
          </button>
        </div>
      </form>
    </div>
    </html>
  );
};

export default Tikets;

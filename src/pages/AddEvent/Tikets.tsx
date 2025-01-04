import React, { useState } from "react";
import "./Tikets.css";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../utils/apiClient";

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
    setErrors({ ...errors, [field]: "" }); // Clear error for this field
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
    return Object.keys(newErrors).length === 0; // Return true if no errors
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
      console.error("Error creating ticket:", err);
    }
  };

  const handleNextPage = () => {
    navigate(`/Discount/${eventId}`);
  };

  return (
    <html id="e">
    <div className="eventtik">
      <form className="event-formtik" encType="multipart/form-data">
        <h3 className="infotik">مشخصات بلیت</h3>

        <label className="Labeladd" htmlFor="name">
          عنوان بلیت
        </label>
        <input
          type="text"
          id="name"
          value={newTicket.name}
          onChange={(e) => handleTicketChange("name", e.target.value)}
          className={`addinput-field ${errors.name ? "error-field" : ""}`}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}

        <label className="Labeladd" htmlFor="description">
          توضیحات
        </label>
        <textarea
          id="description"
          value={newTicket.description}
          onChange={(e) => handleTicketChange("description", e.target.value)}
          className="addinput-field textarea-field" 
        />
        {errors.description && (
          <span className="error-message">{errors.description}</span>
        )}

        <label className="Labeladd" htmlFor="price">
          قیمت
        </label>
        <input
          type="number"
          id="price"
          value={newTicket.price}
          onChange={(e) =>
            handleTicketChange("price", parseFloat(e.target.value))
          }
          className={`addinput-field ${errors.price ? "error-field" : ""}`}
        />
        {errors.price && <span className="error-message">{errors.price}</span>}

        <label className="Labeladd" htmlFor="quantity">
          تعداد
        </label>
        <input
          type="number"
          id="quantity"
          value={newTicket.quantity}
          onChange={(e) =>
            handleTicketChange("quantity", parseInt(e.target.value, 10))
          }
          className={`addinput-field ${errors.quantity ? "error-field" : ""}`}
        />
        {errors.quantity && (
          <span className="error-message">{errors.quantity}</span>
        )}

        <label className="Labeladd" htmlFor="availableFrom">
          تاریخ شروع فروش
        </label>
        <input
          type="datetime-local"
          id="availableFrom"
          value={newTicket.availableFrom}
          onChange={(e) => handleTicketChange("availableFrom", e.target.value)}
          className={`addinput-field ${
            errors.availableFrom ? "error-field" : ""
          }`}
        />
        {errors.availableFrom && (
          <span className="error-message">{errors.availableFrom}</span>
        )}

        <label className="Labeladd" htmlFor="availableUntil">
          تاریخ پایان فروش
        </label>
        <input
          type="datetime-local"
          id="availableUntil"
          value={newTicket.availableUntil}
          onChange={(e) => handleTicketChange("availableUntil", e.target.value)}
          className={`addinput-field ${
            errors.availableUntil ? "error-field" : ""
          }`}
        />
        {errors.availableUntil && (
          <span className="error-message">{errors.availableUntil}</span>
        )}

        <div className="buttonadd-container">
          <button type="button" onClick={onSubmit} className="submittik">
            ثبت بلیت
          </button>
          <button
            type="button"
            onClick={handleNextPage}
            className="next-page-btntik"
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

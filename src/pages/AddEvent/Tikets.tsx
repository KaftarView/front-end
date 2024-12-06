import React, { useState } from "react";
import "./Tikets.css";
import { useParams } from "react-router-dom";
import axios, { CanceledError } from "axios";
import { useNavigate } from "react-router-dom";
import apiClient from  "../../utils/apiClient";



interface Ticket {
  name: string;
  description: string;
  price: number;
  sold: number;
  quantity: number;
  isAvailable: boolean,
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

  const navigate = useNavigate();

  const handleTicketChange = (
    field: keyof Ticket,
    value: string | number
  ) => {
    setNewTicket({ ...newTicket, [field]: value });
  };

  const onSubmit = async () => {
    newTicket.availableFrom+=":00Z";
    newTicket.availableUntil+=":00Z";
    console.log(newTicket.name);
    console.log(newTicket.description);
    console.log(newTicket.price);
    console.log(newTicket.quantity);
    console.log(newTicket.sold);

    console.log(newTicket.isAvailable);
    console.log(newTicket.availableFrom);
    console.log(newTicket.availableUntil);
    console.log(eventId);




    try {
      const res = await apiClient.post(
        `/v1/events/add-ticket/${eventId}`,
        newTicket,
        {
          withCredentials: true,
        }
      );
      console.log("Ticket created successfully:", res.data);

      // اضافه کردن بلیت جدید به لیست و بازنشانی فرم
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
      if (err instanceof CanceledError) return;
      console.error("Error creating ticket:", err);
    }
  };

  const handleNextPage = () => {
    navigate(`/Discount/${eventId}`);

  };

  return (
    <html id="ee">
    <div className="eventtik">
      <form className="event-formtik" encType="multipart/form-data" >
        <h3 className="infotik">مشخصات بلیت</h3>

        {/* <div className="ticket-formtik"> */}
          <label className="Labeladd" htmlFor="name">عنوان بلیت</label>
          <input
            type="text"
            id="name"
            value={newTicket.name}
            onChange={(e) => handleTicketChange("name", e.target.value)}
            className="addinput-field"
            required
          />

          <label className="Labeladd" htmlFor="description">توضیحات</label>
          <textarea
            id="description"
            value={newTicket.description}
            onChange={(e) => handleTicketChange("description", e.target.value)}
            className="addinput-field textarea-field"
            required
          />

          <label className="Labeladd" htmlFor="price">قیمت</label>
          <input
            type="number"
            id="price"
            value={newTicket.price}
            onChange={(e) =>
              handleTicketChange("price", parseFloat(e.target.value))
            }
            className="addinput-field"
            required
          />

          <label className="Labeladd" htmlFor="quantity">تعداد</label>
          <input
            type="number"
            id="quantity"
            value={newTicket.quantity}
            onChange={(e) =>
              handleTicketChange("quantity", parseInt(e.target.value, 10))
            }
            className="addinput-field"
            required
          />

          <label className="Labeladd" htmlFor="availableFrom">تاریخ شروع فروش</label>
          <input
            type="datetime-local"
            id="availableFrom"
            value={newTicket.availableFrom}
            onChange={(e) => handleTicketChange("availableFrom", e.target.value)}
            className="addinput-field"
            required
          />

          <label className="Labeladd" htmlFor="availableUntil">تاریخ پایان فروش</label>
          <input
            type="datetime-local"
            id="availableUntil"
            value={newTicket.availableUntil}
            onChange={(e) => handleTicketChange("availableUntil", e.target.value)}
            className="addinput-field"
            required
          />
    <div className="buttonadd-container">
          <button
            type="button"
            onClick={onSubmit}
            className="submittik"
          >
            ثبت بلیت
          </button>
        {/* </div> */}


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

import React, { useEffect, useState } from "react";
// import "./EditTicket.css";
import axios, { CanceledError } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./EditTicket.css";
// import apiClient from  "../../utils/apiClient";
import moment from "moment-jalaali";
import apiClient from "../../utils/apiClient";



interface EditTicket {
  name: string;
  description: string;
  price: number;
  quantity: number;
  is_available: boolean,
  availableFrom: string;
  availableUntil: string;
}

const EditTicket: React.FC = () => {
  const { Ticketid } = useParams<{ Ticketid: string }>(); // type the params with `Ticketid` being a string
  const [initialData, setInitialData] = useState<EditTicket | null>(null);
  const [tickets, setTickets] = useState<EditTicket[]>([]);
  const [newTicket, setNewTicket] = useState<EditTicket>({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    is_available: true,
    availableFrom: "",
    availableUntil: "",
  });

  const navigate = useNavigate();


useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await apiClient.get(
          `/v1/admin/events/ticket/2`,
          {
            headers: { "ngrok-skip-browser-warning": "69420" },
          }
        );
        const eventData = response.data.data;
        console.log(eventData); // Debugging
  
        // Normalize time format by removing seconds if present
        const trimTime = (time: string | null) => {
          if (!time) return ""; // Return empty string for null/undefined
          const timeParts = time.split(":");
          if (timeParts.length >= 2) {
            return timeParts.slice(0, 2).join(":"); // Keep only hours and minutes
          }
          return time; // Return as-is if splitting fails
        };
  
        eventData.available_from = trimTime(eventData.available_from);
        eventData.available_until = trimTime(eventData.available_until);
  
        console.log("Formatted available_from:", eventData.available_from);
        console.log("Formatted available_until:", eventData.available_until);


        console.log(eventData);
        setInitialData(eventData);
        setTickets(eventData);
        setNewTicket(eventData);
      } catch (error) {
        if (error instanceof CanceledError) return;
        console.error("Unable to fetch event data:", error);
      }
    };
  
    fetchEvent();
  }, [Ticketid]);
  
  const handleDateChange = (field: keyof EditTicket, jalaliDate: string) => {
    try {
      // Convert Jalali date to Gregorian
      const gregorianDate = moment(jalaliDate, "jYYYY/jMM/jDD").format(
        "YYYY-MM-DD"
      );

      // Ensure newDiscount[field] is a string before calling split
      const currentTime = String(newTicket[field])?.split("T")[1] || "00:00";

      // Combine date and time
      const combinedDateTime = `${gregorianDate}T${currentTime}`;

      // Update state
      setNewTicket({ ...newTicket, [field]: combinedDateTime });
    } catch (error) {
      console.error("Error converting date:", error);
    }
  };


  const handleTicketChange = (
    field: keyof EditTicket,
    value: string | number
  ) => {
    setNewTicket({ ...newTicket, [field]: value });
  };

  const onSubmit = async () => {
    console.log(newTicket.name);

    console.log(newTicket.description);  
    console.log(newTicket.is_available);  
    console.log(newTicket.price);
    console.log(newTicket.quantity);
    if (!newTicket.availableFrom.endsWith("Z")) {
      newTicket.availableFrom += ":00Z";
    }

    if (!newTicket.availableUntil.endsWith("Z")) {
      newTicket.availableUntil += ":00Z";
    }
    console.log(newTicket.availableFrom);
    console.log(newTicket.availableUntil);

    try {
      const res = await apiClient.put(
        `/v1/admin/events/ticket/2`,
        newTicket,
        {
          withCredentials: true,
        }
      );
      console.log("Ticket created successfully:", res.data);
      navigate("/editevent");
    } catch (err) {
      if (err instanceof CanceledError) return;
      console.error("Error creating ticket:", err);
    }
  };

  const handleNextPage = () => {
    navigate("/editevent");
  };

  return (
    <html id="ee">
      <div className="eventtik">
        <form className="event-formtik">
          <h3 className="infotik">ویرایش بلیت</h3>

          <div className="ticket-formtik">
            <label className="Labeladd" htmlFor="name">عنوان بلیت</label>
            <input
              type="text"
              id="name"
              defaultValue={initialData?.name}
              onChange={(e) => handleTicketChange("name", e.target.value)}
              className="addinput-field"
              required
            />

            <label className="Labeladd" htmlFor="description">توضیحات</label>
            <textarea

              id="description"
              defaultValue={initialData?.description}
              onChange={(e) => handleTicketChange("description", e.target.value)}
              className="addinput-field textarea-field"
              required
            />

            <label className="Labeladd" htmlFor="price">قیمت</label>
            <input
              type="number"
              id="price"
              defaultValue={initialData?.price}
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
              defaultValue={initialData?.quantity}
              onChange={(e) =>
                handleTicketChange("quantity", parseInt(e.target.value, 10))
              }
              className="addinput-field"
              required
            />

            {/* <label className="Labeladd" htmlFor="validFrom">تاریخ شروع فروش</label>
            <input
              type="datetime-local"
              id="validFrom"
              defaultValue={initialData?.available_from}
              onChange={(e) => handleTicketChange("available_from", e.target.value)}
              className="addinput-field"
              required
            />

            <label className="Labeladd" htmlFor="validUntil">تاریخ پایان فروش</label>
            <input
              type="datetime-local"
              id="validUntil"
              defaultValue={initialData?.available_until}
              onChange={(e) => handleTicketChange("available_until", e.target.value)}
              className="addinput-field"
              required */}
            {/* /> */}

            <label className="Labeldis" htmlFor="availableFrom">
            تاریخ شروع
          </label>

          {/* Display formatted Jalali date */}
          <div className="Labeldis">
            {new Date(newTicket.availableFrom).toLocaleDateString("fa-IR", {
                
              weekday: "long",
              day: "numeric",
              month: "long",
              // hour: "2-digit",
              // minute: "2-digit",
            })}
          </div>

          {/* Time Input */}
          {/* <input
            type="time"
            id="validFromTime"
            onChange={(e) => handleTimeChange("validFrom", e.target.value)}
            className="addinput-fielddis"
          /> */}

          {/* Jalali Date Input */}
          <input
            type="text"
            id="available_from"
            placeholder="مثال: 1403/01/01"
            onChange={(e) => handleDateChange("availableFrom", e.target.value)}
            className="addinput-fielddis"
          />

          <label className="Labeldis" htmlFor="availableUntil">
            تاریخ پایان
          </label>

          {/* Display formatted Jalali date */}
          <div className="Labeldis">
            {new Date(newTicket.availableUntil).toLocaleDateString("fa-IR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              // hour: "2-digit",
              // minute: "2-digit",
            })}
          </div>

          {/* Time Input */}
          {/* <input
            type="time"
            id="validUntilTime"
            onChange={(e) => handleTimeChange("validUntil", e.target.value)}
            className="addinput-fielddis"
          /> */}

          {/* Jalali Date Input */}
          <input
            type="text"
            id="validUntil"
            placeholder="مثال: 1403/01/01"
            onChange={(e) => handleDateChange("availableUntil", e.target.value)}
            className="addinput-fielddis"
          />

          <div className="buttonadd-container">
            <button type="button" onClick={onSubmit} className="submittik">
              ثبت بلیت
            </button>
            <button
            type="button"
            onClick={handleNextPage}
            className="next-page-btntik1"
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

export default EditTicket;

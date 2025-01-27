import React, { useEffect, useState } from "react";
import "./EditDiscount.css";
import axios, { CanceledError } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../../utils/apiClient";
// import apiClient from  "../../utils/apiClient";
import moment from "moment-jalaali";

interface EditDiscount {
  code: string;
  description: string;
  value: number;
  quantity: number;
  validFrom: string;
  validUntil: string;
  type: string;
  usedCount: number;
  minTickets: number;
}

const EditDiscount: React.FC = () => {
  const { discountId } = useParams<{ discountId: string }>();
  const [initialData, setInitialData] = useState<EditDiscount | null>();
  const [Discount, setDiscount] = useState<EditDiscount[]>([]);
  const [newDiscount, setnewDiscount] = useState<EditDiscount>({
    code: "",
    description: "",
    value: 0,
    quantity: 0,
    validFrom: "",
    validUntil: "",
    type: "Fixed",
    usedCount: 0,
    minTickets: 1,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await apiClient.get(
          `/v1/admin/events/discount/${discountId}`,
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

        eventData.validFrom = trimTime(eventData.validFrom);
        eventData.validUntil = trimTime(eventData.validUntil);

        console.log("Formatted validFrom:", eventData.validFrom);
        console.log("Formatted validUntil:", eventData.validUntil);

        console.log(eventData);
        setInitialData(eventData);
        setDiscount(eventData);
        setnewDiscount(eventData);
      } catch (error) {
        if (error instanceof CanceledError) return;
        console.error("Unable to fetch event data:", error);
      }
    };

    fetchEvent();
  }, [discountId]);

  const handleEditDiscountChange = (
    field: keyof EditDiscount,
    value: string | number
  ) => {
    setnewDiscount({ ...newDiscount, [field]: value });
  };


  const handleDateChange = (field: keyof EditDiscount, jalaliDate: string) => {
    try {
      // Convert Jalali date to Gregorian
      const gregorianDate = moment(jalaliDate, "jYYYY/jMM/jDD").format(
        "YYYY-MM-DD"
      );

      // Ensure newDiscount[field] is a string before calling split
      const currentTime = String(newDiscount[field])?.split("T")[1] || "00:00";

      // Combine date and time
      const combinedDateTime = `${gregorianDate}T${currentTime}`;

      // Update state
      setnewDiscount({ ...newDiscount, [field]: combinedDateTime });
    } catch (error) {
      console.error("Error converting date:", error);
    }
  };

  // const handleTimeChange = (field: keyof EditDiscount, time: string) => {
  //   try {
  //     // Ensure newDiscount[field] is a string before calling split
  //     const currentDate =
  //       String(newDiscount[field])?.split("T")[0] || "1970-01-01";

  //     // Format time to HH:mm:ss
  //     const formattedTime = moment(time, "HH:mm").format("HH:mm");

  //     // Combine date and time
  //     const combinedDateTime = `${currentDate}T${formattedTime}`;

  //     // Update state
  //     setnewDiscount({ ...newDiscount, [field]: combinedDateTime });
  //   } catch (error) {
  //     console.error("Error converting time:", error);
  //   }
  // };

  const onSubmit = async () => {
    // newDiscount.validFrom += ":00Z";
    // newDiscount.validUntil += ":00Z";
    if (!newDiscount.validFrom.endsWith("Z")) {
      newDiscount.validFrom += ":00Z";
    }

    if (!newDiscount.validUntil.endsWith("Z")) {
      newDiscount.validUntil += ":00Z";
    }
    console.log("changeeeeeeeeeee");
    console.log(newDiscount.validFrom);
    console.log(newDiscount.validUntil);

    console.log(newDiscount)

    try {
      const res = await apiClient.put(
        `/v1/admin/events/discount/${discountId}`,
        newDiscount,
        {
          withCredentials: true,
        }
      );
      console.log("Ticket created successfully:", res.data);
      //   navigate("/editevent");
    } catch (err) {
      if (err instanceof CanceledError) return;
      console.error("Error creating ticket:", err);
    }
  };

  const handleNextPage = () => {
    navigate("/addevent");
  };

  return (
    <html id="discounte">
      <div className="eventdis">
        <form className="event-formdis" encType="multipart/form-data">
          <h3 className="infodis">ویرایش کدهای تخفیف</h3>

          {/* فرم تخفیف جدید */}
          {/* <div className="EditDiscount-formdis"> */}
          <label className="Labeldis" htmlFor="code">
            کد
          </label>
          <input
            type="text"
            id="code"
            // value={newEditDiscount.code}
            defaultValue={initialData?.code}
            onChange={(e) => handleEditDiscountChange("code", e.target.value)}
            className="addinput-fielddis"
          />

          <label className="Labeldis" htmlFor="type">
            نوع تخفیف
          </label>
          <select
            id="type"
            className="custom-dropdownedis"
            // value={newEditDiscount.type}
            defaultValue={initialData?.type}
            onChange={(e) => handleEditDiscountChange("type", e.target.value)}
          >
            <option value="Percentage">درصدی</option>
            <option value="Fixed">ثابت</option>
          </select>

          <label className="Labeldis" htmlFor="value">
            مقدار
          </label>
          <input
            type="text"
            id="value"
            // value={newEditDiscount.value}

            defaultValue={initialData?.value}
            onChange={(e) =>
              handleEditDiscountChange("value", parseInt(e.target.value, 10))
            }
            className="addinput-fielddis"
          />

          <label className="Labeldis" htmlFor="quantity">
            تعداد
          </label>
          <input
            type="number"
            id="quantity"
            // value={newEditDiscount.quantity}
            defaultValue={initialData?.quantity}
            onChange={(e) =>
              handleEditDiscountChange("quantity", parseInt(e.target.value, 10))
            }
            className="addinput-fielddis"
          />
      
          <label className="Labeldis" htmlFor="validFrom">
            تاریخ شروع
          </label>

          {/* Display formatted Jalali date */}
          <div className="Labeldis">
            {new Date(newDiscount.validFrom).toLocaleDateString("fa-IR", {
                
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
            id="validFrom"
            placeholder="مثال: 1403/01/01"
            onChange={(e) => handleDateChange("validFrom", e.target.value)}
            className="addinput-fielddis"
          />

          <label className="Labeldis" htmlFor="validFrom">
            تاریخ پایان
          </label>

          {/* Display formatted Jalali date */}
          <div className="Labeldis">
            {new Date(newDiscount.validUntil).toLocaleDateString("fa-IR", {
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
            onChange={(e) => handleDateChange("validUntil", e.target.value)}
            className="addinput-fielddis"
          />


          <div className="buttonadd-containerdis">
            <button type="button" onClick={onSubmit} className="submitdis">
              ثبت کد تخفیف
            </button>
            <button
              type="button"
              onClick={handleNextPage}
              className="next-page-btndis"
            >
              صفحه قبل
            </button>
          </div>

        
        </form>
      </div>
    </html>
    
  );
};

export default EditDiscount;

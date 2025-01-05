import React, { useState } from "react";
import "./Discount.css";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../../utils/apiClient";
import axios from "axios";

interface Discount {
  code: string;
  type: string;
  value: number;
  validFrom: string;
  validUntil: string;
  quantity: number;
  usedCount: number;
  minTickets: number;
}

const Discount = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [newDiscount, setNewDiscount] = useState<Discount>({
    code: "",
    type: "Percentage",
    value: 0,
    validFrom: "",
    validUntil: "",
    quantity: 0,
    usedCount: 0,
    minTickets: 1,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Discount, string>>>(
    {}
  );

  const navigate = useNavigate();

  const handleDiscountChange = (field: keyof Discount, value: string | number) => {
    setNewDiscount({ ...newDiscount, [field]: value });
    setErrors({ ...errors, [field]: "" }); 
  };

  const validateFields = (): boolean => {
    const newErrors: Partial<Record<keyof Discount, string>> = {};

    if (!newDiscount.code.trim()) newErrors.code = "کد الزامی است";
    if (!newDiscount.type) newErrors.type = "نوع الزامی است";
    if (newDiscount.value <= 0) newErrors.value = "مقدار باید بزرگتر از 0 باشد";
    if (!newDiscount.validFrom.trim()) newErrors.validFrom = "تاریخ شروع الزامی است";
    if (!newDiscount.validUntil.trim()) newErrors.validUntil = "تاریخ پایان الزامی است";
    if (newDiscount.quantity <= 0) newErrors.quantity = "تعداد باید بزرگتر از 0 باشد";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const onSubmit = async () => {
    if (!validateFields()) return;

    const updatedDiscount = {
      ...newDiscount,
      validFrom: newDiscount.validFrom + ":00Z",
      validUntil: newDiscount.validUntil + ":00Z",
    };

    try {
      const res = await apiClient.post(
        `/v1/admin/events/add-discount/${eventId}`,
        updatedDiscount,
        { withCredentials: true }
      );

      console.log("Discount created successfully:", res.data);
      alert("کدتخفیف با موفقیت اضافه شد");

      setDiscounts([...discounts, newDiscount]);
      setNewDiscount({
        code: "",
        type: "Percentage",
        value: 0,
        validFrom: "",
        validUntil: "",
        quantity: 0,
        usedCount: 0,
        minTickets: 1,
      });
    }catch (err) {
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
    navigate(`/Organizer/${eventId}`);
  };

  return (
    <html id="discounte">
    <div className="eventdis">
      <form className="event-formdis" encType="multipart/form-data">
        <h3 className="infodis">مشخصات کدهای تخفیف</h3>

        <label className="Labeldis" htmlFor="code">
          کد
        </label>
        <input
          type="text"
          id="code"
          value={newDiscount.code}
          onChange={(e) => handleDiscountChange("code", e.target.value)}
          className={`addinput-fielddis ${errors.code ? "error-field" : ""}`}
        />
        {errors.code && <span className="error-messagedis">{errors.code}</span>}

        <label className="Labeldis" htmlFor="type">
          نوع تخفیف
        </label>
        <select
          id="type"
          value={newDiscount.type}
          onChange={(e) => handleDiscountChange("type", e.target.value)}
          className={`custom-dropdownedis ${errors.type ? "error-field" : ""}`}
        >
          <option value="Percentage">درصدی</option>
          <option value="Fixed">ثابت</option>
        </select>
        {errors.type && <span className="error-messagedis">{errors.type}</span>}

        <label className="Labeldis" htmlFor="value">
          مقدار
        </label>
        <input
          type="number"
          id="value"
          value={newDiscount.value}
          onChange={(e) =>
            handleDiscountChange("value", parseInt(e.target.value, 10))
          }
          className={`addinput-fielddis ${errors.value ? "error-field" : ""}`}
        />
        {errors.value && <span className="error-messagedis">{errors.value}</span>}

        <label className="Labeldis" htmlFor="quantity">
          تعداد
        </label>
        <input
          type="number"
          id="quantity"
          value={newDiscount.quantity}
          onChange={(e) =>
            handleDiscountChange("quantity", parseInt(e.target.value, 10))
          }
          className={`addinput-fielddis ${errors.quantity ? "error-field" : ""}`}
        />
        {errors.quantity && (
          <span className="error-messagedis">{errors.quantity}</span>
        )}

        <label className="Labeldis" htmlFor="validFrom">
          تاریخ شروع
        </label>
        <input
          type="datetime-local"
          id="validFrom"
          value={newDiscount.validFrom}
          onChange={(e) => handleDiscountChange("validFrom", e.target.value)}
          className={`addinput-fielddis ${errors.validFrom ? "error-field" : ""}`}
        />
        {errors.validFrom && (
          <span className="error-messagedis">{errors.validFrom}</span>
        )}

        <label className="Labeldis" htmlFor="validUntil">
          تاریخ پایان
        </label>
        <input
          type="datetime-local"
          id="validUntil"
          value={newDiscount.validUntil}
          onChange={(e) => handleDiscountChange("validUntil", e.target.value)}
          className={`addinput-fielddis ${errors.validUntil ? "error-field" : ""}`}
        />
        {errors.validUntil && (
          <span className="error-messagedis">{errors.validUntil}</span>
        )}

        <div className="buttonadd-containerdis">
          <button type="button" onClick={onSubmit} className="submitdis">
            ثبت 
          </button>
          <button type="button" onClick={handleNextPage} className="next-page-btndis">
            صفحه بعد
          </button>
        </div>
      </form>
    </div>
    </html>
  );
};

export default Discount;

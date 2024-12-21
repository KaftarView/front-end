import React, { useState } from "react";
import "./Discount.css";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../../utils/apiClient";

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
    setErrors({ ...errors, [field]: "" }); // Clear error for this field
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
    return Object.keys(newErrors).length === 0; // Return true if no errors
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
        `/v1/events/add-discount/${eventId}`,
        updatedDiscount,
        { withCredentials: true }
      );

      console.log("Discount created successfully:", res.data);

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
    } catch (err) {
      console.error("Error creating discount:", err);
    }
  };

  const handleNextPage = () => {
    navigate(`/Organizer/${eventId}`);
  };

  return (
    <html id="e">
    <div className="eventdis">
      <form className="event-formdis" encType="multipart/form-data">
        <h3 className="infodis">مشخصات کدهای تخفیف</h3>

        <label className="Labeladd" htmlFor="code">
          کد
        </label>
        <input
          type="text"
          id="code"
          value={newDiscount.code}
          onChange={(e) => handleDiscountChange("code", e.target.value)}
          className={`addinput-field ${errors.code ? "error-field" : ""}`}
        />
        {errors.code && <span className="error-message">{errors.code}</span>}

        <label className="Labeladd" htmlFor="type">
          نوع تخفیف
        </label>
        <select
          id="type"
          value={newDiscount.type}
          onChange={(e) => handleDiscountChange("type", e.target.value)}
          className={`custom-dropdowne ${errors.type ? "error-field" : ""}`}
        >
          <option value="Percentage">درصدی</option>
          <option value="Fixed">ثابت</option>
        </select>
        {errors.type && <span className="error-message">{errors.type}</span>}

        <label className="Labeladd" htmlFor="value">
          مقدار
        </label>
        <input
          type="number"
          id="value"
          value={newDiscount.value}
          onChange={(e) =>
            handleDiscountChange("value", parseInt(e.target.value, 10))
          }
          className={`addinput-field ${errors.value ? "error-field" : ""}`}
        />
        {errors.value && <span className="error-message">{errors.value}</span>}

        <label className="Labeladd" htmlFor="quantity">
          تعداد
        </label>
        <input
          type="number"
          id="quantity"
          value={newDiscount.quantity}
          onChange={(e) =>
            handleDiscountChange("quantity", parseInt(e.target.value, 10))
          }
          className={`addinput-field ${errors.quantity ? "error-field" : ""}`}
        />
        {errors.quantity && (
          <span className="error-message">{errors.quantity}</span>
        )}

        <label className="Labeladd" htmlFor="validFrom">
          تاریخ شروع
        </label>
        <input
          type="datetime-local"
          id="validFrom"
          value={newDiscount.validFrom}
          onChange={(e) => handleDiscountChange("validFrom", e.target.value)}
          className={`addinput-field ${errors.validFrom ? "error-field" : ""}`}
        />
        {errors.validFrom && (
          <span className="error-message">{errors.validFrom}</span>
        )}

        <label className="Labeladd" htmlFor="validUntil">
          تاریخ پایان
        </label>
        <input
          type="datetime-local"
          id="validUntil"
          value={newDiscount.validUntil}
          onChange={(e) => handleDiscountChange("validUntil", e.target.value)}
          className={`addinput-field ${errors.validUntil ? "error-field" : ""}`}
        />
        {errors.validUntil && (
          <span className="error-message">{errors.validUntil}</span>
        )}

        <div className="buttonadd-container">
          <button type="button" onClick={onSubmit} className="submittik">
            ثبت کد تخفیف
          </button>
          <button type="button" onClick={handleNextPage} className="next-page-btntik">
            صفحه بعد
          </button>
        </div>
      </form>
    </div>
    </html>
  );
};

export default Discount;

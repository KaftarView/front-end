


import React, { useState } from "react";
import "./Discount.css";
import axios, { CanceledError } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from  "../../utils/apiClient";

interface Discount {
  code: string;
  type: string;
  value: number;
  validFrom: string;
  validUntil: string;
  quantity: number;

  usedCount:number;
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
    usedCount:0,
    minTickets: 1,

  });

  const navigate = useNavigate();

  const handleDiscountChange = (
    field: keyof Discount,
    value: string | number
  ) => {
    setNewDiscount({ ...newDiscount, [field]: value });
  };

  const onSubmit = async () => {
    newDiscount.validFrom+=":00Z";
    newDiscount.validUntil+=":00Z";
    console.log(newDiscount.code);
    console.log(newDiscount.type);
    console.log(newDiscount.value);
    console.log(newDiscount.validFrom);
    console.log(newDiscount.validUntil);
    console.log(newDiscount.quantity);
    console.log(newDiscount.usedCount);
    console.log(newDiscount.minTickets);
    console.log(eventId);
    try {
      const res = await apiClient.post(
        `/v1/events/add-discount/${eventId}`,
        newDiscount,
        {
          withCredentials: true,
        }
      );
 // دریافت آی‌دی تخفیف از پاسخ سرور
      console.log("Discount created successfully with ID:", eventId);

    //   // اضافه کردن تخفیف جدید به لیست و بازنشانی فرم
      setDiscounts([...discounts,  newDiscount]);
      setNewDiscount({
        code: "",
        type: "Percentage",
        value: 0,
        validFrom: "",
        validUntil: "",
        quantity: 0,
        usedCount:0,
        minTickets: 1,
      });


    } catch (err) {
      if (err instanceof CanceledError) return;
      console.error("Error creating discount:", err);
    }
  };

  const handleNextPage = () => {
    navigate("/events");
  };

  return (
    <html id="e">
    <div className="eventdis">
      <form className="event-formdis" encType="multipart/form-data">
        <h3 className="infodis">مشخصات کدهای تخفیف</h3>

        {/* فرم تخفیف جدید */}
        {/* <div className="Discount-formdis"> */}
          <label className="Labeladd" htmlFor="code">کد</label>
          <input
            type="text"
            id="code"
            value={newDiscount.code}
            onChange={(e) => handleDiscountChange("code", e.target.value)}
            className="addinput-field"
          />

          <label className="Labeladd" htmlFor="type">نوع تخفیف</label>
          <select
            id="type"
            
            value={newDiscount.type}
            onChange={(e) =>
              handleDiscountChange("type", e.target.value)
            }
            className="custom-dropdowne"
          >
            <option value="Percentage">درصدی</option>
            <option value="Fixed">ثابت</option>
          </select>

          <label className="Labeladd" htmlFor="value">مقدار</label>
          <input
            type="number"
            id="value"
            value={newDiscount.value}
            onChange={(e) => handleDiscountChange("value", parseInt(e.target.value,10))}
            className="addinput-field"
          />

          <label className="Labeladd" htmlFor="quantity">تعداد</label>
          <input
            type="number"
            id="quantity"
            value={newDiscount.quantity}
            onChange={(e) =>
              handleDiscountChange("quantity", parseInt(e.target.value, 10))
            }
            className="addinput-field"
          />

          <label className="Labeladd" htmlFor="validFrom">تاریخ شروع</label>
          <input
            type="datetime-local"
            id="validFrom"
            value={newDiscount.validFrom}
            onChange={(e) => handleDiscountChange("validFrom", e.target.value)}
            className="addinput-field"
          />

          <label className="Labeladd" htmlFor="validUntil">تاریخ پایان</label>
          <input
            type="datetime-local"
            id="validUntil"
            value={newDiscount.validUntil}
            onChange={(e) => handleDiscountChange("validUntil", e.target.value)}
            className="addinput-field"
          />
    <div className="buttonadd-container">
          <button
            type="button"
            onClick={onSubmit}
            className="submittik"
          >
            ثبت کد تخفیف
          </button>
        {/* </div> */}



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

export default Discount;



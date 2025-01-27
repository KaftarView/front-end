import React, { useEffect, useState } from "react";
import "./EditDiscount.css";
import axios, { CanceledError } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../../utils/apiClient";
// import apiClient from  "../../utils/apiClient";


interface EditDiscount {
  code: string;
  description: string;
  value: number;
  quantity: number;
  validFrom: string;
  validUntil: string;
  type: string;
  usedCount:number;
  minTickets:number;

}


const EditDiscount: React.FC = () => {
  const { discountId } = useParams<{ discountId: string }>(); 
  const [initialData, setInitialData] = useState<EditDiscount | null >();
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
    minTickets:1,
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

  const onSubmit = async () => {

    newDiscount.validFrom+=":00Z";
    newDiscount.validUntil+=":00Z";


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
          <label className="Labeldis" htmlFor="code">کد</label>
          <input
            type="text"
            id="code"
            // value={newEditDiscount.code}
            defaultValue={initialData?.code}
            onChange={(e) => handleEditDiscountChange("code", e.target.value)}
            className="addinput-fielddis"
          />

          <label className="Labeldis" htmlFor="type">نوع تخفیف</label>
          <select
            id="type"
            className="custom-dropdownedis"
            // value={newEditDiscount.type}
            defaultValue={initialData?.type}

            onChange={(e) =>
              handleEditDiscountChange("type", e.target.value)
            }

          >
            <option value="Percentage">درصدی</option>
            <option value="Fixed">ثابت</option>
          </select>

          <label className="Labeldis" htmlFor="value">مقدار</label>
          <input
            type="text"
            id="value"
            // value={newEditDiscount.value}
            
            defaultValue={initialData?.value}

            onChange={(e) => handleEditDiscountChange("value", parseInt(e.target.value,10))}
            className="addinput-fielddis"
          />

          <label className="Labeldis" htmlFor="quantity">تعداد</label>
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

          <label className="Labeldis"  htmlFor="validFrom">تاریخ شروع</label>
          <input
            type="datetime-local"
            id="validFrom"
            // value={newEditDiscount.validFrom}
            defaultValue={initialData?.validFrom}

            onChange={(e) => handleEditDiscountChange("validFrom", e.target.value)}
            className="addinput-fielddis"
          />

          <label className="Labeldis" htmlFor="validUntil">تاریخ پایان</label>
          <input
            type="datetime-local"
            id="validUntil"
            // value={newEditDiscount.validUntil}
            defaultValue={initialData?.validUntil}

            
            onChange={(e) => handleEditDiscountChange("validUntil", e.target.value)}
            className="addinput-fielddis"
          />

       
{/* 
        <label htmlFor="minTickets">تعداد</label>
          <input
            type="number"
            id="minTickets"
            // value={newEditDiscount.quantity}
            defaultValue={initialData?.usedCount}

            onChange={(e) =>
              handleEditDiscountChange("minTickets", parseInt(e.target.value, 10))
            }
            className="input-fielddis"
          /> */}

<div className="buttonadd-containerdis">
          <button
            type="button"
            onClick={onSubmit}
            className="submitdis"
          >
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

        {/* نمایش لیست تخفیف‌های ثبت شده */}
        {/* <h4 className="infodis">کدهای تخفیف ثبت شده</h4>
        <ul>
          {EditDiscounts.map((EditDiscount, index) => (
            <li key={index}>
              {EditDiscount.code} - {EditDiscount.description} ({EditDiscount.type})
            </li>
          ))}
        </ul> */}


        {/* </div> */}

      </form>
    </div>
    </html>
/* <html id="e">
    <div className="eventdis">
      <form className="event-formdis">
        <h3 className="infodis">مشخصات کدهای تخفیف</h3>

        // {/* فرم تخفیف جدید */
    //     <div className="Discount-formdis">
    //       <label htmlFor="code">کد</label>
    //       <input
    //         type="text"
    //         id="code"
    //         value={newDiscount.code}
    //         onChange={(e) => handleDiscountChange("code", e.target.value)}
    //         className="input-fielddis"
    //       />

    //       <label htmlFor="type">نوع تخفیف</label>
    //       <select
    //         id="type"
            
    //         value={newDiscount.type}
    //         onChange={(e) =>
    //           handleDiscountChange("type", e.target.value)
    //         }
    //         className="input-fielddis"
    //       >
    //         <option value="Percentage">درصدی</option>
    //         <option value="Fixed">ثابت</option>
    //       </select>

    //       <label htmlFor="value">مقدار</label>
    //       <input
    //         type="number"
    //         id="value"
    //         value={newDiscount.value}
    //         onChange={(e) => handleDiscountChange("value", parseInt(e.target.value,10))}
    //         className="input-fielddis"
    //       />

    //       <label htmlFor="quantity">تعداد</label>
    //       <input
    //         type="number"
    //         id="quantity"
    //         value={newDiscount.quantity}
    //         onChange={(e) =>
    //           handleDiscountChange("quantity", parseInt(e.target.value, 10))
    //         }
    //         className="input-fielddis"
    //       />

    //       <label htmlFor="validFrom">تاریخ شروع</label>
    //       <input
    //         type="datetime-local"
    //         id="validFrom"
    //         value={newDiscount.validFrom}
    //         onChange={(e) => handleDiscountChange("validFrom", e.target.value)}
    //         className="input-fielddis"
    //       />

    //       <label htmlFor="validUntil">تاریخ پایان</label>
    //       <input
    //         type="datetime-local"
    //         id="validUntil"
    //         value={newDiscount.validUntil}
    //         onChange={(e) => handleDiscountChange("validUntil", e.target.value)}
    //         className="input-fielddis"
    //       />

    //       <button
    //         type="button"
    //         onClick={onSubmit}
    //         className="submitdis"
    //       >
    //         ثبت کد تخفیف
    //       </button>
    //     </div>



    //     <button
    //       type="button"
    //       onClick={handleNextPage}
    //       className="next-page-btndis"
    //     >
    //       رفتن به صفحه بعدی
    //     </button>
    //   </form>
    // </div>
    // </html> */}
  );
};

export default EditDiscount;



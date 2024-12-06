import React, { useEffect, useState } from "react";
import axios, { CanceledError } from "axios";
import "./addevent.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import apiClient from  "../../utils/apiClient";

interface FormData {
  name: string;
  status: string;
  description: string;
  fromDate: string;
  toDate: string;
  minCapacity: number;
  maxCapacity: number;
  basePrice:number;
  venueType: string;
  location: string;
  banner: FileList; 
  category: string[];
}



const Addevent: React.FC = () => {
  const [eventType, setEventType] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [customCategory, setCustomCategory] = useState<string>("");
  const [isCustomCategory, setIsCustomCategory] = useState(false); 
  const [loadingCategories, setLoadingCategories] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
  });
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "other") {
      setIsCustomCategory(true);
    } else {
      setIsCustomCategory(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await apiClient.get("/v1/public/categories", {
          headers: {"ngrok-skip-browser-warning": "69420",
                'Content-Type': 'application/json' },
        });
        console.log(response.data.data); 
        setCategories(response.data.data); 
      } catch (error) {
        if (error instanceof CanceledError) return;
        console.error("Error fetching categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };
  
    fetchCategories();
  }, []);


  const handleEventTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEventType(e.target.value);
  };

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    const selectedCategories = isCustomCategory
    ? customCategory
    : data.category;
    console.log(data.banner[0]);
    console.log(data.category);
    console.log(selectedCategories.toString());
    console.log(data.description);
    console.log(data.fromDate+":00Z");
    console.log(data.location);
    console.log(data.maxCapacity);
    console.log(data.minCapacity);
    console.log(data.basePrice);
    console.log(data.name);
    console.log(data.status);
    console.log(data.toDate+":00Z");
    console.log(data.venueType);
    // Populate FormData
    formData.append("name", data.name);
    formData.append("status", data.status);
    formData.append("description", data.description);
    formData.append("fromDate", data.fromDate + ":00Z");
    formData.append("toDate", data.toDate + ":00Z");
    formData.append("minCapacity", data.minCapacity.toString());
    formData.append("maxCapacity", data.maxCapacity.toString());
    formData.append("venueType", data.venueType);
    formData.append("location", data.location);
    formData.append("basePrice", data.basePrice.toString());

    formData.append("category", selectedCategories.toString()); // Append categories
  
    if (data.banner && data.banner[0]) {
      formData.append("banner", data.banner[0]);
    }
  
    try {
      const response = await apiClient.post(
        "/v1/events/create",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response);
      // Assuming the response contains the event ID in integer format
      const eventId = response.data.data;
      console.log("Event created successfully. Event ID:", eventId);
  
      // Optionally, navigate to the event details page
      navigate(`/Tikets/${eventId}`);
    } catch (error) {
      if (error instanceof CanceledError) return;
      console.error("Error creating event:", error);
    }
  };
  
  return (
    <html id="eeee">
    <div className="eventadd">
      <form
        className="eventadd-form"
        encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="infoadd">مشخصات رویداد</h3>

        {/* نام رویداد */}
        <label className="Labeladd" htmlFor="name">نام رویداد</label>
        <input
          type="text"
          id="name"
          {...register("name", { required: "نام رویداد الزامی است" })}
          className="addinput-field"
        />
        {errors.name && <p className="erroradd">{errors.name.message}</p>}

        {/* وضعیت رویداد */}
        <label className="Labeladd" htmlFor="status">وضعیت رویداد</label>
        <select
          id="status"
          {...register("status", { required: "وضعیت رویداد الزامی است" })}
          className="custom-dropdowne"
        >
          <option value="">انتخاب کنید</option>
          <option value="published">درحال اجرا</option>
          <option value="completed">اجرا شده</option>
          <option value="draft">پیش نویس</option>
        </select>
        {errors.status && <p className="erroradd">{errors.status.message}</p>}

          <label className="Labeladd" htmlFor="category">موضوع رویداد</label>
                  <select
                    id="category"
                    {...register("category", { required: "موضوع رویداد الزامی است" })}
                    onChange={handleCategoryChange}
                    className="custom-dropdowne"
                  >
                    <option value="">انتخاب کنید</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
          <option value="other">سایر</option>
        </select>
        {errors.category && <p className="erroradd">{errors.category.message}</p>}
        {/* فیلد برای وارد کردن موضوع دلخواه */}
        {isCustomCategory && (
          <>
            <label className="Labeladd" htmlFor="category">موضوع دلخواه</label>
            <input
              type="text"
              id="category"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              className="addinput-field"
            />
          </>
        )}  
        {/* توضیحات */}
        <label className="Labeladd" htmlFor="description">توضیحات</label>
        <textarea
          id="description"
          {...register("description", { required: "توضیحات الزامی است" })}
          className="addinput-field textarea-field"
        />
        {errors.description && <p className="erroradd">{errors.description.message}</p>}

        {/* تاریخ و ساعت شروع */}
        <label className="Labeladd" htmlFor="fromDate">تاریخ و ساعت شروع</label>
        <input
          type="datetime-local"
          id="fromDate"
          {...register("fromDate", { required: "تاریخ شروع الزامی است" })}
          className="addinput-field"
        />
        {errors.fromDate && <p className="erroradd">{errors.fromDate.message}</p>}

        {/* تاریخ و ساعت پایان */}
        <label className="Labeladd" htmlFor="toDate">تاریخ و ساعت پایان</label>
        <input
          type="datetime-local"
          id="toDate"
          {...register("toDate", { required: "تاریخ پایان الزامی است" })}
          className="addinput-field"
        />
        {errors.toDate && <p className="erroradd">{errors.toDate.message}</p>}

        {/* حداقل ظرفیت */}
        <label className="Labeladd" htmlFor="minCapacity">حداقل ظرفیت</label>
        <input
          type="number"
          id="minCapacity"
          {...register("minCapacity", { required: "حداقل ظرفیت الزامی است" })}
          className="addinput-field"
        />
        {errors.minCapacity && <p className="erroradd">{errors.minCapacity.message}</p>}

        {/* حداکثر ظرفیت */}
        <label className="Labeladd" htmlFor="maxCapacity">حداکثر ظرفیت</label>
        <input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", { required: "حداکثر ظرفیت الزامی است" })}
          className="addinput-field"
        />
        {errors.maxCapacity && <p className="erroradd">{errors.maxCapacity.message}</p>}
        
        <label className="Labeladd" htmlFor="basePrice">حداقل قیمت</label>
        <input
          type="number"
          id="basePrice"
          {...register("basePrice", { required: "حداقل قیمت ظرفیت الزامی است" })}
          className="addinput-field"
        />
        {errors.basePrice && <p className="erroradd">{errors.basePrice.message}</p>}


        {/* نوع رویداد */}
        <label className="Labeladd" htmlFor="venueType">نوع رویداد</label>
        <select
          id="venueType"
          {...register("venueType", { required: "نوع رویداد الزامی است" })}
          value={eventType}
          onChange={handleEventTypeChange}
          className="custom-dropdowne"
        >
          <option value="">انتخاب کنید</option>
          <option value="online">آنلاین</option>
          <option value="physical">حضوری</option>
        </select>
        {errors.venueType && <p className="erroradd">{errors.venueType.message}</p>}


    {/* لینک یا آدرس */}
    {eventType === "online" && (
      <>
        <label className="Labeladd" htmlFor="location">لینک وبینار</label>
        <input
          type="text"
          id="location"
          {...register("location", { required: "لینک وبینار الزامی است" })}
          className="addinput-field"
        />
        {errors.location && <p className="erroradd">{errors.location.message}</p>}
      </>
    )}

    {eventType === "physical" && (
      <>
        <label className="Labeladd" htmlFor="location">آدرس محل برگزاری</label>
        <input
          type="text"
          id="location"
          {...register("location", { required: "آدرس الزامی است" })}
          className="addinput-field"
        />
        {errors.location && <p className="erroradd">{errors.location.message}</p>}
      </>
    )}
  <label className="Labeladd" htmlFor="banner">محل بارگزاری عکس</label>
    {/* بارگذاری بنر */}
    <div className="L1" >
      
      <input
        // className="addinput-field"
        type="file"
        id="banner"
        accept="image/*"
        {...register("banner", { required: "بارگذاری عکس الزامی است" })}
      />
      {errors.banner && <p className="erroradd">{errors.banner.message}</p>}
    </div>
    

    {/* دکمه‌ها */}
    <div className="buttonadd-container">
      <button
        type="submit"
        disabled={!isValid}
        className={`submitadd ${!isValid ? "submit-disabled" : ""}`}
      >
        ثبت
      </button>
      <button
        type="button"
        className="canceladd"
        onClick={() => navigate("/events")}
      >
        لغو
      </button>
    </div>
  </form>
</div>
</html>
); };


export default Addevent;
import React, { useEffect, useState } from "react";
import "./addevent.css";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../utils/apiClient";
import axios, { CanceledError } from "axios";

interface Event {
  name: string;
  status: string;
  description: string;
  fromDate: string;
  toDate: string;
  minCapacity: number;
  maxCapacity: number;
  basePrice: number;
  venueType: string;
  location: string;
  banner: File ;
  categories: string[] ;
}

const Event = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [Events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState<Event>({
    name: "",
    status: "draft",
    description: "",
    fromDate: "",
    toDate: "",
    minCapacity: 0,
    maxCapacity: 0,
    basePrice: 0,
    venueType: "",
    location: "",
    banner: {} as File, 
    categories: [],
  });
  const [eventType, setEventType] = useState<string>(""); 
  const [errors, setErrors] = useState<Partial<Record<keyof Event, string>>>( {});
  const [categories1, setCategories] = useState<string[]>([]);
  const [customCategories, setCustomCategories] = useState<string[]>([""]); 
  const [isCustomCategories, setIsCustomCategories] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const navigate = useNavigate();

  const handleEventChange = (field: keyof Event, value: string[] |string | number | File) => {
    setNewEvent({ ...newEvent, [field]: value });
    setErrors({ ...errors, [field]: "" });
    if (field=="categories" )
      {
        if(value=="other")
        {
          setIsCustomCategories(true);
        }
        else{
          setIsCustomCategories(false);

        }
      }
  };
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await apiClient.get("/v1/public/categories", {
          headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
          },
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
  const handleCategoriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    if (selectedCategory === "other") {
      setIsCustomCategories(true); 
    } else {
      setIsCustomCategories(false);
      setNewEvent((prevEvent) => ({
        ...prevEvent,
        categories: [selectedCategory], 
      }));
    }
  };

  const handleCustomCategoryChange = (index: number, value: string) => {
    const newCustomCategories = [...customCategories];
    newCustomCategories[index] = value;
    setCustomCategories(newCustomCategories);
  };
  const handleAddCategory = () => {
    setCustomCategories((prev) => [...prev, ""]); 
  };
  const validateFields = (): boolean => {
    const newErrors: Partial<Record<keyof Event, string>> = {};

    if (!newEvent.name.trim()) newErrors.name = "نام الزامی است";
    if (!newEvent.description.trim()) newErrors.description = "توضیحات الزامی است";


    if (newEvent.maxCapacity <= 0) newErrors.maxCapacity = "حداکثر ظرفیت باید بزرگتر از 0 باشد";
    if (newEvent.minCapacity <= 0) newErrors.minCapacity = "حداقل ظرفیت باید بزرگتر از 0 باشد";
    if (newEvent.basePrice <= 0)
      newErrors.basePrice = "قیمت باید بزرگتر از 0 باشد";
    if (!newEvent.fromDate.trim())
      newErrors.fromDate = "تاریخ شروع الزامی است";
    if (!newEvent.toDate.trim())
      newErrors.toDate = "تاریخ پایان الزامی است";
    if (!newEvent.location.trim()) newErrors.location = "ادرس یا لینک الزامی است";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };
  const handleVenueTypeChange = (value: string) => {
    setEventType(value);
    handleEventChange("venueType", value);
  };

  const onSubmit = async () => {
    if (!validateFields()) return;
  

    let finalCategories: string[] = [];
  
    if (isCustomCategories) {

      finalCategories = customCategories.filter((cat) => cat.trim() !== ""); // Remove empty entries
    } else {
    
      newEvent.categories.forEach((category) => {
        finalCategories = [...finalCategories, ...category.split(",").map((cat) => cat.trim())];
      });
    }
  
    console.log("Final Categories:", finalCategories);
  
    const formData = new FormData();
    formData.append("name", newEvent.name);
    formData.append("status", newEvent.status);
    formData.append("description", newEvent.description);
    formData.append("fromDate", `${newEvent.fromDate}:00Z`);
    formData.append("toDate", `${newEvent.toDate}:00Z`);
    formData.append("minCapacity", newEvent.minCapacity.toString());
    formData.append("maxCapacity", newEvent.maxCapacity.toString());
    formData.append("basePrice", newEvent.basePrice.toString());
    formData.append("venueType", newEvent.venueType);
    formData.append("location", newEvent.location);
  

    finalCategories.forEach((category) => {
      formData.append("categories", category);
    });
  
    if (newEvent.banner) formData.append("banner", newEvent.banner);
  
    console.log([...formData]);
  
    try {
      const res = await apiClient.post("/v1/admin/events/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      console.log(res);
    
      const eventId = res.data.data; 
      console.log("Event created successfully. Event ID:", eventId);
      alert("رویداد با موفقیت اضافه شد");
      navigate(`/Tickets/${eventId}`);
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
            alert( JSON.stringify(serverMessages));
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
  
  const resetForm = () => {
    setNewEvent({
      name: "",
      status: "draft",
      description: "",
      fromDate: "",
      toDate: "",
      minCapacity: 0,
      maxCapacity: 0,
      basePrice: 0,
      venueType: "",
      location: "",
      banner: {} as File,
      categories: [],
    });
    setEventType("");
    setCustomCategories([]);
  };
  const handleNextPage = () => {
    navigate(`/Discount/${eventId}`);
  };
  return (
    <html id="eventa">
    <div className="addevent">
      <form className="addevent-form" encType="multipart/form-data">
        <h3 className="infoevent">مشخصات رویداد</h3>

        <label className="Labeladdevent" htmlFor="name">
          عنوان رویداد
        </label>
        <input
          type="text"
          id="name"
          value={newEvent.name}
          onChange={(e) => handleEventChange("name", e.target.value)}
          className={`addinput-fieldevent ${errors.name ? "error-field" : ""}`}
        />
        {errors.name && <span className="error-messageevent">{errors.name}</span>}

        <label className="Labeladdevent" htmlFor="status">وضعیت رویداد</label>
        <select
          id="status"
          value={newEvent.status}
          onChange={(e) => handleEventChange("status", e.target.value)}
          className={`custom-dropdowneevent ${errors.status ? "error-field" : ""}`}
        >
          <option value="">انتخاب کنید</option>
          <option value="published">درحال اجرا</option>
          <option value="completed">اجرا شده</option>
          <option value="draft">پیش نویس</option>
        </select>
        {errors.status && <span className="error-messageevent">{errors.status}</span>}


        <label className="Labeladdevent" htmlFor="categories">موضوع رویداد</label>
        <select onChange={handleCategoriesChange} className="custom-dropdowneevent">
          <option>انتخاب کنید</option>
          {categories1.map((category) => (
            <option value={category}>{category}</option>
          ))}
          <option value="other">سایر</option>
        </select>

        {isCustomCategories && (
          <>
            <div>
              {customCategories.map((category, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => handleCustomCategoryChange(index, e.target.value)}
                    className="addinput-fieldevent"
                  />
                </div>
              ))}
                      <div className="buttonadd-containerevent">
              <button className="submitaddevent" type="button" onClick={handleAddCategory}>
                افزودن
              </button>
              </div>
            </div>
          </>
        )}
        
         <label className="Labeladdevent" htmlFor="description">توضیحات</label>
         <textarea
           id="description"
           onChange={(e) => handleEventChange("description", e.target.value)}
          className={`addinput-fieldevent textarea-fieldevent ${errors.description ? "error-field" : ""}`}

         />
         {errors.description && <span className="error-messageevent">{errors.description}</span>}


         <label className="Labeladdevent" htmlFor="fromDate">تاریخ و ساعت شروع</label>
         <input
           type="datetime-local"
           id="fromDate"
           onChange={(e) => handleEventChange("fromDate", e.target.value)}
          className={`addinput-fieldevent  ${errors.fromDate ? "error-field" : ""}`}
         />
         {errors.fromDate && <span className="error-messageevent">{errors.fromDate}</span>}

         <label className="Labeladdevent" htmlFor="toDate">تاریخ و ساعت پایان</label>
         <input
           type="datetime-local"
           id="toDate"
           onChange={(e) => handleEventChange("toDate", e.target.value)}
          className={`addinput-fieldevent  ${errors.toDate ? "error-field" : ""}`}
         />
         {errors.toDate && <span className="error-messageevent">{errors.toDate}</span>}


         <label className="Labeladdevent" htmlFor="minCapacity">حداقل ظرفیت</label>
         <input
           type="number"
           id="minCapacity"
           onChange={(e) => handleEventChange("minCapacity", e.target.value)}
          className={`addinput-fieldevent ${errors.minCapacity ? "error-field" : ""}`}
         />
         {errors.minCapacity && <span className="error-messageevent">{errors.minCapacity}</span>}

         <label className="Labeladdevent" htmlFor="maxCapacity">حداکثر ظرفیت</label>
         <input
           type="number"
           id="maxCapacity"
           onChange={(e) => handleEventChange("maxCapacity", e.target.value)}
          className={`addinput-fieldevent  ${errors.maxCapacity ? "error-field" : ""}`}
         />
         {errors.maxCapacity && <span className="error-messageevent">{errors.maxCapacity}</span>}

         <label className="Labeladdevent" htmlFor="basePrice">حداقل قیمت</label>
         <input
           type="number"
           id="basePrice"
           onChange={(e) => handleEventChange("basePrice", e.target.value)}
          className={`addinput-fieldevent  ${errors.basePrice ? "error-field" : ""}`}
         />
         {errors.basePrice && <span className="error-messageevent">{errors.basePrice}</span>}

         <label className="Labeladdevent" htmlFor="venueType">نوع رویداد</label>
         <select
          id="venueType"
          value={eventType}
          onChange={(e) => handleVenueTypeChange(e.target.value)}
          className={`custom-dropdowneevent ${errors.venueType ? "error-field" : ""}`}
        >
          <option value="">انتخاب کنید</option>
          <option value="online">آنلاین</option>
          <option value="physical">حضوری</option>
        </select>
        {errors.venueType && <span className="error-messageevent">{errors.venueType}</span>}

        {eventType === "online" && (
          <>
            <label className="Labeladdevent" htmlFor="location">لینک وبینار</label>
            <input
              type="text"
              id="location"
              value={newEvent.location}
              onChange={(e) => handleEventChange("location", e.target.value)}
              className={`addinput-fieldevent ${errors.location ? "error-field" : ""}`}
            />
            {errors.location && <span className="error-messageevent">{errors.location}</span>}
          </>
        )}
        {eventType === "physical" && (
          <>
            <label className="Labeladdevent" htmlFor="location">آدرس محل برگزاری</label>
            <input
              type="text"
              id="location"
              value={newEvent.location}
              onChange={(e) => handleEventChange("location", e.target.value)}
              className={`addinput-fieldevent ${errors.location ? "error-field" : ""}`}
            />
            {errors.location && <span className="error-messageevent">{errors.location}</span>}
          </>
        )}

<label className="Labeladdevent" htmlFor="banner">محل بارگزاری عکس</label>

    <div className="L1event" >
      
        <input
          type="file"
          id="banner"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]; 
            if (file) {
              handleEventChange("banner", file);
            }
          }}
          className={`a ${errors.banner ? "error-messageevent" : ""}`}
        />

</div>

        <div className="buttonadd-containerevent">
          <button type="button" onClick={onSubmit} className="submitaddevent">
            ثبت
          </button>
          <button
        type="button"
        className="cancelevent"
        onClick={() => navigate("/events")}
      >
        لغو
      </button>
        </div>
      </form>
    </div>
    </html>
  );
};

export default Event;

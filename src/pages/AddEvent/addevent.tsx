
// import React, { useEffect, useState } from "react";
// import "./Tikets.css";
// import { useParams, useNavigate } from "react-router-dom";
// import apiClient from "../../utils/apiClient";
// import { CanceledError } from "axios";

// interface Event {
//   name: string;
//   status: string;
//   description: string;
//   fromDate: string;
//   toDate: string;
//   minCapacity: number;
//   maxCapacity: number;
//   basePrice: number;
//   venueType: string;
//   location: string;
//   banner: File ;
//   categories: string[] ;
// }

// const Event = () => {
//   const { eventId } = useParams<{ eventId: string }>();
//   const [Events, setEvents] = useState<Event[]>([]);
//   const [newEvent, setNewEvent] = useState<Event>({
//     name: "",
//     status: "draft",
//     description: "",
//     fromDate: "",
//     toDate: "",
//     minCapacity: 0,
//     maxCapacity: 0,
//     basePrice: 0,
//     venueType: "",
//     location: "",
//     banner: {} as File, // Empty FileList object
//     categories: [],
//   });
//   const [eventType, setEventType] = useState<string>(""); // Added state for eventType
//   const [errors, setErrors] = useState<Partial<Record<keyof Event, string>>>(
//     {}
//   );
//   const [categories1, setCategories] = useState<string[]>([]);
//   const [customcategories, setCustomcategories] = useState<string>("");
//   const [isCustomcategories, setIsCustomcategories] = useState(false);
//   const [loadingCategories, setLoadingCategories] = useState(false);
//   const navigate = useNavigate();

//   const handlecategoriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedCategory = e.target.value;
  
//     if (selectedCategory === "other") {
//       setIsCustomcategories(true); // Show custom category input
//     } else {
//       setIsCustomcategories(false); // Hide custom category input
//       // Add the selected category to the newEvent.categories array
//       setNewEvent((prevEvent) => ({
//         ...prevEvent,
//         categories: [selectedCategory], // Set categories as the selected one
//       }));
//     }
//   };
//   const handleEventChange = (field: keyof Event, value: string[] |string | number | File) => {
//     setNewEvent({ ...newEvent, [field]: value });
//     setErrors({ ...errors, [field]: "" });
//     if (field=="categories" )
//       {
//         if(value=="other")
//         {
//           setIsCustomcategories(true);
//         }
//         else{
//           setIsCustomcategories(false);

//         }
//       } // Clear error for this field
//   };
//   useEffect(() => {
//     const fetchCategories = async () => {
//       setLoadingCategories(true);
//       try {
//         const response = await apiClient.get("/v1/public/categories", {
//           headers: {
//             "ngrok-skip-browser-warning": "69420",
//             "Content-Type": "application/json",
//           },
//         });
//         console.log(response.data.data);
//         setCategories(response.data.data);
//       } catch (error) {
//         if (error instanceof CanceledError) return;
//         console.error("Error fetching categories:", error);
//       } finally {
//         setLoadingCategories(false);
//       }
//     };

//     fetchCategories();
//   }, []);



//   const validateFields = (): boolean => {
//     const newErrors: Partial<Record<keyof Event, string>> = {};

//     if (!newEvent.name.trim()) newErrors.name = "نام الزامی است";
//     if (!newEvent.description.trim()) newErrors.description = "توضیحات الزامی است";


//     if (newEvent.maxCapacity <= 0) newErrors.maxCapacity = "حداکثر ظرفیت باید بزرگتر از 0 باشد";
//     if (newEvent.minCapacity <= 0) newErrors.minCapacity = "حداقل ظرفیت باید بزرگتر از 0 باشد";
//     if (newEvent.basePrice <= 0)
//       newErrors.basePrice = "قیمت باید بزرگتر از 0 باشد";
//     if (!newEvent.fromDate.trim())
//       newErrors.fromDate = "تاریخ شروع الزامی است";
//     if (!newEvent.toDate.trim())
//       newErrors.toDate = "تاریخ پایان الزامی است";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0; // Return true if no errors
//   };
//   const handleVenueTypeChange = (value: string) => {
//     setEventType(value);
//     handleEventChange("venueType", value);
//   };

//   const onSubmit = async () => {
//     if (!validateFields()) return;
//     // Set the selected categories based on whether it's a custom categories
//     const selectedCategories = isCustomcategories
//     ? [customcategories]  // If custom categories, wrap it in an array
//     : newEvent.categories;
//   console.log (newEvent.categories);
//     const formData = new FormData();
//     formData.append("name", newEvent.name);
//     formData.append("status", newEvent.status);
//     formData.append("description", newEvent.description);
//     formData.append("fromDate", `${newEvent.fromDate}:00Z`);
//     formData.append("toDate", `${newEvent.toDate}:00Z`);
//     formData.append("minCapacity", newEvent.minCapacity.toString());
//     formData.append("maxCapacity", newEvent.maxCapacity.toString());
//     formData.append("basePrice", newEvent.basePrice.toString());
//     formData.append("venueType", newEvent.venueType);
//     formData.append("location", newEvent.location);

//     formData.append("categories", selectedCategories.toString()); 
  
//     if (newEvent.banner) formData.append("banner", newEvent.banner);
//     console.log([...formData]);
//     // Append each categories separately if it's an array
//     console.log(selectedCategories)
//     try {
//       const res = await apiClient.post("/v1/events/create", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         withCredentials: true,
//       });
//       console.log(res);
//       const eventId = res.data.data;
//       console.log("Event created successfully. Event ID:", eventId);
  
//       // Optionally, navigate to the event details page
//       navigate(`/Tikets/${eventId}`);
//     } catch (err) {
//       console.error("Error creating Event:", err);
//     }
//   };
  
//   const resetForm = () => {
//     setNewEvent({
//       name: "",
//       status: "draft",
//       description: "",
//       fromDate: "",
//       toDate: "",
//       minCapacity: 0,
//       maxCapacity: 0,
//       basePrice: 0,
//       venueType: "",
//       location: "",
//       banner: {} as File,
//       categories: [],
//     });
//     setEventType("");
//     setCustomcategories("");
//   };
//   const handleNextPage = () => {
//     navigate(`/Discount/${eventId}`);
//   };
//   return (
//     <html id="e">
//     <div className="eventtik">
//       <form className="event-formtik" encType="multipart/form-data">
//         <h3 className="infotik">مشخصات رویداد</h3>

//         <label className="Labeladd" htmlFor="name">
//           عنوان رویداد
//         </label>
//         <input
//           type="text"
//           id="name"
//           value={newEvent.name}
//           onChange={(e) => handleEventChange("name", e.target.value)}
//           className={`addinput-field ${errors.name ? "error-field" : ""}`}
//         />
//         {errors.name && <span className="error-message">{errors.name}</span>}

//         <label className="Labeladd" htmlFor="status">وضعیت رویداد</label>
//         <select
//           id="status"
//           value={newEvent.status}
//           onChange={(e) => handleEventChange("status", e.target.value)}
//           className={`custom-dropdowne ${errors.status ? "error-field" : ""}`}
//         >
//           <option value="">انتخاب کنید</option>
//           <option value="published">درحال اجرا</option>
//           <option value="completed">اجرا شده</option>
//           <option value="draft">پیش نویس</option>
//         </select>
//         {errors.status && <span className="error-message">{errors.status}</span>}


//           <label className="Labeladd" htmlFor="categories">موضوع رویداد</label>
//         <select
//           onChange={(e) => handleEventChange("categories", e.target.value)}
//           className="custom-dropdowne"
//         >
//                     <option >انتخاب کنید</option>
//                     {categories1.map((categories) => (
//                       <option value={categories}>
//                         {categories}
//                       </option>
//                     ))}
//           <option value="other">سایر</option>
//         </select>
//         {errors.categories && <span className="error-message">{errors.categories}</span>}

//         {/* Custom categories Input */}
//         {isCustomcategories && (
//           <>
//             <label className="Labeladd" htmlFor="categories">موضوع دلخواه</label>
//             <input
//               type="text"
//               id="categories"
//               value={customcategories}
//               onChange={(e) => setCustomcategories(e.target.value)}
//               className={`addinput-field ${errors.categories ? "error-field" : ""}`}
//             />
//             {errors.categories && <span className="error-message">{errors.categories}</span>}
//           </>
//         )}
        
//          <label className="Labeladd" htmlFor="description">توضیحات</label>
//          <textarea
//            id="description"
//            onChange={(e) => handleEventChange("description", e.target.value)}
//           className={`addinput-field textarea-field ${errors.description ? "error-field" : ""}`}

//          />
//          {errors.description && <span className="error-message">{errors.description}</span>}

//          {/* تاریخ و ساعت شروع */}
//          <label className="Labeladd" htmlFor="fromDate">تاریخ و ساعت شروع</label>
//          <input
//            type="datetime-local"
//            id="fromDate"
//            onChange={(e) => handleEventChange("fromDate", e.target.value)}
//           className={`addinput-field  ${errors.fromDate ? "error-field" : ""}`}
//          />
//          {errors.fromDate && <span className="error-message">{errors.fromDate}</span>}
//          {/* تاریخ و ساعت پایان */}
//          <label className="Labeladd" htmlFor="toDate">تاریخ و ساعت پایان</label>
//          <input
//            type="datetime-local"
//            id="toDate"
//            onChange={(e) => handleEventChange("toDate", e.target.value)}
//           className={`addinput-field  ${errors.toDate ? "error-field" : ""}`}
//          />
//          {errors.toDate && <span className="error-message">{errors.toDate}</span>}

//          {/* حداقل ظرفیت */}
//          <label className="Labeladd" htmlFor="minCapacity">حداقل ظرفیت</label>
//          <input
//            type="number"
//            id="minCapacity"
//            onChange={(e) => handleEventChange("minCapacity", e.target.value)}
//           className={`addinput-field  ${errors.minCapacity ? "error-field" : ""}`}
//          />
//          {errors.minCapacity && <span className="error-message">{errors.minCapacity}</span>}
//          {/* حداکثر ظرفیت */}
//          <label className="Labeladd" htmlFor="maxCapacity">حداکثر ظرفیت</label>
//          <input
//            type="number"
//            id="maxCapacity"
//            onChange={(e) => handleEventChange("maxCapacity", e.target.value)}
//           className={`addinput-field  ${errors.maxCapacity ? "error-field" : ""}`}
//          />
//          {errors.maxCapacity && <span className="error-message">{errors.maxCapacity}</span>}

//          <label className="Labeladd" htmlFor="basePrice">حداقل قیمت</label>
//          <input
//            type="number"
//            id="basePrice"
//            onChange={(e) => handleEventChange("basePrice", e.target.value)}
//           className={`addinput-field  ${errors.basePrice ? "error-field" : ""}`}
//          />
//          {errors.basePrice && <span className="error-message">{errors.basePrice}</span>}

//          <label className="Labeladd" htmlFor="venueType">نوع رویداد</label>
//          <select
//           id="venueType"
//           value={eventType}
//           onChange={(e) => handleVenueTypeChange(e.target.value)}
//           className={`custom-dropdowne ${errors.venueType ? "error-field" : ""}`}
//         >
//           <option value="">انتخاب کنید</option>
//           <option value="online">آنلاین</option>
//           <option value="physical">حضوری</option>
//         </select>
//         {errors.venueType && <span className="error-message">{errors.venueType}</span>}
//         {/* Conditional fields */}
//         {eventType === "online" && (
//           <>
//             <label className="Labeladd" htmlFor="location">لینک وبینار</label>
//             <input
//               type="text"
//               id="location"
//               value={newEvent.location}
//               onChange={(e) => handleEventChange("location", e.target.value)}
//               className={`addinput-field ${errors.location ? "error-field" : ""}`}
//             />
//             {errors.location && <span className="error-message">{errors.location}</span>}
//           </>
//         )}
//         {eventType === "physical" && (
//           <>
//             <label className="Labeladd" htmlFor="location">آدرس محل برگزاری</label>
//             <input
//               type="text"
//               id="location"
//               value={newEvent.location}
//               onChange={(e) => handleEventChange("location", e.target.value)}
//               className={`addinput-field ${errors.location ? "error-field" : ""}`}
//             />
//             {errors.location && <span className="error-message">{errors.location}</span>}
//           </>
//         )}

// <label className="Labeladd" htmlFor="banner">محل بارگزاری عکس</label>
//     {/* بارگذاری بنر */}
//     <div className="L1" >
      
//         <input
//           type="file"
//           id="banner"
//           accept="image/*"
//           onChange={(e) => {
//             const file = e.target.files?.[0]; // Get the first selected file
//             if (file) {
//               handleEventChange("banner", file);
//             }
//           }}
//           className={`a ${errors.banner ? "error-field" : ""}`}
//         />

// </div>

//         <div className="buttonadd-container">
//           <button type="button" onClick={onSubmit} className="submittik">
//             ثبت بلیت
//           </button>
//           <button
//         type="button"
//         className="canceladd"
//         onClick={() => navigate("/events")}
//       >
//         لغو
//       </button>
//         </div>
//       </form>
//     </div>
//     </html>
//   );
// };

// export default Event;



import React, { useEffect, useState } from "react";
import "./Tikets.css";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../utils/apiClient";
import { CanceledError } from "axios";

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
    banner: {} as File, // Empty FileList object
    categories: [],
  });
  const [eventType, setEventType] = useState<string>(""); // Added state for eventType
  const [errors, setErrors] = useState<Partial<Record<keyof Event, string>>>( {});
  const [categories1, setCategories] = useState<string[]>([]);
  const [customCategories, setCustomCategories] = useState<string[]>([""]); // Array to hold custom category values
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
      } // Clear error for this field
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
      setIsCustomCategories(true); // Show custom category input
    } else {
      setIsCustomCategories(false); // Hide custom category input
      setNewEvent((prevEvent) => ({
        ...prevEvent,
        categories: [selectedCategory], // Set categories as the selected one
      }));
    }
  };

  const handleCustomCategoryChange = (index: number, value: string) => {
    const newCustomCategories = [...customCategories];
    newCustomCategories[index] = value;
    setCustomCategories(newCustomCategories);
  };
  const handleAddCategory = () => {
    setCustomCategories((prev) => [...prev, ""]); // Add a new empty field for a custom category
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };
  const handleVenueTypeChange = (value: string) => {
    setEventType(value);
    handleEventChange("venueType", value);
  };

  const onSubmit = async () => {
    if (!validateFields()) return;
  
    // Handle categories
    let finalCategories: string[] = [];
  
    if (isCustomCategories) {
      // If custom categories, use the custom categories array
      finalCategories = customCategories.filter((cat) => cat.trim() !== ""); // Remove empty entries
    } else {
      // If categories are selected from dropdown, split them by comma
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
  
    // Append each category separately
    finalCategories.forEach((category) => {
      formData.append("categories", category);
    });
  
    if (newEvent.banner) formData.append("banner", newEvent.banner);
  
    console.log([...formData]);
  
    try {
      const res = await apiClient.post("/v1/events/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      console.log(res);
      const eventId = res.data.data;
      console.log("Event created successfully. Event ID:", eventId);
  
      // Navigate to the event details page
      navigate(`/Tikets/${eventId}`);
    } catch (err) {
      console.error("Error creating Event:", err);
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
    <html id="e">
    <div className="eventtik">
      <form className="event-formtik" encType="multipart/form-data">
        <h3 className="infotik">مشخصات رویداد</h3>

        <label className="Labeladd" htmlFor="name">
          عنوان رویداد
        </label>
        <input
          type="text"
          id="name"
          value={newEvent.name}
          onChange={(e) => handleEventChange("name", e.target.value)}
          className={`addinput-field ${errors.name ? "error-field" : ""}`}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}

        <label className="Labeladd" htmlFor="status">وضعیت رویداد</label>
        <select
          id="status"
          value={newEvent.status}
          onChange={(e) => handleEventChange("status", e.target.value)}
          className={`custom-dropdowne ${errors.status ? "error-field" : ""}`}
        >
          <option value="">انتخاب کنید</option>
          <option value="published">درحال اجرا</option>
          <option value="completed">اجرا شده</option>
          <option value="draft">پیش نویس</option>
        </select>
        {errors.status && <span className="error-message">{errors.status}</span>}


        <label className="Labeladd" htmlFor="categories">موضوع رویداد</label>
        <select onChange={handleCategoriesChange} className="custom-dropdowne">
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
                    className="addinput-field"
                  />
                </div>
              ))}
              <button type="button" onClick={handleAddCategory}>
                افزودن دسته بندی دیگر
              </button>
            </div>
          </>
        )}
        
         <label className="Labeladd" htmlFor="description">توضیحات</label>
         <textarea
           id="description"
           onChange={(e) => handleEventChange("description", e.target.value)}
          className={`addinput-field textarea-field ${errors.description ? "error-field" : ""}`}

         />
         {errors.description && <span className="error-message">{errors.description}</span>}

         {/* تاریخ و ساعت شروع */}
         <label className="Labeladd" htmlFor="fromDate">تاریخ و ساعت شروع</label>
         <input
           type="datetime-local"
           id="fromDate"
           onChange={(e) => handleEventChange("fromDate", e.target.value)}
          className={`addinput-field  ${errors.fromDate ? "error-field" : ""}`}
         />
         {errors.fromDate && <span className="error-message">{errors.fromDate}</span>}
         {/* تاریخ و ساعت پایان */}
         <label className="Labeladd" htmlFor="toDate">تاریخ و ساعت پایان</label>
         <input
           type="datetime-local"
           id="toDate"
           onChange={(e) => handleEventChange("toDate", e.target.value)}
          className={`addinput-field  ${errors.toDate ? "error-field" : ""}`}
         />
         {errors.toDate && <span className="error-message">{errors.toDate}</span>}

         {/* حداقل ظرفیت */}
         <label className="Labeladd" htmlFor="minCapacity">حداقل ظرفیت</label>
         <input
           type="number"
           id="minCapacity"
           onChange={(e) => handleEventChange("minCapacity", e.target.value)}
          className={`addinput-field  ${errors.minCapacity ? "error-field" : ""}`}
         />
         {errors.minCapacity && <span className="error-message">{errors.minCapacity}</span>}
         {/* حداکثر ظرفیت */}
         <label className="Labeladd" htmlFor="maxCapacity">حداکثر ظرفیت</label>
         <input
           type="number"
           id="maxCapacity"
           onChange={(e) => handleEventChange("maxCapacity", e.target.value)}
          className={`addinput-field  ${errors.maxCapacity ? "error-field" : ""}`}
         />
         {errors.maxCapacity && <span className="error-message">{errors.maxCapacity}</span>}

         <label className="Labeladd" htmlFor="basePrice">حداقل قیمت</label>
         <input
           type="number"
           id="basePrice"
           onChange={(e) => handleEventChange("basePrice", e.target.value)}
          className={`addinput-field  ${errors.basePrice ? "error-field" : ""}`}
         />
         {errors.basePrice && <span className="error-message">{errors.basePrice}</span>}

         <label className="Labeladd" htmlFor="venueType">نوع رویداد</label>
         <select
          id="venueType"
          value={eventType}
          onChange={(e) => handleVenueTypeChange(e.target.value)}
          className={`custom-dropdowne ${errors.venueType ? "error-field" : ""}`}
        >
          <option value="">انتخاب کنید</option>
          <option value="online">آنلاین</option>
          <option value="physical">حضوری</option>
        </select>
        {errors.venueType && <span className="error-message">{errors.venueType}</span>}
        {/* Conditional fields */}
        {eventType === "online" && (
          <>
            <label className="Labeladd" htmlFor="location">لینک وبینار</label>
            <input
              type="text"
              id="location"
              value={newEvent.location}
              onChange={(e) => handleEventChange("location", e.target.value)}
              className={`addinput-field ${errors.location ? "error-field" : ""}`}
            />
            {errors.location && <span className="error-message">{errors.location}</span>}
          </>
        )}
        {eventType === "physical" && (
          <>
            <label className="Labeladd" htmlFor="location">آدرس محل برگزاری</label>
            <input
              type="text"
              id="location"
              value={newEvent.location}
              onChange={(e) => handleEventChange("location", e.target.value)}
              className={`addinput-field ${errors.location ? "error-field" : ""}`}
            />
            {errors.location && <span className="error-message">{errors.location}</span>}
          </>
        )}

<label className="Labeladd" htmlFor="banner">محل بارگزاری عکس</label>
    {/* بارگذاری بنر */}
    <div className="L1" >
      
        <input
          type="file"
          id="banner"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]; // Get the first selected file
            if (file) {
              handleEventChange("banner", file);
            }
          }}
          className={`a ${errors.banner ? "error-field" : ""}`}
        />

</div>

        <div className="buttonadd-container">
          <button type="button" onClick={onSubmit} className="submittik">
            ثبت بلیت
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
  );
};

export default Event;

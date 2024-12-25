
// import React, { useEffect, useState } from "react";
// import axios, { AxiosError, CanceledError } from "axios";
// import './addevent.css'
// import { useForm } from "react-hook-form";
// import { Link, useNavigate,useParams } from "react-router-dom";


// interface FormData {
//   name: string;
//   status: string;
//   description: string;
//   fromDate: string;
//   toDate: string;
//   minCapacity: number;
//   maxCapacity: number;
//   basePrice:number;
//   venueType: string;
//   location: string;
//   banner:File | string | null;
//   category: string[];


// }
// // interface FormData2 {
// //   name: string;
// //   status: string;
// //   description: string;
// //   fromDate: string;
// //   toDate: string;
// //   minCapacity: number;
// //   maxCapacity: number;
// //   basePrice:number;
// //   venueType: string;
// //   location: string;
// //   banner:FileList|null;
// //   category: string[];
// //   comments: string;
// //   created_at: string;
// //   id : number;
// // }





// const EditEvent: React.FC = () => {

//   const [eventType, setEventType] = useState<string>("");
//   const [categories, setCategories] = useState<string[]>([]);
//   const [customCategory, setCustomCategory] = useState<string>("");
//   const [isCustomCategory, setIsCustomCategory] = useState(false); 
//   const [loadingCategories, setLoadingCategories] = useState(false);
// //----------last
// const { EventId } = useParams<{ EventId: string }>();


//     // const params = useParams<{ id: string }>(); // type the params with `id` being a string
//   const [initialData, setInitialData] = useState<FormData| null>(null);
// //-------------done last
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isValid }
//   } = useForm<FormData>({
//     mode: "onChange",
//   });

// //-----------------me
//   // const [EditEvents,setEditEvents]= useState<FormData[]>([]);
//   const [newEditEvent,setNewEditEvent]=useState<FormData>({
  
  
//     name: "",
//     status: "",
//     description: "",
//     fromDate: "",
//     toDate: "",
//     minCapacity: 0,
//     maxCapacity: 0,
//     basePrice: 0,
//     venueType: "",
//     location: "",
//     banner:null,
//     category: [],

  
//   });
  
// //-----------------------done me


//   const handleEventTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setEventType(e.target.value);
//   };

//   const handleEditEvetnChange = (
//     field: keyof FormData,
//     value: string | number | File | null
//   ) => {
//     setNewEditEvent({ ...newEditEvent, [field]: value });
//   };


//   const handleFileChange =
//   (field: "banner"  ) =>
//   (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       const file = event.target.files[0];
//       handleEditEvetnChange(field, file);
//     }
//   };



//   const handleCategoryChange = (index: number, value: string) => {
//     const updatedCategories = [...newEditEvent.category];
//     updatedCategories[index] = value;
//     setNewEditEvent({ ...newEditEvent, category: updatedCategories });
//   };
//   const addCategory = () => {
//     setNewEditEvent({ ...newEditEvent, category: [...newEditEvent.category, ""] });
//   };

//   const deleteCategory = (index: number) => {
//     const updatedCategories = newEditEvent.category.filter((_, i) => i !== index);
//     setNewEditEvent({ ...newEditEvent, category: updatedCategories });
//   };





//   useEffect(() => {
//     const fetchCategories = async () => {
//       setLoadingCategories(true);
//       try {
//         const response = await axios.get("https://fd64-2a12-5e40-1-67be-8b92-66b0-e183-2a0c.ngrok-free.app/v1/public/categories", {
//           headers: {"ngrok-skip-browser-warning": "69420",
//                 'Content-Type': 'application/json' },
//         });
//         console.log(response.data.data); 
//         setCategories(response.data.data); // Assuming response.data.category is string[]
//       } catch (error) {
//         if (error instanceof CanceledError) return;
//         console.error("Error fetching categories:", error);
//       } finally {
//         setLoadingCategories(false);
//       }
//     };
  
//     fetchCategories();
//   }, []);





//   const onSubmit = async () =>
//   {
//     // event.preventDefault(); // Prevent form submission and page refresh

//     newEditEvent.fromDate+=":00Z";
//     newEditEvent.toDate+=":00Z";
//     const formData = new FormData();
//     if (newEditEvent.name && newEditEvent.name !== initialData?.name) {
//       formData.append("name", newEditEvent.name);

//     }


//     if (newEditEvent.fromDate && newEditEvent.fromDate !== initialData?.fromDate) {
//       formData.append("fromDate", newEditEvent.fromDate);

//     }

//     if (newEditEvent.toDate && newEditEvent.toDate !== initialData?.toDate) {
//       formData.append("toDate", newEditEvent.toDate);

//     }

// //seems to have problem
//     if (newEditEvent.basePrice && newEditEvent.basePrice !== initialData?.basePrice) {
//       formData.append("basePrice", newEditEvent.basePrice.toString());

//     }

//     if (newEditEvent.location && newEditEvent.location !== initialData?.location) {
//       formData.append("location", newEditEvent.location);

//     }


//     if (newEditEvent.status && newEditEvent.status !== initialData?.status) {
//       formData.append("status", newEditEvent.status);

//     }

//     if (newEditEvent.venueType && newEditEvent.venueType !== initialData?.venueType) {
//       formData.append("venueType", newEditEvent.venueType);

//     }


//     if (newEditEvent.minCapacity && newEditEvent.minCapacity !== initialData?.minCapacity) {
//       formData.append("minCapacity", newEditEvent.minCapacity.toString());

//     }

//     if (newEditEvent.maxCapacity && newEditEvent.maxCapacity !== initialData?.maxCapacity) {
//       formData.append("maxCapacity", newEditEvent.maxCapacity.toString());

//     }


//     const newCategories = newEditEvent.category.filter(cat => !initialData?.category.includes(cat));
  
//     // If there are new categories, append them as separate form data entries
//     newCategories.forEach((cat) => {
//       formData.append("categories", cat); // Append each category as a separate entry
//     });
//     if (newEditEvent.banner && newEditEvent.banner !== initialData?.banner) {
//       formData.append("banner", newEditEvent.banner);
//     }




//     // newEditEvent.created_at= initialData?.created_at;

//   //   console.log(newEditEvent.name);
//   //   console.log(newEditEvent.description);
//   //   if (newEditEvent.banner && newEditEvent.banner.length > 0) {  
//   //     console.log(newEditEvent.banner[0]); // This will log the first file in the FileList  
//   // } else {  
//   //     console.log("No files selected for the banner.");  
//   // }
//   // console.log(newEditEvent.basePrice);
//   // console.log(newEditEvent.category);


    
//     try {
//       const res = await axios.put(
//         `https://fd64-2a12-5e40-1-67be-8b92-66b0-e183-2a0c.ngrok-free.app/v1/public/events/Update/${EventId}`,
//         newEditEvent,
//         {
//           withCredentials: true,
//           headers: {"ngrok-skip-browser-warning": "69420",
//             "Content-Type": "multipart/form-data",
//             },
//         }
//       );
//       console.log("event edited successfully:", res.data);
//     } catch (err) {
//       if (err instanceof CanceledError) return;
//       console.error("error editing event:", err);
//     }
//   };




// useEffect(
//   () => {

//     async function getEvent(){



//       try {  
//         const response = await axios.get(`https://fd64-2a12-5e40-1-67be-8b92-66b0-e183-2a0c.ngrok-free.app/v1/public/events/Edit/16`, {
//           headers: {
//             "ngrok-skip-browser-warning": "69420",
//             'Content-Type': 'application/json', // Example header
  
//           },
//         });
//         if (response.status === 200 && response.data) {
//           console.log(response.data.data)
//           const eventData = response.data.data;

//           // const eventData=response.data.data;
//           // const trimTime = (time: string | null) => {
//           //   if (!time) return ""; // Return empty string for null/undefined
//           //   const timeParts = time.split(":");
//           //   if (timeParts.length >= 2) {
//           //     return timeParts.slice(0, 2).join(":"); // Keep only hours and minutes
//           //   }
//           //   return time; // Return as-is if splitting fails
//           // };
//           // eventData.available_from = trimTime(eventData.available_from);
//           // eventData.available_until = trimTime(eventData.available_until);
//           const trimTime = (time: string | null) => {
//             if (!time) return ""; // Return empty string for null/undefined
//             const timeParts = time.split(":");
//             if (timeParts.length >= 2) {
//               return timeParts.slice(0, 2).join(":"); // Keep only hours and minutes
//             }
//             return time; // Return as-is if splitting fails
//           };

//           eventData.available_from = trimTime(eventData.available_from);
//           eventData.available_until = trimTime(eventData.available_until);
//           console.log(eventData);
//           const cat = Array.isArray(eventData.category)
//           ? eventData.category
//           : eventData.category
//           ? eventData.category.split(",")
//           : [];
  

//           // name: "",
//           // status: "",
//           // description: "",
//           // fromDate: "",
//           // toDate: "",
//           // minCapacity: 0,
//           // maxCapacity: 0,
//           // basePrice: 0,
//           // venueType: "",
//           // location: "",
//           // banner:null,
//           // category: [],


//           setInitialData(eventData)
          
//         //   setNewEditEvent({
//         //   name: eventData.name,
//         //   description: eventData.description || "",
//         //   status: eventData.status,
//         //   fromDate: eventData.fromDate,
//         //   toDate: eventData.toDate,
//         //   minCapacity: eventData.minCapacity,
//         //   maxCapacity: eventData.maxCapacity,
//         //   basePrice: eventData.basePrice,
//         //   venueType: eventData.venueType,
//         //   location: eventData.location,
//         //   banner: eventData.banner|| null,
//         //   category: cat,
//         //  });


//           };
  
//       } 
//          catch (error) {
//           if (error instanceof CanceledError) return;
//           console.error("Unable to fetch event data:", error);
  
//            } ;
  

//   } 
//   if (EventId)
//   {
//     getEvent();
//   }
// },[EventId]);

// const [selectedTemplate, setSelectedTemplate] = useState<
// "published" | "completed" | "draft"
// >("published");
// const handleTemplateChange = (template: "published" | "completed"| "draft") => {
//   setSelectedTemplate(template);


// };

// //-------------------------FETCHING TICKET


// interface FormTicket {

// }



// // const [initialTicket, setInitialTicket] = useState<FormTicket[]>([]);

// // useEffect(
// //   () => {

// //     async function getTicket(){

// //       try {  
// //         const response = await axios.get('https://fd64-2a12-5e40-1-67be-8b92-66b0-e183-2a0c.ngrok-free.app/v1/public/events/published', {
// //           headers: {
// //             "ngrok-skip-browser-warning": "69420",
// //             'Content-Type': 'application/json', // Example header
  
// //           },
// //         });
        
// //         if (response.status === 200 && response.data) {
// //           console.log(response);
// //           console.log("-------------------------response.data-------------------------------------------------");
// //           console.log(response.data.data);
// //           console.log("--------------------------------respons.data.data------------------------------------------");

// //           const sortedTicket= response.data.data
// //             // .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Sort by date descending
// //             .slice(0, 5);

// //             console.log(sortedTicket); // Optionally log the sorted data
// //             setInitialTicket(sortedTicket); 
// //           };
  
// //       } 
// //          catch (err) {
// //           console.error("Error fetching events:", err);  
// //         } finally {  
// //         }
// //   } getTicket()},[])







// // //-----------------------------FETCHING DISCOUNT






// // interface FormDiscount {

// // }



// // const [initialDiscount, setInitialDiscount] = useState<FormDiscount[]>([]);

// // useEffect(
// //   () => {

// //     async function getDiscount(){

// //       try {  
// //         const response = await axios.get('https://fd64-2a12-5e40-1-67be-8b92-66b0-e183-2a0c.ngrok-free.app/v1/public/events/published', {
// //           headers: {
// //             "ngrok-skip-browser-warning": "69420",
// //             'Content-Type': 'application/json', // Example header
  
// //           },
// //         });
        
// //         if (response.status === 200 && response.data) {
// //           console.log(response);
// //           console.log("-------------------------response.data-------------------------------------------------");
// //           console.log(response.data.data);
// //           console.log("--------------------------------respons.data.data------------------------------------------");

// //           const sortedDiscount= response.data.data
// //             // .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Sort by date descending
// //             .slice(0, 5);

// //             console.log(sortedDiscount); // Optionally log the sorted data
// //             setInitialDiscount(sortedDiscount); 
// //           };
  
// //       } 
// //          catch (err) {
// //           console.error("Error fetching events:", err);  
// //         } finally {  
// //         }
//   // } getDiscount()},[])








//   return (
//       <div className="edit-event">
//   {/* main edit form */}
// <div className="eventadd">
// <h3 className="infoadd">مشخصات رویداد</h3>

//       <form className="eventadd-form" onSubmit={handleSubmit(onSubmit)}>
//         <div className="event-name">
//         <label htmlFor="name">نام رویداد</label>
//         <input
//           id="name"
//           // {...register("name")}
//           className="addinput-field "
//           value={initialData?.name}
//           onChange={(e) => handleEditEvetnChange("name", e.target.value)}


//         />
//         {errors.name && <p className="erroradd">{errors.name.message}</p>}

//         </div>

//         <div className="event-status">
//         <label htmlFor="status">وضعیت رویداد</label>
//         <select
//           id="status"
//           // {...register("status")}
//           className="addinput-field"
//           value={newEditEvent.status}
//           onChange={(e) =>
//             handleTemplateChange(e.target.value as "published" | "completed" | "draft")
//           }        >
//           <option value="">انتخاب کنید</option>
//           <option value="published">درحال اجرا</option>
//           <option value="completed">اجرا شده</option>
//           <option value="draft">پیش نویس</option>
//         </select>
//         {errors.status && <p className="erroradd">{errors.status.message}</p>}

//         </div>

//         {/* <div className="event-category"> */}
//         {/* <label htmlFor="category">موضوع رویداد</label> */}
//                   {/* <select
//                     onChange={(e) => {
//                       handleCategoryChange(e);
                  
//                       handleEditEvetnChange("category", e.target.value);
//                     }}
//                     className="addinput-field"
//                   >
//                     <option value="">انتخاب کنید</option>
//                     {categories.map((category) => (
//                       <option key={category} value={category}> */}
//                         {/* {category}        فیلد برای وارد کردن موضوع دلخواه */}
//         {/* {isCustomCategory && (
//           <>
//             <label htmlFor="category">موضوع دلخواه</label>
//             <input
//               type="text"
//               id="category"
//               value={customCategory}
//               onChange={(e) => setCustomCategory(e.target.value)}
//               className="addinput-field"
//             />
//           </>
//         )} 
//                       </option>
//                     ))}
//           <option value="other">سایر</option>
//         </select>
//         {errors.category && <p className="erroradd">{errors.category.message}</p>}

//         </div> */}
//                   {newEditEvent.category.map((category, index) => (
//             <div key={index} className="writer-field">
//               <input
//                 type="text"
//                 value={category}
//                 onChange={(e) => handleCategoryChange(index, e.target.value)}
//                 className="addinput-field"
//                 required
//               />
//               <button
//                 type="button"
//                 className="remove-writer"
//                 onClick={() => deleteCategory(index)}
//               >
//                 حذف
//               </button>
//             </div>
//           ))}

        
//         <div className="event-description">
//         <label htmlFor="description">توضیحات</label>
//         <input
//         type="text"
//           id="description"
          
//           // {...register("description")}
//           className="addinput-field"

//           defaultValue={initialData?.description}
//           onChange={(e) => handleEditEvetnChange("description", e.target.value)}

//         />
//         {errors.description && <p className="erroradd">{errors.description.message}</p>}

//         </div>

//           <div className="event-from">
//           <label htmlFor="fromDate">تاریخ و ساعت شروع</label>
//         <input
//           type="datetime-local"
//           id="fromDate"
//           // {...register("fromDate")}
//           className="addinput-field"
//           defaultValue={initialData?.fromDate}
//           onChange={(e) => handleEditEvetnChange("fromDate", e.target.value)}

//         />
//         {errors.fromDate && <p className="erroradd">{errors.fromDate.message}</p>}

//           </div>
          

//           <div className="event-to">
//           <label htmlFor="toDate">تاریخ و ساعت پایان</label>
//         <input
//           type="datetime-local"
//           id="toDate"
//           // {...register("toDate")}
//           className="addinput-field"
//           defaultValue={initialData?.toDate}
//           onChange={(e) => handleEditEvetnChange("toDate", e.target.value)}

//         />
//         {errors.toDate && <p className="erroradd">{errors.toDate.message}</p>}

//           </div>


//         <div className="event-minCap">
//         <label htmlFor="minCapacity">حداقل ظرفیت</label>
//         <input
//           type="number"
//           id="minCapacity"
//           // {...register("minCapacity", {
//           //   min: { value: 1, message: "حداقل ظرفیت باید حداقل 1 باشد" },
//           // })}
//           className="addinput-field"
//           defaultValue={initialData?.minCapacity}
//           onChange={(e) => handleEditEvetnChange("minCapacity", parseInt(e.target.value, 10))}

//         />
//         {errors.minCapacity && <p className="erroradd">{errors.minCapacity.message}</p>}

//         </div>



//         <div className="event-maxCap">
//         <label htmlFor="maxCapacity">حداکثر ظرفیت</label>
//         <input
//           type="number"
//           id="maxCapacity"
//           // {...register("maxCapacity", {
//           //   validate: (value) =>
//           //     value > 0
//           // })}
//           className="addinput-field"
//           defaultValue={initialData?.maxCapacity}
//           onChange={(e) => handleEditEvetnChange("maxCapacity", parseInt(e.target.value, 10))}

//         />
//         {errors.maxCapacity && <p className="erroradd">{errors.maxCapacity.message}</p>}

//         </div>


//           <div className="event-price">
//           <label htmlFor="basePrice">حداقل قیمت</label>
//         <input
//           type="number"
//           id="basePrice"
//           defaultValue={initialData?.basePrice}
//           // {...register("basePrice", { required: "حداقل قیمت ظرفیت الزامی است" })}
//           className="addinput-field"
//           onChange={(e) => handleEditEvetnChange("basePrice", parseInt(e.target.value, 10))}

//         />
//         {errors.basePrice && <p className="erroradd">{errors.basePrice.message}</p>}

//           </div>


//           <div className="event-type">
//           <label className="Labeladd" htmlFor="venueType">نوع رویداد</label>
//         <select
//           id="venueType"
//           // {...register("venueType", { required: "نوع رویداد الزامی است" })}
//           value={eventType}
//           // onChange={handleEventTypeChange}
//           onChange={(e) => {
//            // setEventType(e.target.value);
//             handleEventTypeChange(e); 
//             handleEditEvetnChange("venueType", e.target.value)// make sure to also update form state if needed
//           }}
//           className="addinput-field"
//           defaultValue={initialData?.venueType}
//         >
//           <option value="">انتخاب کنید</option>
//           <option value="online">آنلاین</option>
//           <option value="physical">حضوری</option>
//         </select>
//         {errors.venueType && <p className="erroradd">{errors.venueType.message}</p>}


//     {/* لینک یا آدرس */}
//     {eventType === "online" && (
//       <>
//         <label className="Labeladd" htmlFor="location">لینک وبینار</label>
//         <input
//           type="text"
//           id="location"
//           defaultValue={initialData?.location}

//           // {...register("location", { required: "لینک وبینار الزامی است" })}
//           className="addinput-field"
//           onChange={(e) => handleEditEvetnChange("location", e.target.value)}

//         />
//         {errors.location && <p className="erroradd">{errors.location.message}</p>}
//       </>
//     )}

//     {eventType === "physical" && (
//       <>
//         <label className="Labeladd" htmlFor="location">آدرس محل برگزاری</label>
//         <input
//           type="text"
//           id="location"
//           defaultValue={initialData?.location}
//           onChange={(e) => handleEditEvetnChange("location", e.target.value)}

//           // {...register("location", { required: "آدرس الزامی است" })}
//           className="addinput-field"
//         />
//         {errors.location && <p className="erroradd">{errors.location.message}</p>}
//       </>
//     )}

//           </div>



//     {/* بارگذاری بنر */}
//     <div className="event-banner">
//       <label className="photoadd" htmlFor="banner">عکس خود را بارگذاری کنید</label>
//       <input
//         className="addinput-field"
//         type="file"
//         id="banner"
//         accept="image/*"
//         {...register("banner")}
//         onChange={(e) => {handleFileChange("banner")}}

//       />
//                     {typeof newEditEvent.banner === "string" && (
//                 <img src={newEditEvent.banner} alt="Current banner" width="100" />
//               )}
//       {errors.banner && <p className="erroradd">{errors.banner.message}</p>}
//     </div>


// <div className="buttonadd-container">
//                   <button
//           type="submit"
//           className="submitadd"
//         >
//           ثبت
//         </button>
//         <button
//           type="button"
//           className="canceladd"
//           onClick={() => navigate("/")} // مسیر مورد نظر خود را جایگزین کنید
//         >
//           لغو
//         </button>
//         </div>


//       </form>
//     </div>

//   <div className="event-ticket-discount">
//     {/* ticket list */}
    
//     {/* <div>
//     <table className="ticket-table">
//     <thead>
//       <tr>
//         <th>اسم بلیت</th>
//         <th>توضیحات</th>
//         <th>قیمت</th>
//         <th>تعداد</th>
//       </tr>
//     </thead>
//     <tbody>
//       {initialTicket.length > 0 ? (
//         initialTicket.map((ticket, index) => (
//           <Link key={ticket.id || index} to={`/ticket/${ticket.id}`} className="ticket-link">
//             <tr className="ticket-box">
//               <td className="ticket-name">{ticket.name}</td>
//               <td className="ticket-description">
//                 {ticket.description || 'توضیحات مربوط به بلیت: نبانتابهشاکخعابنضشاهعکاخ'}
//               </td>
//               <td className="ticket-price">{ticket.base_price || 0}</td>
//               <td className="ticket-quantity">{ticket.quantity || 0}</td>
//             </tr>
//           </Link>
//         ))
//       ) : (
//         <tr>
//           <td colSpan="4">هیچ رویدادی موجود نیست.</td>
//         </tr>
//       )}
//     </tbody>
//   </table> */}
//   {/* <table className="ticket-table">
//     <thead>
//       <tr>
//         <th>اسم بلیت</th>
//         <th>توضیحات</th>
//         <th>قیمت</th>
//         <th>تعداد</th>
//       </tr>
//     </thead>
//     <tbody>
//       <tr className="ticket-box">
//         <td className="ticket-name">اسم بلیت</td>
//         <td className="ticket-description">توضیحات مربوط به بلیت: نبانتابهشاکخعابنضشاهعکاخ</td>
//         <td className="ticket-price">5000</td>
//         <td className="ticket-quantity">5</td>
//       </tr>
//       <tr className="ticket-box">
//         <td className="ticket-name">اسم بلیت</td>
//         <td className="ticket-description">توضیحات مربوط به بلیت: نبانتابهشاکخعابنضشاهعکاخ</td>
//         <td className="ticket-price">5000</td>
//         <td className="ticket-quantity">5</td>
//       </tr>
//       <tr className="ticket-box">
//         <td className="ticket-name">اسم بلیت</td>
//         <td className="ticket-description">توضیحات مربوط به بلیت: نبانتابهشاکخعابنضشاهعکاخ</td>
//         <td className="ticket-price">5000</td>
//         <td className="ticket-quantity">5</td>
//       </tr>
//       <tr className="ticket-box">
//         <td className="ticket-name">اسم بلیت</td>
//         <td className="ticket-description">توضیحات مربوط به بلیت: نبانتابهشاکخعابنضشاهعکاخ</td>
//         <td className="ticket-price">5000</td>
//         <td className="ticket-quantity">5</td>
//       </tr>
//       <tr className="ticket-box">
//         <td className="ticket-name">اسم بلیت</td>
//         <td className="ticket-description">توضیحات مربوط به بلیت: نبانتابهشاکخعابنضشاهعکاخ</td>
//         <td className="ticket-price">5000</td>
//         <td className="ticket-quantity">5</td>
//       </tr>
//       <tr className="ticket-box">
//         <td className="ticket-name">اسم بلیت</td>
//         <td className="ticket-description">توضیحات مربوط به بلیت: نبانتابهشاکخعابنضشاهعکاخ</td>
//         <td className="ticket-price">5000</td>
//         <td className="ticket-quantity">5</td>
//       </tr>
//       <tr className="ticket-box">
//         <td className="ticket-name">اسم بلیت</td>
//         <td className="ticket-description">توضیحات مربوط به بلیت: نبانتابهشاکخعابنضشاهعکاخ</td>
//         <td className="ticket-price">5000</td>
//         <td className="ticket-quantity">5</td>
//       </tr>
//       <tr className="ticket-box">
//         <td className="ticket-name">اسم بلیت</td>
//         <td className="ticket-description">توضیحات مربوط به بلیت: نبانتابهشاکخعابنضشاهعکاخ</td>
//         <td className="ticket-price">5000</td>
//         <td className="ticket-quantity">5</td>
//       </tr>
//     </tbody>

//   </table> */}
//   {/* <div>
//     <button
//           type="button"
//           className="add-btn"
//           onClick={() => navigate("/")} // مسیر مورد نظر خود را جایگزین کنید
//         >
//           افزودن بلیت
//         </button>
//     </div>
//     </div> */}


//   {/* discount list */}
// <div className="my-list">

// <table className="discount-table">
//   <thead>
//     <tr>
//       <th>اسم تخفیف</th>
//       <th>توضیحات مربوط به تخفیف</th>
//       <th>قیمت</th>
//       <th>تعداد</th>
//     </tr>
//   </thead>
//   <tbody>
//     <tr className="discount-box">
//       <td className="discount-name">اسم تخفیف</td>
//       <td className="discount-description">توضیحات مربوط به تخفیف: نبانتابهشاکخعابنضشاهعکاخ</td>
//       <td className="discount-price">5000</td>
//       <td className="discount-quantity">5</td>
//     </tr>
//     <tr className="discount-box">
//       <td className="discount-name">اسم تخفیف</td>
//       <td className="discount-description">توضیحات مربوط به تخفیف: نبانتابهشاکخعابنضشاهعکاخ</td>
//       <td className="discount-price">5000</td>
//       <td className="discount-quantity">5</td>
//     </tr>
//     <tr className="discount-box">
//       <td className="discount-name">اسم تخفیف</td>
//       <td className="discount-description">توضیحات مربوط به تخفیف: نبانتابهشاکخعابنضشاهعکاخ</td>
//       <td className="discount-price">5000</td>
//       <td className="discount-quantity">5</td>
//     </tr>
//   </tbody>
// </table>

// <div>
//     <button
//           type="button"
//           className="add-btn"
//           onClick={() => navigate("/")} // مسیر مورد نظر خود را جایگزین کنید
//         >
//           افزودن تخفیف 
//         </button>
//     </div>
// </div>
// </div>

// </div>



//   );
// };

// export default EditEvent;
import React, { useEffect, useState } from "react";
import axios, { AxiosError, CanceledError } from "axios";
import './editEvent.css'
import { useForm } from "react-hook-form";
import { Link, useNavigate,useParams } from "react-router-dom";


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
  banner:File|null|string;
  category: string[];


}
interface FormData2 {
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
  banner:File | string | null;
  category: string[];

}





const EditEvent: React.FC = () => {

  const [eventType, setEventType] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [customCategory, setCustomCategory] = useState<string>("");
  const [isCustomCategory, setIsCustomCategory] = useState(false); 
  const [loadingCategories, setLoadingCategories] = useState(false);
//----------last

    const params = useParams<{ id: string }>(); // type the params with `id` being a string
    const [initialData, setInitialData] = useState<FormData| null>();
//-------------done last
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<FormData>({
    mode: "onChange",
  });

//-----------------me
  const [EditEvents,setEditEvents]= useState<FormData[]>([]);
  const [newEditEvent,setNewEditEvent]=useState<FormData>({
  
  
    name: "",
    status: "",
    description: "",
    fromDate: "",
    toDate: "",
    minCapacity: 0,
    maxCapacity: 0,
    basePrice: 0,
    venueType: "",
    location: "",
    banner: null,
    category: [],

  
  });
  
//-----------------------done me


  const handleEventTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEventType(e.target.value);
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "other") {
      setIsCustomCategory(true);
    } else {
      setIsCustomCategory(false);
    }
  };

  const handleEditEvetnChange = (
    field: keyof FormData,
    value: string | number| File| null
  ) => {
    setNewEditEvent({ ...newEditEvent, [field]: value });
  };


  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await axios.get("https://fd64-2a12-5e40-1-67be-8b92-66b0-e183-2a0c.ngrok-free.app/v1/public/categories", {
          headers: {"ngrok-skip-browser-warning": "69420",
                'Content-Type': 'application/json' },
        });
        console.log(response.data.data); 
        setCategories(response.data.data); // Assuming response.data.category is string[]
      } catch (error) {
        if (error instanceof CanceledError) return;
        console.error("Error fetching categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };
  
    fetchCategories();
  }, []);


  const handleFileChange =
  (field: "banner" ) =>
  (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      handleEditEvetnChange(field, file);
    }
  };


  const onSubmit = async () =>
  {
    newEditEvent.fromDate+=":00Z";
    newEditEvent.toDate+=":00Z";
    // newEditEvent.created_at= initialData?.created_at;

    console.log(newEditEvent.name);
    console.log(newEditEvent.description);
  console.log(newEditEvent.basePrice);
  console.log(newEditEvent.category);
  console.log('Is roles an array?:', Array.isArray(newEditEvent.category));  

  newEditEvent.fromDate+=":00Z";
      const formData = new FormData();
      if (newEditEvent.name && newEditEvent.name !== initialData?.name) {
        formData.append("name", newEditEvent.name);
  
      }
  
  
      if (newEditEvent.fromDate && newEditEvent.fromDate !== initialData?.fromDate) {
        formData.append("fromDate", newEditEvent.fromDate);
  
      }
  
      if (newEditEvent.toDate && newEditEvent.toDate !== initialData?.toDate) {
        formData.append("toDate", newEditEvent.toDate);
  
      }
  
  //seems to have problem
      if (newEditEvent.basePrice && newEditEvent.basePrice !== initialData?.basePrice) {
        formData.append("basePrice", newEditEvent.basePrice.toString());
  
      }
  
      if (newEditEvent.location && newEditEvent.location !== initialData?.location) {
        formData.append("location", newEditEvent.location);
  
      }
  
  
      if (newEditEvent.status && newEditEvent.status !== initialData?.status) {
        formData.append("status", newEditEvent.status);
  
      }
  
      if (newEditEvent.venueType && newEditEvent.venueType !== initialData?.venueType) {
        formData.append("venueType", newEditEvent.venueType);
  
      }
  
  
      if (newEditEvent.minCapacity && newEditEvent.minCapacity !== initialData?.minCapacity) {
        formData.append("minCapacity", newEditEvent.minCapacity.toString());
  
      }
  
      if (newEditEvent.maxCapacity && newEditEvent.maxCapacity !== initialData?.maxCapacity) {
        formData.append("maxCapacity", newEditEvent.maxCapacity.toString());
  
      }
  
  
      // formData.append("category",newCategories)
      if (newEditEvent.banner && newEditEvent.banner !== initialData?.banner) {
        formData.append("banner", newEditEvent.banner);
      }
      console.log(typeof(newEditEvent.name));
      console.log(typeof(newEditEvent.description));

      console.log(typeof(newEditEvent.toDate));

      console.log('min capacity: '+typeof(newEditEvent.fromDate));

      console.log('price: '+typeof(newEditEvent.basePrice));

      console.log('banner: '+typeof(newEditEvent.banner));
      const newCategories = newEditEvent.category.filter(category => !initialData?.category.includes(category));
      // const newCategories = Array.isArray(newEditEvent.category)   
      // ? newEditEvent.category   
      // : [newEditEvent.category]; 
      // If there are new categories, append them as separate form data entries
      newCategories.forEach((cat) => {
        formData.append("category", cat.toString()); // Append each category as a separate entry
      });

      // formData.append("category", newCategories); // Append each category as a separate entry
     // formData.append("category",newEditEvent.category.toString())

      console.log('min capacity: '+typeof(newEditEvent.minCapacity));
      console.log('category: '+typeof(newEditEvent.category));

      // console.log(typeof(formData.maxCapacity));


      // console.log(typeof(newCategories));

     
    
    try {
      const res = await axios.put(
        `https://fd64-2a12-5e40-1-67be-8b92-66b0-e183-2a0c.ngrok-free.app/v1/public/events/Update/16`,
        newEditEvent,
        {
          withCredentials: true,
          headers: {"ngrok-skip-browser-warning": "69420",
            },
        }
      );
      console.log("event edited successfully:", res.data);
    } catch (err) {
      if (err instanceof CanceledError) return;
      console.error("error editing event:", err);
    }
  };




useEffect(
  () => {

    async function getEvent(){



      try {  
        const response = await axios.get('https://fd64-2a12-5e40-1-67be-8b92-66b0-e183-2a0c.ngrok-free.app/v1/public/events/Edit/16', {
          headers: {
            "ngrok-skip-browser-warning": "69420",
            'Content-Type': 'application/json', // Example header
  
          },
        });
        if (response.status === 200 && response.data) {
          console.log(response.data.data)
          const eventData = response.data.data;

          // const eventData=response.data.data;
          // const trimTime = (time: string | null) => {
          //   if (!time) return ""; // Return empty string for null/undefined
          //   const timeParts = time.split(":");
          //   if (timeParts.length >= 2) {
          //     return timeParts.slice(0, 2).join(":"); // Keep only hours and minutes
          //   }
          //   return time; // Return as-is if splitting fails
          // };
          // eventData.available_from = trimTime(eventData.available_from);
          // eventData.available_until = trimTime(eventData.available_until);
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
    
  
          setInitialData(eventData)
         setEditEvents(eventData);
         setNewEditEvent(eventData);


          };
  
      } 
         catch (err) {  } 
        finally {  }
  } getEvent()},[params.id])

//-------------------------FETCHING TICKET


interface FormTicket {

}



const [initialTicket, setInitialTicket] = useState<FormTicket[]>([]);

useEffect(
  () => {

    async function getTicket(){

      try {  
        const response = await axios.get('https://0ec3-2a12-5e40-1-67be-8b92-66b0-e183-2a0c.ngrok-free.app/v1/public/events/published', {
          headers: {
            "ngrok-skip-browser-warning": "69420",
            'Content-Type': 'application/json', // Example header
  
          },
        });
        
        if (response.status === 200 && response.data) {
          console.log(response);
          console.log("-------------------------response.data-------------------------------------------------");
          console.log(response.data.data);
          console.log("--------------------------------respons.data.data------------------------------------------");

          const sortedTicket= response.data.data
            // .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Sort by date descending
            .slice(0, 5);

            console.log(sortedTicket); // Optionally log the sorted data
            setInitialTicket(sortedTicket); 
          };
  
      } 
         catch (err) {
          console.error("Error fetching events:", err);  
        } finally {  
        }
  } getTicket()},[])







//-----------------------------FETCHING DISCOUNT






interface FormDiscount {

}



const [initialDiscount, setInitialDiscount] = useState<FormDiscount[]>([]);

useEffect(
  () => {

    async function getDiscount(){

      try {  
        const response = await axios.get('https://48f7-212-64-199-253.ngrok-free.app/v1/public/events/published', {
          headers: {
            "ngrok-skip-browser-warning": "69420",
            'Content-Type': 'application/json', // Example header
  
          },
        });
        
        if (response.status === 200 && response.data) {
          console.log(response);
          console.log("-------------------------response.data-------------------------------------------------");
          console.log(response.data.data);
          console.log("--------------------------------respons.data.data------------------------------------------");

          const sortedDiscount= response.data.data
            // .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Sort by date descending
            .slice(0, 5);

            console.log(sortedDiscount); // Optionally log the sorted data
            setInitialDiscount(sortedDiscount); 
          };
  
      } 
         catch (err) {
          console.error("Error fetching events:", err);  
        } finally {  
        }
  } getDiscount()},[])








  return (
      <div className="edit-event">
  {/* main edit form */}
<div className="eventadd">
<h3 className="infoadd">مشخصات رویداد</h3>

      <form className="eventadd-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="event-name">
        <label htmlFor="name">نام رویداد</label>
        <input
          id="name"
          // {...register("name")}
          className="addinput-field "
          value={newEditEvent.name}
          onChange={(e) => handleEditEvetnChange("name", e.target.value)}


        />
        {errors.name && <p className="erroradd">{errors.name.message}</p>}

        </div>

        <div className="event-status">
        <label htmlFor="status">وضعیت رویداد</label>
        <select
          id="status"
          // {...register("status")}
          className="addinput-field"
          value={newEditEvent.status}
          onChange={(e) => handleEditEvetnChange("status", e.target.value)}
        >
          <option value="">انتخاب کنید</option>
          <option value="published">درحال اجرا</option>
          <option value="completed">اجرا شده</option>
          <option value="draft">پیش نویس</option>
        </select>
        {errors.status && <p className="erroradd">{errors.status.message}</p>}

        </div>

        <div className="event-category">
        <label htmlFor="category">موضوع رویداد</label>
                  <select
                    id="category"
                    // {...register("category", { required: "موضوع رویداد الزامی است" })}
                    onChange={(e) => {
                      // Handle category change
                      handleCategoryChange(e);
                  
                      // Also update event change
                      handleEditEvetnChange("category", e.target.value);
                    }}
                    // onChange={handleCategoryChange}
                    // onChange={(e) => handleEditEvetnChange("category", e.target.value)}
                    className="addinput-field"
                  >
                    <option value="">انتخاب کنید</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}        {/* فیلد برای وارد کردن موضوع دلخواه */}
        {isCustomCategory && (
          <>
            <label htmlFor="category">موضوع دلخواه</label>
            <input
              type="text"
              id="category"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              className="addinput-field"
            />
          </>
        )} 
                      </option>
                    ))}
          <option value="other">سایر</option>
        </select>
        {errors.category && <p className="erroradd">{errors.category.message}</p>}

        </div>
        
        <div className="event-description">
        <label htmlFor="description">توضیحات</label>
        <input
        type="text"
          id="description"
          
          // {...register("description")}
          className="addinput-field"

          value={newEditEvent.description}
          onChange={(e) => handleEditEvetnChange("description", e.target.value)}

        />
        {errors.description && <p className="erroradd">{errors.description.message}</p>}

        </div>

          <div className="event-from">
          <label htmlFor="fromDate">تاریخ و ساعت شروع</label>
        <input
          type="datetime-local"
          id="fromDate"
          // {...register("fromDate")}
          className="addinput-field"
          value={newEditEvent.fromDate}
          onChange={(e) => handleEditEvetnChange("fromDate", e.target.value)}

        />
        {errors.fromDate && <p className="erroradd">{errors.fromDate.message}</p>}

          </div>
          

          <div className="event-to">
          <label htmlFor="toDate">تاریخ و ساعت پایان</label>
        <input
          type="datetime-local"
          id="toDate"
          // {...register("toDate")}
          className="addinput-field"
          value={newEditEvent.toDate}
          onChange={(e) => handleEditEvetnChange("toDate", e.target.value)}

        />
        {errors.toDate && <p className="erroradd">{errors.toDate.message}</p>}

          </div>


        <div className="event-minCap">
        <label htmlFor="minCapacity">حداقل ظرفیت</label>
        <input
          type="number"
          id="minCapacity"
          // {...register("minCapacity", {
          //   min: { value: 1, message: "حداقل ظرفیت باید حداقل 1 باشد" },
          // })}
          className="addinput-field"
          value={newEditEvent.minCapacity}
          onChange={(e) => handleEditEvetnChange("minCapacity", parseInt(e.target.value, 10))}

        />
        {errors.minCapacity && <p className="erroradd">{errors.minCapacity.message}</p>}

        </div>



        <div className="event-maxCap">
        <label htmlFor="maxCapacity">حداکثر ظرفیت</label>
        <input
          type="number"
          id="maxCapacity"
          // {...register("maxCapacity", {
          //   validate: (value) =>
          //     value > 0
          // })}
          className="addinput-field"
          value={newEditEvent.maxCapacity}
          onChange={(e) => handleEditEvetnChange("maxCapacity", parseInt(e.target.value, 10))}

        />
        {errors.maxCapacity && <p className="erroradd">{errors.maxCapacity.message}</p>}

        </div>


          <div className="event-price">
          <label htmlFor="basePrice">حداقل قیمت</label>
        <input
          type="number"
          id="basePrice"
          value={newEditEvent.basePrice}
          // {...register("basePrice", { required: "حداقل قیمت ظرفیت الزامی است" })}
          className="addinput-field"
          onChange={(e) => handleEditEvetnChange("basePrice", parseInt(e.target.value, 10))}

        />
        {errors.basePrice && <p className="erroradd">{errors.basePrice.message}</p>}

          </div>


          <div className="event-type">
          <label className="Labeladd" htmlFor="venueType">نوع رویداد</label>
        <select
          id="venueType"
          // {...register("venueType", { required: "نوع رویداد الزامی است" })}
          value={eventType}
          // onChange={handleEventTypeChange}
          onChange={(e) => {
           // setEventType(e.target.value);
            handleEventTypeChange(e); 
            handleEditEvetnChange("venueType", e.target.value)// make sure to also update form state if needed
          }}
          className="addinput-field"
          defaultValue={initialData?.venueType}
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
          value={newEditEvent.location}

          // {...register("location", { required: "لینک وبینار الزامی است" })}
          className="addinput-field"
          onChange={(e) => handleEditEvetnChange("location", e.target.value)}

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
          value={newEditEvent.location}
          onChange={(e) => handleEditEvetnChange("location", e.target.value)}

          // {...register("location", { required: "آدرس الزامی است" })}
          className="addinput-field"
        />
        {errors.location && <p className="erroradd">{errors.location.message}</p>}
      </>
    )}

          </div>



    {/* بارگذاری بنر */}
    <div className="event-banner">
      <label className="photoadd" htmlFor="banner">عکس خود را بارگذاری کنید</label>
      <input
        className="addinput-field"
        type="file"
        id="banner"
        accept="image/*"
        {...register("banner")}
        onChange={handleFileChange("banner")}

      />
      {errors.banner && <p className="erroradd">{errors.banner.message}</p>}
    </div>


<div className="buttonadd-container">
                  <button
          type="submit"
          className="submitadd"
        >
          ثبت
        </button>
        <button
          type="button"
          className="canceladd"
          onClick={() => navigate("/")} // مسیر مورد نظر خود را جایگزین کنید
        >
          لغو
        </button>
        </div>


      </form>
    </div>

  <div className="event-ticket-discount">
    {/* ticket list */}
    
    <div>
    <table className="ticket-table">
    <thead>
      <tr>
        <th>اسم بلیت</th>
        <th>توضیحات</th>
        <th>قیمت</th>
        <th>تعداد</th>
      </tr>
    </thead>
    <tbody>
      {initialTicket.length > 0 ? (
        initialTicket.map((ticket, index) => (
          <Link key={ticket.id || index} to={`/ticket/${ticket.id}`} className="ticket-link">
            <tr className="ticket-box">
              <td className="ticket-name">{ticket.name}</td>
              <td className="ticket-description">
                {ticket.description || 'توضیحات مربوط به بلیت: نبانتابهشاکخعابنضشاهعکاخ'}
              </td>
              <td className="ticket-price">{ticket.base_price || 0}</td>
              <td className="ticket-quantity">{ticket.quantity || 0}</td>
            </tr>
          </Link>
        ))
      ) : (
        <tr>
          <td colSpan="4">هیچ رویدادی موجود نیست.</td>
        </tr>
      )}
    </tbody>
  </table>
  {/* <table className="ticket-table">
    <thead>
      <tr>
        <th>اسم بلیت</th>
        <th>توضیحات</th>
        <th>قیمت</th>
        <th>تعداد</th>
      </tr>
    </thead>
    <tbody>
      <tr className="ticket-box">
        <td className="ticket-name">اسم بلیت</td>
        <td className="ticket-description">توضیحات مربوط به بلیت: نبانتابهشاکخعابنضشاهعکاخ</td>
        <td className="ticket-price">5000</td>
        <td className="ticket-quantity">5</td>
      </tr>
      <tr className="ticket-box">
        <td className="ticket-name">اسم بلیت</td>
        <td className="ticket-description">توضیحات مربوط به بلیت: نبانتابهشاکخعابنضشاهعکاخ</td>
        <td className="ticket-price">5000</td>
        <td className="ticket-quantity">5</td>
      </tr>
      <tr className="ticket-box">
        <td className="ticket-name">اسم بلیت</td>
        <td className="ticket-description">توضیحات مربوط به بلیت: نبانتابهشاکخعابنضشاهعکاخ</td>
        <td className="ticket-price">5000</td>
        <td className="ticket-quantity">5</td>
      </tr>
      <tr className="ticket-box">
        <td className="ticket-name">اسم بلیت</td>
        <td className="ticket-description">توضیحات مربوط به بلیت: نبانتابهشاکخعابنضشاهعکاخ</td>
        <td className="ticket-price">5000</td>
        <td className="ticket-quantity">5</td>
      </tr>
      <tr className="ticket-box">
        <td className="ticket-name">اسم بلیت</td>
        <td className="ticket-description">توضیحات مربوط به بلیت: نبانتابهشاکخعابنضشاهعکاخ</td>
        <td className="ticket-price">5000</td>
        <td className="ticket-quantity">5</td>
      </tr>
      <tr className="ticket-box">
        <td className="ticket-name">اسم بلیت</td>
        <td className="ticket-description">توضیحات مربوط به بلیت: نبانتابهشاکخعابنضشاهعکاخ</td>
        <td className="ticket-price">5000</td>
        <td className="ticket-quantity">5</td>
      </tr>
      <tr className="ticket-box">
        <td className="ticket-name">اسم بلیت</td>
        <td className="ticket-description">توضیحات مربوط به بلیت: نبانتابهشاکخعابنضشاهعکاخ</td>
        <td className="ticket-price">5000</td>
        <td className="ticket-quantity">5</td>
      </tr>
      <tr className="ticket-box">
        <td className="ticket-name">اسم بلیت</td>
        <td className="ticket-description">توضیحات مربوط به بلیت: نبانتابهشاکخعابنضشاهعکاخ</td>
        <td className="ticket-price">5000</td>
        <td className="ticket-quantity">5</td>
      </tr>
    </tbody>

  </table> */}
  <div>
    <button
          type="button"
          className="add-btn"
          onClick={() => navigate("/")} // مسیر مورد نظر خود را جایگزین کنید
        >
          افزودن بلیت
        </button>
    </div>
    </div>


  {/* discount list */}
<div className="my-list">

<table className="discount-table">
  <thead>
    <tr>
      <th>اسم تخفیف</th>
      <th>توضیحات مربوط به تخفیف</th>
      <th>قیمت</th>
      <th>تعداد</th>
    </tr>
  </thead>
  <tbody>
    <tr className="discount-box">
      <td className="discount-name">اسم تخفیف</td>
      <td className="discount-description">توضیحات مربوط به تخفیف: نبانتابهشاکخعابنضشاهعکاخ</td>
      <td className="discount-price">5000</td>
      <td className="discount-quantity">5</td>
    </tr>
    <tr className="discount-box">
      <td className="discount-name">اسم تخفیف</td>
      <td className="discount-description">توضیحات مربوط به تخفیف: نبانتابهشاکخعابنضشاهعکاخ</td>
      <td className="discount-price">5000</td>
      <td className="discount-quantity">5</td>
    </tr>
    <tr className="discount-box">
      <td className="discount-name">اسم تخفیف</td>
      <td className="discount-description">توضیحات مربوط به تخفیف: نبانتابهشاکخعابنضشاهعکاخ</td>
      <td className="discount-price">5000</td>
      <td className="discount-quantity">5</td>
    </tr>
  </tbody>
</table>

<div>
    <button
          type="button"
          className="add-btn"
          onClick={() => navigate("/")} // مسیر مورد نظر خود را جایگزین کنید
        >
          افزودن تخفیف 
        </button>
    </div>
</div>
</div>

</div>



  );
};

export default EditEvent;

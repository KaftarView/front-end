import React, { useEffect, useState } from "react";
import axios, { AxiosError, CanceledError } from "axios";
import './editEvent.css'
import { useForm } from "react-hook-form";
import { Link, useNavigate,useParams } from "react-router-dom";
import apiClient from '../../utils/apiClient'

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
  categories: string[];


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
    categories: [],

  
  });
  
//-----------------------done me


  const handleEventTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEventType(e.target.value);
  };
  const handleCategoryChange = (index: number, value: string) => {
    const updatedCategories = [...newEditEvent.categories];
    updatedCategories[index] = value;
    setNewEditEvent({ ...newEditEvent, categories: updatedCategories });
  };

  const handleEditEvetnChange = (
    field: keyof FormData,
    value: string | number| File| null
  ) => {
    setNewEditEvent({ ...newEditEvent, [field]: value });
  };

  console.log(newEditEvent);
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await apiClient.get("/v1/public/categories", {
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



  const onSubmit = async () =>
  {


    // newEditEvent.created_at= initialData?.created_at;

    console.log(newEditEvent.name);
    console.log(newEditEvent.description);
  console.log(newEditEvent.basePrice);
  console.log(newEditEvent.categories);
  console.log('Is roles an array?:', Array.isArray(newEditEvent.categories));  

  // newEditEvent.fromDate+=":00Z";
  
      const formData = new FormData();
      if (newEditEvent.name && newEditEvent.name !== initialData?.name) {
        formData.append("name", newEditEvent.name);
  
      }
  
  
      if (newEditEvent.fromDate && newEditEvent.fromDate !== initialData?.fromDate) {
        formData.append("fromDate", newEditEvent.fromDate);
        newEditEvent.fromDate+=":00Z";
      }
  
      if (newEditEvent.toDate && newEditEvent.toDate !== initialData?.toDate) {
        formData.append("toDate", newEditEvent.toDate);

        newEditEvent.toDate+=":00Z";
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
      const newCategories = newEditEvent.categories.filter(category => !initialData?.categories.includes(category));
      newCategories.forEach((cat) => {
        formData.append("category", cat.toString()); // Append each category as a separate entry
      });


      console.log('min capacity: '+typeof(newEditEvent.minCapacity));
      console.log('category: '+typeof(newEditEvent.categories));

      // console.log(typeof(formData.maxCapacity));


      // console.log(typeof(newCategories));
      console.log([...formData]);
     
    
    try {
      const res = await apiClient.put(
        `/v1/events/5`,
        formData,
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
        const response = await apiClient.get('/v1/public/events/5', {
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

          eventData.fromDate = trimTime(eventData.fromDate);
          eventData.toDate = trimTime(eventData.toDate);
          console.log("Formatted available_from:", eventData.fromDate);
          console.log("Formatted available_until:", eventData.toDate);
          setInitialData(eventData);
          setNewEditEvent(eventData)
          // Check if categories is a string or an array
          const cat = Array.isArray(eventData.categories)
            ? eventData.categories // If it's an array, use it as is
            : eventData.categories ? eventData.categories.split(",") : []; // Otherwise split it if it's a string
    
          setNewEditEvent({
            ...eventData,
            categories : cat
          });
         setEditEvents(eventData);
         setNewEditEvent(eventData);


          };
  
      } 
         catch (err) {  } 
        finally {  }
  } getEvent()},[params.id])


  const deleteCategory = (index: number) => {
    const updatedCategories = newEditEvent.categories.filter((_, i) => i !== index);
    setNewEditEvent({ ...newEditEvent, categories: updatedCategories });
  };





//-----------------------------FETCHING DISCOUNT






  // const handleTicketChange = (field: keyof Ed, value: string | File | null) => {
  //   setnewedit({ ...newedit, [field]: value });
  // };

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files) {
  //     const file = event.target.files[0];
  //     handleTicketChange("banner", file); // Update the banner with the selected file
  //   }
  // };

  const addCategory = () => {
    setNewEditEvent({ ...newEditEvent, categories: [...newEditEvent.categories, ""] });
  };



  return (
      <div className="edit-event">
  {/* main edit form */}
<div className="eventedit">
<h3 className="infoadd">مشخصات رویداد</h3>

      <form className="eventedit-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="event-name">
        <label htmlFor="name">نام رویداد</label>
        <input
          id="name"
          // {...register("name")}
          className="addinput-field-edit-evnet "
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
          className="addinput-field-edit-evnet"
          value={newEditEvent.status}
          onChange={(e) => handleEditEvetnChange("status", e.target.value)}
        >
          <option value="">انتخاب کنید</option>
          <option value="Published">درحال اجرا</option>
          <option value="completed">اجرا شده</option>
          <option value="draft">پیش نویس</option>
        </select>
        {errors.status && <p className="erroradd">{errors.status.message}</p>}

        </div>

        <div className="event-category">
        <label className="Labeladd" htmlFor="categories">موضوعات</label>
          {newEditEvent.categories.map((category, index) => (
            <div key={index} className="writer-field">
              <input
                type="text"
                value={category}
                onChange={(e) => handleCategoryChange(index, e.target.value)}
                className="addinput-field-edit-evnet"
                required
              />
<button type="button" className="remove-writer" onClick={() => deleteCategory(index)}>
                حذف
              </button>
            </div>
          ))}
          <div className="buttonadd-container">
            <button type="button" onClick={addCategory} className="submittik">
              افزودن
            </button>
          </div>

        </div>
        
        <div className="event-description">
        <label htmlFor="description">توضیحات</label>
        <input
        type="text"
          id="description"
          
          // {...register("description")}
          className="addinput-field-edit-evnet"

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
          className="addinput-field-edit-evnet"
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
          className="addinput-field-edit-evnet"
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
          className="addinput-field-edit-evnet"
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
          className="addinput-field-edit-evnet"
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
          className="addinput-field-edit-evnet"
          onChange={(e) => handleEditEvetnChange("basePrice", parseInt(e.target.value, 10))}

        />
        {errors.basePrice && <p className="erroradd">{errors.basePrice.message}</p>}

          </div>


          <div className="event-type">
          <label className="Labeladd" htmlFor="venueType">نوع رویداد</label>
        <select
          id="venueType"
          // {...register("venueType", { required: "نوع رویداد الزامی است" })}
          value={newEditEvent.venueType}
          // onChange={handleEventTypeChange}
          onChange={(e) => {
           // setEventType(e.target.value);
            handleEventTypeChange(e); 
            handleEditEvetnChange("venueType", e.target.value)// make sure to also update form state if needed
          }}
          className="addinput-field-edit-evnet"
          defaultValue={newEditEvent?.venueType}
        >
          <option value="">انتخاب کنید</option>
          <option value="Online">آنلاین</option>
          <option value="Physical">حضوری</option>
        </select>
        {errors.venueType && <p className="erroradd">{errors.venueType.message}</p>}


    {/* لینک یا آدرس */}
    {eventType === "Online" && (
      <>
        <label className="Labeladd" htmlFor="location">لینک وبینار</label>
        <input
          type="text"
          id="location"
          value={newEditEvent.location}

          // {...register("location", { required: "لینک وبینار الزامی است" })}
          className="addinput-field-edit-evnet"
          onChange={(e) => handleEditEvetnChange("location", e.target.value)}

        />
        {errors.location && <p className="erroradd">{errors.location.message}</p>}
      </>
    )}

    {eventType === "Physical" && (
      <>
        <label className="Labeladd" htmlFor="location">آدرس محل برگزاری</label>
        <input
          type="text"
          id="location"
          value={newEditEvent.location}
          onChange={(e) => handleEditEvetnChange("location", e.target.value)}

          // {...register("location", { required: "آدرس الزامی است" })}
          className="addinput-field-edit-evnet"
        />
        {errors.location && <p className="erroradd">{errors.location.message}</p>}
      </>
    )}

          </div>



    {/* بارگذاری بنر */}
    <label className="Labeladd" htmlFor="banner">محل بارگزاری عکس</label>
          <div className="L1">
            <input
              type="file"
              id="banner"
              accept="image/*"
              // onChange={handleFileChange} // Handle the file change
            />
            {typeof newEditEvent.banner === "string" && newEditEvent.banner && (
              <div>
                <img
                  src={newEditEvent.banner}
                  alt="Current banner"
                  style={{ width: "100px", height: "100px" }}
                />
                <p>تصویر فعلی</p>
              </div>
            )}
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

</div>



  );
};

export default EditEvent;

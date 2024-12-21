// import React, { useState } from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import apiClient from "../../utils/apiClient";
// import "./AddNashriye.css";

// interface FormData {
//   name: string;
//   description: string;
//   // writers: { name: string }[];
//   // date: string;
//   file: FileList;
//   banner: FileList;
// }

// const AddNashriye: React.FC = () => {
//   const [NashriyeType, setNashriyeType] = useState<string>("");
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors, isValid },
//   } = useForm<FormData>({
//     mode: "onChange",
//   });

//   // const { fields, append, remove } = useFieldArray({
//   //   control,
//   //   // name: "writers",
//   // });

//   const handleNashriyeTypeChange = (e: React.ChangeNashriye<HTMLSelectElement>) => {
//     setNashriyeType(e.target.value);
//   };

//   const onSubmit = async (data: FormData) => {
//     const formData = new FormData();

//     console.log(data.file[0]);
//     console.log(data.description);
//     // console.log(data.date + ":00Z");
//     console.log(data.name);
//     // console.log(data.writers);

//     // Populate FormData
//     formData.append("name", data.name);
//     formData.append("description", data.description);
//     // formData.append("fromDate", data.fromDate + ":00Z");

//     // Append writers as JSON string
//     // formData.append("writers", JSON.stringify(data.writers.map((writer) => writer.name)));

//     if (data.file && data.file[0]) {
//       formData.append("file", data.file[0]);
//     }

//     if (data.banner && data.banner[0]) {
//       formData.append("banner", data.banner[0]);
//     }
//     console.log([...formData]);

//     try {
//       const response = await apiClient.post("/v1/journal", {
//         headers: {
//           "ngrok-skip-browser-warning": "69420",
//           "Content-Type": "application/json",
//         },
//       });
//       console.log(response);
//       const NashriyeId = response.data.data;
//       console.log("Nashriye created successfully. Nashriye ID:", NashriyeId);
//       navigate(`/Tikets/${NashriyeId}`);
//     } catch (error) {
//       console.error("Error creating Nashriye:", error);
//     }
//   };

//   return (
//     <html id="eeee">
//     <div className="Nashriyeadd">
//       <form
//         className="Nashriyeadd-form"
//         encType="multipart/form-data"
//         onSubmit={handleSubmit(onSubmit)}
//       >
//         <h3 className="infoadd">مشخصات نشریه</h3>

//         {/* name */}
//         <label className="Labeladd" htmlFor="name">عنوان نشریه</label>
//         <input
//           type="text"
//           id="name"
//           {...register("name", { required: "عنوان نشریه رویداد الزامی است" })}
//           className="addinput-field"
//         />
//         {errors.name && <p className="erroradd">{errors.name.message}</p>}

//         {/* description */}
//         <label className="Labeladd" htmlFor="description">توضیحات</label>
//         <textarea
//           id="description"
//           {...register("description", { required: "توضیحات الزامی است" })}
//           className="addinput-field textarea-field"
//         />
//         {errors.description && <p className="erroradd">{errors.description.message}</p>}

//         {/* Start Date */}
//         {/* <label className="Labeladd" htmlFor="date">تاریخ انتشار</label>
//         <input
//           type="datetime-local"
//           id="fromDate"
//           {...register("date", { required: "تاریخ انتشار الزامی است" })}
//           className="addinput-field"
//         />
//         {errors.date && <p className="erroradd">{errors.date.message}</p>} */}

//         {/* Writers */}
//         {/* <label className="Labeladd">نام نویسندگان</label>
//         <div>
//           {fields.map((field, index) => (
//             <div key={field.id} className="writer-field">
//               <input
//                 type="text"
//                 {...register(`writers.${index}.name`, { required: "نام نویسنده الزامی است" })}
//                 placeholder="نام نویسنده"
//                 className="addinput-field"
//               />

//               <button
//                 type="button"
//                 className="remove-writer"
//                 onClick={() => remove(index)}
//               >
//                 حذف
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             className="add-writer"
//             onClick={() => append({ name: "" })}
//           >
//             اضافه کردن نویسنده
//           </button>
//         </div> */}
//         {/* {errors.writers && <p className="erroradd">{errors.writers.message}</p>} */}
//         <label className="Labeladd" htmlFor="banner">محل بارگزاری عکس</label>
//           <div className="L1">
//             <input
//               type="file"
//               id="banner"
//               accept="image/*"
//               {...register("banner", { required: "بارگذاری عکس الزامی است" })}
//             />
//             {errors.banner && <p className="erroradd">{errors.banner.message}</p>}
//           </div>
//         {/* Upload File */}
//         <label className="Labeladd" htmlFor="file">محل بارگزاری فایل PDF</label>
//         <div className="L1">
//           <input
//             type="file"
//             id="file"
//             accept="application/pdf"
//             {...register("file", {
//               required: "بارگذاری فایل PDF الزامی است",
//               validate: (value) => {
//                 if (!value || value.length === 0) return "بارگذاری فایل الزامی است";
//                 const file = value[0];
//                 if (file.type !== "application/pdf") return "فقط فایل‌های PDF مجاز هستند";
//                 return true;
//               },
//             })}
//           />
//           {errors.file && <p className="erroradd">{errors.file.message}</p>}
//         </div>

//         {/* Buttons */}
//         <div className="buttonadd-container">
//           <button
//             type="submit"
//             disabled={!isValid}
//             className={`submitadd ${!isValid ? "submit-disabled" : ""}`}
//           >
//             ثبت
//           </button>
//           <button
//             type="button"
//             className="canceladd"
//             onClick={() => navigate("/Nashriyes")}
//           >
//             لغو
//           </button>
//         </div>
//       </form>
//     </div>
//     </html>
//   );
// };

// export default AddNashriye;


import React, { useEffect, useState } from "react";
import "./AddNashriye.css";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../utils/apiClient";
import axios, { CanceledError } from "axios";

interface Nashriye {
  name: string;
  description: string;
  // writers: { name: string }[];
  // date: string;
  file: File;
  banner: File;
}

const Nashriye = () => {
  const { NashriyeId } = useParams<{ NashriyeId: string }>();
  const [Nashriyes, setNashriyes] = useState<Nashriye[]>([]);
  const [newNashriye, setNewNashriye] = useState<Nashriye>({
    name: "",
    description: "",
    file: {} as File,
    banner: {} as File, // Empty FileList object

  });
  const [NashriyeType, setNashriyeType] = useState<string>(""); // Added state for NashriyeType
  const [errors, setErrors] = useState<Partial<Record<keyof Nashriye, string>>>( {});
  const navigate = useNavigate();
  const handleNashriyeChange = (field: keyof Nashriye, value: string[] |string | number | File) => {
    setNewNashriye({ ...newNashriye, [field]: value });
    setErrors({ ...errors, [field]: "" });
// Clear error for this field
  };

  const validateFields = (): boolean => {
    const newErrors: Partial<Record<keyof Nashriye, string>> = {};

    if (!newNashriye.name.trim()) newErrors.name = "نام الزامی است";
    if (!newNashriye.description.trim()) newErrors.description = "توضیحات الزامی است";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };


  const onSubmit = async () => {
    if (!validateFields()) return;
  


  
    const formData = new FormData();
    formData.append("name", newNashriye.name);
    formData.append("description", newNashriye.description);


    if (newNashriye.banner) formData.append("banner", newNashriye.banner);
    if (newNashriye.file) formData.append("file", newNashriye.file);

  
    console.log([...formData]);
  
    try {
      const res = await apiClient.post("/v1/journal", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      console.log(res);
      const NashriyeId = res.data.data;
      console.log("Nashriye created successfully. Nashriye ID:", NashriyeId);
  
      // Navigate to the Nashriye details page
      navigate(`/nashriye`);
    } catch (err) {
      console.error("Error creating Nashriye:", err);
    }
  };
  
  const resetForm = () => {
    setNewNashriye({
      name: "",
      description: "",

      banner: {} as File,
      file: {} as File,

    });
    setNashriyeType("");
  };
  const handleNextPage = () => {
    navigate(`/Discount/${NashriyeId}`);
  };
  return (
    <html id="eeee">
    <div className="eventtik">
      <form className="event-formtik" encType="multipart/form-data">
        <h3 className="infotik">مشخصات نشریه</h3>

        <label className="Labeladd" htmlFor="name">
          عنوان نشریه
        </label>
        <input
          type="text"
          id="name"
          value={newNashriye.name}
          onChange={(e) => handleNashriyeChange("name", e.target.value)}
          className={`addinput-field ${errors.name ? "error-field" : ""}`}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}



        
         <label className="Labeladd" htmlFor="description">توضیحات</label>
         <textarea
           id="description"
           onChange={(e) => handleNashriyeChange("description", e.target.value)}
          className={`addinput-field textarea-field ${errors.description ? "error-field" : ""}`}

         />
         {errors.description && <span className="error-message">{errors.description}</span>}


         <label className="Labeladd" htmlFor="file">محل بارگزاری فایل</label>
    {/* بارگذاری بنر */}
    <div className="L1" >
      
        <input
          type="file"
          id="file"
          accept="application/pdf"
          onChange={(e) => {
            const file = e.target.files?.[0]; // Get the first selected file
            if (file) {
              handleNashriyeChange("file", file);
            }
          }}
          className={`a ${errors.banner ? "error-field" : ""}`}
        />
</div>

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
              handleNashriyeChange("banner", file);
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
        onClick={() => navigate("/Nashriyes")}
      >
        لغو
      </button>
        </div>
      </form>
    </div>
    </html>
  );
};

export default Nashriye;

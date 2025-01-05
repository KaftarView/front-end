import React, { useEffect, useState } from "react";
import "./addMembers.css";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../utils/apiClient";
import axios, { CanceledError } from "axios";

interface Members {
  firstName: string;
  lastName:string;
  description:string;
  promotedYear:number;
  enteringYear:number;
  email: string;
  profile: File ;

}

const Members = () => {

  const [newMembers, setNewMembers] = useState<Members>({
    firstName: "",
    lastName:"",
    description:"",
    promotedYear:0,
    enteringYear:0,
    email: "",
    profile: {} as File ,
  });
  const [MembersType, setMembersType] = useState<string>(""); 
  const [errors, setErrors] = useState<Partial<Record<keyof Members, string>>>( {});

  const navigate = useNavigate();

  const handleMembersChange = (field: keyof Members, value: string[] |string | number | File) => {
    setNewMembers({ ...newMembers, [field]: value });
    setErrors({ ...errors, [field]: "" });

  };



  const validateFields = (): boolean => {
    const newErrors: Partial<Record<keyof Members, string>> = {};
    
    
    if (!newMembers.firstName.trim()) newErrors.firstName = "نام الزامی است";
    if (!newMembers.lastName.trim()) newErrors.lastName = "نام خانوادگی الزامی است";
    if (!newMembers.description.trim()) newErrors.description = "توضیحات الزامی است";
    if (newMembers.enteringYear <= 97) newErrors.enteringYear = "ترم ورودی  باید بزرگتر از 97 باشد";
    if (newMembers.promotedYear <= 97)
      newErrors.promotedYear = "سال عضویت  باید بزرگتر از 97 باشد";

    if (!newMembers.email.trim()) newErrors.email = "ایمیل الزامی است";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newMembers.email))
      newErrors.email = "فرمت ایمیل نامعتبر است";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };


  const onSubmit = async () => {
    if (!validateFields()) return;

    const formData = new FormData();
    formData.append("firstName", newMembers.firstName);
    formData.append("lastName", newMembers.lastName);
    formData.append("description", newMembers.description);
    formData.append("promotedYear", newMembers.promotedYear.toString());
    formData.append("enteringYear", newMembers.enteringYear.toString());
    formData.append("email", newMembers.email);

  
    if (newMembers.profile) formData.append("profile", newMembers.profile);
  
    console.log([...formData]);
  
    try {
      const res = await apiClient.post("/v1/admin/councilors", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      console.log(res);
    
      const MembersId = res.data.data; 
      console.log("Members created successfully");
      alert("عضو جدید با موفقیت اضافه شد");
      navigate(`/members`);
     } catch (err) {
      console.error("Error creating Members:", err);
    
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
            alert(err.response.data.message);
          } else {
            alert( err.response.data.message);
          }
        } else {
          console.error("No response from server:", err.request);
          alert("No response from server. Please try again later.");
        }
      } 
    }
  };
  

  return (
    <html id="eventa">
    <div className="addevent">
      <form className="addevent-form" encType="multipart/form-data">
        <h3 className="infoevent">مشخصات عضو</h3>

        <label className="Labeladdevent" htmlFor="firstName">
          نام
        </label>
        <input
          type="text"
          id="firstName"
          value={newMembers.firstName}
          onChange={(e) => handleMembersChange("firstName", e.target.value)}
          className={`addinput-fieldevent ${errors.firstName ? "error-field" : ""}`}
        />
        {errors.firstName && <span className="error-messageevent">{errors.firstName}</span>}
        
        <label className="Labeladdevent" htmlFor="lastName">
           نام خانوادگی
        </label>
        <input
          type="text"
          id="lastName"
          value={newMembers.lastName}
          onChange={(e) => handleMembersChange("lastName", e.target.value)}
          className={`addinput-fieldevent ${errors.lastName ? "error-field" : ""}`}
        />
        {errors.lastName && <span className="error-messageevent">{errors.lastName}</span>}

        <label className="Labeladdevent" htmlFor="email">
           ایمیل
        </label>
        <input
          type="text"
          id="email"
          value={newMembers.email}
          onChange={(e) => handleMembersChange("email", e.target.value)}
          className={`addinput-fieldevent ${errors.email ? "error-field" : ""}`}
        />
        {errors.email && <span className="error-messageevent">{errors.email}</span>}




         <label className="Labeladdevent" htmlFor="promotedYear">سال عضویت</label>
         <input
           type="number"
           id="promotedYear"
           onChange={(e) => handleMembersChange("promotedYear", e.target.value)}
          className={`addinput-fieldevent  ${errors.promotedYear ? "error-field" : ""}`}
         />
         {errors.promotedYear && <span className="error-messageevent">{errors.promotedYear}</span>}


         <label className="Labeladdevent" htmlFor="description">توضیحات</label>
         <textarea
           id="description"
           onChange={(e) => handleMembersChange("description", e.target.value)}
          className={`addinput-fieldevent textarea-fieldevent ${errors.description ? "error-field" : ""}`}

         />
         {errors.description && <span className="error-messageevent">{errors.description}</span>}


         <label className="Labeladdevent" htmlFor="enteringYear">ترم ورودی </label>
         <input
           type="number"
           id="enteringYear"
           onChange={(e) => handleMembersChange("enteringYear", e.target.value)}
          className={`addinput-fieldevent ${errors.enteringYear ? "error-field" : ""}`}
         />
         {errors.enteringYear && <span className="error-messageevent">{errors.enteringYear}</span>}


<label className="Labeladdevent" htmlFor="profile">محل بارگزاری عکس</label>

    <div className="L1event" >
      
        <input
          type="file"
          id="profile"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]; 
            if (file) {
              handleMembersChange("profile", file);
            }
          }}
          className={`a ${errors.profile ? "error-messageevent" : ""}`}
        />

</div>

        <div className="buttonadd-containerevent">
          <button type="button" onClick={onSubmit} className="submitaddevent">
            ثبت
          </button>
          <button
        type="button"
        className="cancelevent"
        onClick={() => navigate("/Members")}
      >
        لغو
      </button>
        </div>
      </form>
    </div>
    </html>
  );
};

export default Members;



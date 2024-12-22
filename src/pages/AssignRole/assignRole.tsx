import React, { useEffect, useState } from 'react';
import axios, { CanceledError } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './assignRole.css';
import apiClient from '../../utils/apiClient';

interface FormData {
  email: string;
  roles: string[]; // Array of roles selected by the user
}

interface Role {
  id: number;
  created_at: string;
  type: string;
  permissions: object; // Adjust according to the actual structure of the permissions
}
 
const RoleManagement = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [customCategory, setCustomCategory] = useState<string>("");
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const navigate = useNavigate();
//   const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
//     mode: "onChange",
//   });
const { register, handleSubmit, formState: { errors, isValid }, setValue, watch } = useForm<FormData>({  
    mode: "onChange",  
  }); 
  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await apiClient.get("/v1/roles", {
          headers: {
            "ngrok-skip-browser-warning": "69420",
            'Content-Type': 'application/json',
          },
        });
        const roleTypes = response.data.data.map((role: Role) => role.type);
        setCategories(roleTypes); // Set categories to state
      } catch (error) {
        if (error instanceof CanceledError) return;
        console.error("Error fetching categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle form submission
  const handleAddUser = async (data: FormData) => {
    // const selectedRoles = isCustomCategory ? [customCategory] : data.roles; // Ensure roles is an array
console.log(data.email);
console.log(data.roles);
const rolesArray = Array.isArray(data.roles)   
? data.roles   
: [data.roles]; 
    const requestData = {
      email: data.email,
      roles: rolesArray, // Roles should be an array
    };
    console.log('Is roles an array?:', Array.isArray(data.roles));  
    console.log('Is roles an array?:', Array.isArray(rolesArray));  

    try {
      const response = await apiClient.post(
        '/v1/users/roles',
        requestData,
        {
          withCredentials: true,
          headers: {
            // "ngrok-skip-browser-warning": "69420",
            'Content-Type': 'application/json', // Use JSON for sending the request
          },
        }
      );
      console.log('Role assigned successfully:', response.data.data);
      navigate('#'); // Redirect after successful submission
    } catch (error) {
      if (error instanceof CanceledError) return;
      console.error('Error assigning role:', error);
    }
  };

  // Handle category change (selecting a custom category)
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "other") {
      setIsCustomCategory(true);
    } else {
      setIsCustomCategory(false);
    }
  };

  return (
<html id="e">
    <div className='upload-container-assign-roll'>
      <form  className='assign-roll-form' onSubmit={handleSubmit(handleAddUser)}>
        <div>
          <label className="Labeladd"  htmlFor="email">ایمیل</label>
          <input
            type="string"
            id="email"
            className='addinput-field'
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label className="Labeladd" htmlFor="roles">نقش رویداد</label>
          <select
            id="roles"
            {...register("roles", { required: "موضوع رویداد الزامی است" })}
            onChange={handleCategoryChange}
            className="custom-dropdown"
            multiple={false} // Ensure it's not multi-select if that's the requirement
          >
            <option value="">انتخاب کنید</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.roles && <p className="erroradd">{errors.roles.message}</p>}

          {/* Input for custom category */}
          {isCustomCategory && (
            <>
              <label className="Labeladd" htmlFor="customCategory">نقش دلخواه</label>
              <input
                type="string"
                id="customCategory"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                className="addinput-field"
              />
            </>
          )}
        </div>
        <button onClick={()=>navigate("#")}
                    disabled={!isValid}
                    className={`submit-episod ${!isValid ? "submit-disabled" : ""}`}
            >تخصیص نقش</button>

      </form>
    </div>
    </html>
  );
};

export default RoleManagement;

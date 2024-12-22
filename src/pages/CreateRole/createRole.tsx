import React, { useEffect, useState } from 'react';
import axios, { CanceledError } from 'axios';
import { useForm } from 'react-hook-form';
import './CreateRole.css';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../utils/apiClient';

interface FormData {
  role: string;
  permissions: string[];
}
interface permissiond {  
  id: number;  
  name: string;  
  description: string;  
}  

const CreateRole = () => {
  const [permissions, setPermissions] = useState<string[]>([]);
  const [loadingPermissions, setLoadingPermissions] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isValid }, watch } = useForm<FormData>({
    mode: 'onChange',  defaultValues: {
      permissions: [],  // Ensure it's initialized as an empty array
    },
  });

  // Fetch available permissions from the server
  useEffect(() => {
    const fetchPermissions = async () => {
      setLoadingPermissions(true);
      try {
        const response = await apiClient.get('/v1/permissions', {
          headers: {
            'ngrok-skip-browser-warning': '69420',
            'Content-Type': 'application/json',
          },
        });
        console.log(response.data.data); 
        const roleTypes = response.data.data.map((role: permissiond) => role.name);

        setPermissions(roleTypes); // Assuming response.data is an array of permissions
      } catch (error) {
        console.error('Error fetching permissions:', error);
      } finally {
        setLoadingPermissions(false);
      }
    };
    fetchPermissions();
  }, []);

  // Handle form submission
  const handleCreateRole = async (data: FormData) => {
    // const formData = new FormData();
    console.log('Is roles an array?:', Array.isArray(data.permissions));  

//     const permissionArray = Array.isArray(data.permissions)   
// ? data.permissions   
// : [data.permissions]; 


    const requestData = {
      role: data.role,
      permissions: data.permissions, // sending as an array, not as a comma-separated string
    };
    // console.log('Is roles an array?:', Array.isArray(data.permissions));  
    // console.log('Is roles an array?:', Array.isArray(permissionArray));  

    // formData.append('role', data.role);
    // formData.append('permissions', selectedPermissions.toString()); // Append selected permissions

    try {
      const response = await apiClient.post('/v1/roles', requestData, {
        withCredentials: true,
        headers: {
        //   'ngrok-skip-browser-warning': '69420',
          'Content-Type': 'application/json',
          
        },
      });
      console.log('User created successfully:', response.data.data);
    } catch (error) {
      if (error instanceof CanceledError) return;
      console.error('Error creating user:', error);
    }
  };

  // Watch permissions field to handle selection
  const selectedPermissions = watch('permissions') || [];

  return (
    <html id="e">
    <div className='upload-container-create-roll'>
      <form
      className='create-roll-form'
       onSubmit={handleSubmit(handleCreateRole)}>
        <div>
          <label className='Labeladd' htmlFor="role">نقش ها</label>
          <input
            type="string"
            id="role"
            className='addinput-field'
            {...register('role', { required: 'نام نقش الزامی است"' })}
          />
          {errors.role && <p>{errors.role.message}</p>}
        </div>

        <div>
          <label className='Labeladd' htmlFor="permissions"> نوع دسترسی را انتخاب کنید</label>
          <div>
            {permissions.map((permission) => (
              <div key={permission}>
                <input
                  type="checkbox"
                  id={permission}
                  value={permission}
                  className='addinput-field-check'
                  {...register("permissions", { required: "انتخاب نوع دسترسی الزامی است" })}
                />
                <label className='checkbox-label' htmlFor={permission}>{permission}</label>
              </div>
            ))}
          </div>
          {errors.permissions && <p>{errors.permissions.message}</p>}
        </div>

        <button onClick={()=>navigate("#")}
                    disabled={!isValid}
                    className={`submit-episod ${!isValid ? "submit-disabled" : ""}`}
            > ایجاد نقش جدید </button>      </form>
    </div>
    </html>
  );
};

export default CreateRole;

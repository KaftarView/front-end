// // import React, { useEffect, useState } from 'react';
// // import axios, { CanceledError } from 'axios';
// // import { useForm } from 'react-hook-form';
// // import './CreateRole.css';
// // import { useNavigate } from 'react-router-dom';
// // import apiClient from '../../utils/apiClient';

// // interface FormData {
// //   role: string;
// //   permissions: string[];
// // }
// // interface permissiond {  
// //   id: number;  
// //   name: string;  
// //   description: string;  
// // }  

// // const CreateRole = () => {
// //   const [permissions, setPermissions] = useState<string[]>([]);
// //   const [loadingPermissions, setLoadingPermissions] = useState(false);
// //   const navigate = useNavigate();
// //   const { register, handleSubmit, formState: { errors, isValid }, watch } = useForm<FormData>({
// //     mode: 'onChange',  defaultValues: {
// //       permissions: [],  // Ensure it's initialized as an empty array
// //     },
// //   });

// //   // Fetch available permissions from the server
// //   useEffect(() => {
// //     const fetchPermissions = async () => {
// //       setLoadingPermissions(true);
// //       try {
// //         const response = await apiClient.get('/v1/permissions', {
// //           headers: {
// //             'ngrok-skip-browser-warning': '69420',
// //             'Content-Type': 'application/json',
// //           },
// //         });
// //         console.log(response.data.data); 
// //         const roleTypes = response.data.data.map((role: permissiond) => role.name);

// //         setPermissions(roleTypes); // Assuming response.data is an array of permissions
// //       } catch (error) {
// //         console.error('Error fetching permissions:', error);
// //       } finally {
// //         setLoadingPermissions(false);
// //       }
// //     };
// //     fetchPermissions();
// //   }, []);

// //   // Handle form submission
// //   const handleCreateRole = async (data: FormData) => {
// //     // const formData = new FormData();
// //     console.log('Is roles an array?:', Array.isArray(data.permissions));  

// // //     const permissionArray = Array.isArray(data.permissions)   
// // // ? data.permissions   
// // // : [data.permissions]; 


// //     const requestData = {
// //       role: data.role,
// //       permissions: data.permissions, // sending as an array, not as a comma-separated string
// //     };
// //     // console.log('Is roles an array?:', Array.isArray(data.permissions));  
// //     // console.log('Is roles an array?:', Array.isArray(permissionArray));  

// //     // formData.append('role', data.role);
// //     // formData.append('permissions', selectedPermissions.toString()); // Append selected permissions

// //     try {
// //       const response = await apiClient.post('/v1/roles', requestData, {
// //         withCredentials: true,
// //         headers: {
// //         //   'ngrok-skip-browser-warning': '69420',
// //           'Content-Type': 'application/json',
          
// //         },
// //       });
// //       console.log('User created successfully:', response.data.data);
// //     } catch (error) {
// //       if (error instanceof CanceledError) return;
// //       console.error('Error creating user:', error);
// //     }
// //   };

// //   // Watch permissions field to handle selection
// //   const selectedPermissions = watch('permissions') || [];

// //   return (
// //     <html id="e">
// //     <div className='upload-container-create-roll'>
// //       <form
// //       className='create-roll-form'
// //        onSubmit={handleSubmit(handleCreateRole)}>
// //         <div>
// //           <label className='Labeladd' htmlFor="role">نقش ها</label>
// //           <input
// //             type="string"
// //             id="role"
// //             className='addinput-field'
// //             {...register('role', { required: 'نام نقش الزامی است"' })}
// //           />
// //           {errors.role && <p>{errors.role.message}</p>}
// //         </div>

// //         <div>
// //           <label className='Labeladd' htmlFor="permissions"> نوع دسترسی را انتخاب کنید</label>
// //           <div>
// //             {permissions.map((permission) => (
// //               <div key={permission}>
// //                 <input
// //                   type="checkbox"
// //                   id={permission}
// //                   value={permission}
// //                   className='addinput-field-check'
// //                   {...register("permissions", { required: "انتخاب نوع دسترسی الزامی است" })}
// //                 />
// //                 <label className='checkbox-label' htmlFor={permission}>{permission}</label>
// //               </div>
// //             ))}
// //           </div>
// //           {errors.permissions && <p>{errors.permissions.message}</p>}
// //         </div>

// //         <button onClick={()=>navigate("#")}
// //                     disabled={!isValid}
// //                     className={`submit-episod ${!isValid ? "submit-disabled" : ""}`}
// //             > ایجاد نقش جدید </button>      </form>
// //     </div>
// //     </html>
// //   );
// // };

// // export default CreateRole;



// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import axios, { CanceledError } from "axios";
// import { useNavigate } from "react-router-dom";
// import apiClient from "../../utils/apiClient";
// import "./createRole.css"

// interface FormData {
//   role: string;
//   permissions: string[];
// }

// interface Permission {
//   id: number;
//   name: string;
//   description: string;
// }

// const CreateRole = () => {
//   const [permissions, setPermissions] = useState<Permission[]>([]);
//   const [isDropdownVisible, setIsDropdownVisible] = useState(false);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isValid },
//     watch,
//     setValue,
//   } = useForm<FormData>({
//     mode: "onChange",
//     defaultValues: {
//       permissions: [],
//     },
//   });
//   const navigate = useNavigate();
//   const [loadingPermissions, setLoadingPermissions] = useState(false);


//   // Mock data for permissions
//   // useEffect(() => {
//   //   setPermissions([
//   //     { id: 1, name: "View Dashboard", description: "Permission to view the dashboard" },
//   //     { id: 2, name: "Edit Settings", description: "Permission to edit application settings" },
//   //     { id: 3, name: "Manage Users", description: "Permission to manage user accounts" },
//   //     { id: 4, name: "Create Reports", description: "Permission to create reports" },
//   //     { id: 5, name: "View Logs", description: "Permission to view system logs" },
//   //   ]);
//   // }, []);




//   useEffect(() => {
//     const fetchPermissions = async () => {
//       setLoadingPermissions(true);
//       try {
//         const response = await apiClient.get('/v1/admin/permissions', {
//           headers: {
//             'ngrok-skip-browser-warning': '69420',
//             'Content-Type': 'application/json',
//           },
//         });
//         console.log(response.data.data); 
//         const roleTypes = response.data.data.map((role: Permission) => role.name);
//         console.log(roleTypes);

//         setPermissions(response.data.data); // Assuming response.data is an array of permissions
//       } catch (error) {
//         console.error('Error fetching permissions:', error);
//       } finally {
//         setLoadingPermissions(false);
//       }
//     };
//     fetchPermissions();
//   }, []);
//   // Watch the selected permissions


//   const handleCreateRole = async (data: FormData) => {
//     // const formData = new FormData();
//     console.log('Is roles an array?:', Array.isArray(data.permissions));  

// //     const permissionArray = Array.isArray(data.permissions)   
// // ? data.permissions   
// // : [data.permissions]; 


//     const requestData = {
//       role: data.role,
//       permissions: data.permissions, // sending as an array, not as a comma-separated string
//     };
//     // console.log('Is roles an array?:', Array.isArray(data.permissions));  
//     // console.log('Is roles an array?:', Array.isArray(permissionArray));  

//     // formData.append('role', data.role);
//     // formData.append('permissions', selectedPermissions.toString()); // Append selected permissions

//     try {
//       const response = await apiClient.post('/v1/admin/roles', requestData, {
//         withCredentials: true,
//         headers: {
//         //   'ngrok-skip-browser-warning': '69420',
//           'Content-Type': 'application/json',
          
//         },
//       });
//       console.log('User created successfully:', response.data.data);
//     } catch (error) {
//       if (error instanceof CanceledError) return;
//       console.error('Error creating user:', error);
//     }
//   };







//   const selectedPermissions = watch("permissions")||[];

//   // Handle dropdown toggle
//   const toggleDropdown = () => {
//     setIsDropdownVisible((prev) => !prev);
//   };

//   // Handle checkbox change
//   const handleCheckboxChange = (id: number) => {
//     const updatedPermissions = selectedPermissions.includes(id.toString())
//       ? selectedPermissions.filter((permId) => permId !== id.toString())
//       : [...selectedPermissions, id.toString()];

//     setValue("permissions", updatedPermissions, { shouldValidate: true });
//   };

//   // const handleFormSubmit = (data: FormData) => {
//   //   console.log("Submitted Data:", data);
//   // };

//   const getSelectLabel = () =>
//     selectedPermissions.length > 0
//       ? permissions
//           .filter((permission) => selectedPermissions.includes(permission.id.toString()))
//           .map((permission) => permission.name)
//           .join(", ")
//       : "Nothing is selected";

//   return (
//     <html id="e">
//     <div className="upload-container-create-roll">
//       <form onSubmit={handleSubmit(handleCreateRole)} className="create-roll-form">
//         <div>
//           <label htmlFor="role" className='Labeladd'>Role Name</label>
//           <input
//             type="text"
//             id="role"
//             className="addinput-field"
//             {...register("role", { required: "Role name is required" })}
//           />
//           {errors.role && <p>{errors.role.message}</p>}
//         </div>

//         <div>
//           <label htmlFor="permissions" className='Labeladd'>Permissions</label>
//           <div className="multiselect ">
//             <div className="selectBox" onClick={toggleDropdown}>
//               <span>{getSelectLabel()}</span>
//             </div>
//             {isDropdownVisible && (
//               <div className="dropdown-checkboxes">
//                 {permissions.map((permission) => (
//                   <label key={permission.id} className="checkbox-item">
//                     <input
//                       type="checkbox"
//                       value={permission.id}
//                        className='addinput-field'
//                       checked={selectedPermissions.includes(permission.id.toString())}
//                       onChange={() => handleCheckboxChange(permission.id)}
//                     />
//                     {permission.name}
//                   </label>
//                 ))}
//               </div>
//             )}
//           </div>
//           {errors.permissions && <p>{errors.permissions.message}</p>}
//         </div>

//         <button onClick={()=>navigate("#")}
//           type="submit"
//           disabled={!isValid }
//           className={`submit-episod ${
//             !isValid? "submit-disabled" : ""
//           }`}
//         >
//           Create New Role
//         </button>
//       </form>
//     </div>
//     </html>
//   );
// };

// export default CreateRole;






import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./createRole.css";
import apiClient from "../../utils/apiClient";

interface FormData {
  role: string;
  permissions: string[];
}

interface Permission {
  id: number;
  name: string;
  description: string;
}

const CreateRole = () => {
  // Using mock data for permissions
  // const [permissions] = useState<Permission[]>([
    // { id: 1, name: "View Dashboard", description: "Permission to view the dashboard" },
    // { id: 2, name: "Edit Settings", description: "Permission to edit application settings" },
    // { id: 3, name: "Manage Users", description: "Permission to manage user accounts" },
    // { id: 4, name: "Create Reports", description: "Permission to create reports" },
    // { id: 5, name: "View Logs", description: "Permission to view system logs" },
    // { id: 6, name: "View Editor", description: "Permission to view the dashboard" },
    // { id: 7, name: "Manage Settings", description: "Permission to edit application settings" },
    // { id: 8, name: "Manage Events", description: "Permission to manage user accounts" },
    // { id: 9, name: "Mangae Reports", description: "Permission to create reports" },
    // { id: 10, name: "Magnage Logs", description: "Permission to view system logs" },
  // ]);
const [permissions, setPermissions] = useState<Permission[]>([]);

  const [loadingPermissions, setLoadingPermissions] = useState(false);


  useEffect(() => {
    const fetchPermissions = async () => {
      setLoadingPermissions(true);
      try {
        const response = await apiClient.get('/v1/admin/permissions', {
          headers: {
            'ngrok-skip-browser-warning': '69420',
            'Content-Type': 'application/json',
          },
        });
        console.log(response.data.data); 
        const roleTypes = response.data.data.map((role: Permission) => role.name);
        console.log(roleTypes);

        setPermissions(response.data.data); // Assuming response.data is an array of permissions
      } catch (error) {
        console.error('Error fetching permissions:', error);
      } finally {
        setLoadingPermissions(false);
      }
    };
    fetchPermissions();
  }, []);



  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      permissions: [],
    },
  });
  const navigate = useNavigate();

  const handleCreateRole = async (data: FormData) => {
    const requestData = {
      role: data.role,
      permissions: data.permissions,
    };

    console.log("Request Data:", requestData);

    // Simulate API request
    try {
      console.log("Role created successfully!");
    } catch (error) {
      console.error("Error creating role:", error);
    }
  };

  const selectedPermissions = watch("permissions") || [];

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const handleCheckboxChange = (id: number) => {
    const updatedPermissions = selectedPermissions.includes(id.toString())
      ? selectedPermissions.filter((permId) => permId !== id.toString())
      : [...selectedPermissions, id.toString()];

    setValue("permissions", updatedPermissions, { shouldValidate: true });
  };

  const getSelectLabel = () =>
    selectedPermissions.length > 0
      ? permissions
          .filter((permission) => selectedPermissions.includes(permission.id.toString()))
          .map((permission) => permission.name)
          .join(", ")
      : "Nothing is selected";

  return (
    <html id="e">
      <div className="upload-container-create-roll">
        <form onSubmit={handleSubmit(handleCreateRole)} className="create-roll-form">
          <div>
            <label htmlFor="role" className="Labeladd">نام نقش</label>
            <input
              type="text"
              id="role"
              className="addinput-field-test"
              {...register("role", { required: "Role name is required" })}
            />
            {errors.role && <p>{errors.role.message}</p>}
          </div>

          <div>
            <label htmlFor="permissions" className="Labeladd">انتخاب نوع دسترسی ها</label>
            <div className="multiselect">
              <div className="selectBox" onClick={toggleDropdown}>
                <span>{getSelectLabel()}</span>
              </div>
              {isDropdownVisible && (
                <div className="dropdown-checkboxes">
                  {permissions.map((permission) => (
                    <label key={permission.id} className="checkbox-item">
                      <input
                        type="checkbox"
                        value={permission.id}
                        className="addinput-field-t"
                        checked={selectedPermissions.includes(permission.id.toString())}
                        onChange={() => handleCheckboxChange(permission.id)}
                      />
                      {permission.name}
                    </label>
                  ))}
                </div>
              )}
            </div>
            {errors.permissions && <p>{errors.permissions.message}</p>}
          </div>

          <button
            onClick={() => navigate("#")}
            type="submit"
            disabled={!isValid}
            className={`submit-episod ${
              !isValid ? "submit-disabled" : ""
            }`}
          >
            ایجاد نقش
          </button>
        </form>
      </div>
    </html>
  );
};

export default CreateRole;

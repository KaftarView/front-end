// import React from "react";
// import { FieldValues, useForm } from "react-hook-form";

// interface FormData {
//   username: string;
//   password: string;
// }

// const Login = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isValid },
//   } = useForm<FormData>({
//     mode: "onChange",
//   });

//   const onSubmit = (data: FieldValues) => {
//     console.log(data);
//     // Your form submission logic
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-white-100">
//       <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-right">ورود</h2>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 font-medium mb-2 text-right"
//               htmlFor="username"
//             >
//               نام کاربری
//             </label>
//             <input
//               type="text"
//               id="username"
//               className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
//               {...register("username", {
//                 required: "نام کاربری الزامی است",
//               })}
//             />
//             {errors.username && (
//               <p className="text-danger">{errors.username.message}</p>
//             )}
//           </div>
//           <div className="mb-6">
//             <label
//               className="block text-gray-700 font-medium mb-2 text-right"
//               htmlFor="password"
//             >
//               رمز
//             </label>
//             <input
//               type="password"
//               id="password"
//               className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
//               {...register("password", { required: "رمز الزامی است" })}
//             />
//             {errors.password && (
//               <p className="text-danger">{errors.password.message}</p>
//             )}
//           </div>
//           <button
//             disabled={!isValid} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200">
//             ورود
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

/////////////////////////////////////////////////////////

// import React from "react";
// import { FieldValues, useForm } from "react-hook-form";
// import "./Login.css" ;

// interface FormData {
//   username: string;
//   password: string;
// }

// const Login = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isValid },
//   } = useForm<FormData>({
//     mode: "onChange",
//   });

//   const onSubmit = (data: FieldValues) => {
//     console.log(data);
//     // Your form submission logic
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="flex flex-col md:flex-row bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
//         {/* Left side illustration (the desk with chair and plant) */}
//         <div className="hidden md:flex items-center justify-center w-1/2 p-4 bg-blue-50 rounded-lg">
//           {/* Placeholder for the illustration */}
//           <div className="relative">
//             {/* Example illustration for a table setup */}
//             <div
//               className="absolute top-0 left-0 w-48 h-48 bg-center bg-cover rounded-md"
//               style={{
//                 backgroundImage:
//                   "url('path-to-your-desk-and-chair-illustration')",
//               }}
//             ></div>
//           </div>
//         </div>

//         {/* Right side form */}
//         <div className="w-full md:w-1/2">
//           <h2 className="text-2xl font-bold mb-6 text-right">ورود</h2>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="mb-4">
//               <label
//                 className="block text-gray-700 font-medium mb-1 text-right"
//                 htmlFor="username"
//               >
//                 نام کاربری
//               </label>
//               <input
//                 type="text"
//                 id="username"
//                 className="w-3/4 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
//                 {...register("username", {
//                   required: "نام کاربری الزامی است",
//                 })}
//               />
//               {errors.username && (
//                 <p className="text-red-500 text-sm">
//                   {errors.username.message}
//                 </p>
//               )}
//             </div>
//             <div className="mb-6">
//               <label
//                 className="block text-gray-700 font-medium mb-2 text-right"
//                 htmlFor="password"
//               >
//                 رمز عبور
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 // className="w-3/4 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
//                 className="password-field"
//                 {...register("password", { required: "رمز عبور الزامی است" })}
//               />
//               {errors.password && (
//                 <p className="text-red-500 text-sm">
//                   {errors.password.message}
//                 </p>
//               )}
//             </div>
//             <button
//               disabled={!isValid}
//               type="submit"
//               className="w-3/4 bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-200"
//             >
//               ورود
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

/////////////////////////////////////
// import React from "react";
// import { useForm } from "react-hook-form";
// import PasswordField from "./PasswordField";
// import "./Login.css";

// interface FormData {
//   username: string;
//   password: string;
// }

// const Login: React.FC = () => {
//   const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({ mode: "onChange" });

//   const onSubmit = (data: FormData) => {
//     console.log(data);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="flex flex-col md:flex-row bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
//         <div className="hidden md:flex items-center justify-center w-1/2 p-4 bg-blue-50 rounded-lg">
//           {/* Image placeholder */}
//         </div>
//         <div className="w-full md:w-1/2">
//           <h2 className="text-2xl font-bold mb-6 text-right">ورود</h2>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="mb-4">
//               <label htmlFor="username" className="block text-gray-700 font-medium mb-1 text-right">
//                 نام کاربری
//               </label>
//               <input
//                 type="text"
//                 id="username"
//                 className="w-3/4 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
//                 {...register("username", { required: "نام کاربری الزامی است" })}
//               />
//               {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
//             </div>
//             <div className="mb-6">
//               <PasswordField />
//             </div>
//             <button
//               disabled={!isValid}
//               type="submit"
//               className="w-3/4 bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-200"
//             >
//               ورود
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
//////////////////////////////
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./Login.css";
import axios, { AxiosError, CanceledError } from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

interface FormData {
  username: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
  });

  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const obj = { username: data.username, password: data.password };
      console.log(obj.username);
      console.log(obj.password);
      const res = await axios.post(
        "https://6339-212-64-199-253.ngrok-free.app/v1/login",
        obj
      );
      console.log("LogedIn");
    } catch (err) {
      if (err instanceof CanceledError) return;
      console.log(err);
    }
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);   

  const handleShowPassword = () => {  
    setShowPassword(prev => !prev);  
  };  


  // const [error , setError]=useState('');

  // useEffect(()=>{

  //   const controller = new AbortController();

  //   axios.post<FormData>('https://jsonplaceholder.typicode.com/users' , {signal : controller.signal})
  //     .then(res => setUsers(res.data))
  //     .catch(err =>{
  //       if(err instanceof CanceledError) return ;
  //       setError(err.message);
  //     });

  //   return () => controller.abort();

  // } , [])

  return (
    <div className="Login">
      <div>
        <img className="img2" src="././public/pacman gif.gif" alt="My GIF" />
      </div>
      <h2 className="entry">ورود</h2>
      <form className="sign_form" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2 text-right"
            htmlFor="username"
          >
            نام کاربری
          </label>
          <div className="input-container">
          <input
            type="text"
            id="username"
            className="input-field"
            {...register("username", {
              required: "پرکردن این بخش الزامی است",
            })}
          />
          </div>
          {errors.username && (
            <p className="text-danger">{errors.username.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 font-medium mb-2 text-right"
            htmlFor="password"
          >
            رمز عبور
          </label>
          <div className="input-container">
          <input
            type={`${showPassword ? 'text' : 'password'}`} 
            id="password"
            className="input-field"
            {...register("password", { required: "پرکردن این بخش الزامی است" })}
          />
          <i onClick={handleShowPassword}   className={`fa fa-fw ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i> 
          </div>
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>

        {/* <h3 className="ّForget-Password">
          رمز خود را فراموش کرده اید؟{" "}
          <a className="Forget-Password1" href="https://snapp.ir/">
            فراموشی رمز{" "}
          </a>
        </h3> */}
        {/* <h3 className="log">
             <button
            type="button"
            className="log"
            onClick={() => navigate("/ForgetPassword")}
          >
            بازیابی رمز{" "}
          </button>
          رمز خود را فراموش کرده اید؟{" "}
        </h3> */}

        <h3 className="log">
        رمز خود را فراموش کرده اید؟
        <Link to="/ForgetPassword" className="log2">
          بازیابی رمز
        </Link>
        </h3>
        <button
          type="submit"
          disabled={!isValid}
          className={`submit ${!isValid ? "submit-disabled" : ""}`}
        >
          ثبت
        </button>
      </form>
    </div>
  );
};

export default Login;

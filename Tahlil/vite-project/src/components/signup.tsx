import React, { useState } from "react";
import { useForm  } from "react-hook-form";
import "./signup.css";
import axios, { CanceledError } from "axios";
import { useNavigate } from "react-router-dom"; 
import { Link } from "react-router-dom";
import { useAuth } from './AuthContext';

interface FormData {
  username: string;
  password: string;
  passwordagain: string;
  email: string;
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);  
  const [showPasswordAgain, setShowPasswordAgain] = useState<boolean>(false);  

  const handleShowPassword = () => {  
    setShowPassword(prev => !prev);  
  };  

  const handleShowPasswordAgain = () => {  
    setShowPasswordAgain(prev => !prev);  
  };  
  const navigate=useNavigate()
  const { allowAccess } = useAuth();

  const onSubmit = async (data: FormData) => {
    // allowAccess();

    // navigate('/otp2', { state: {  email: data.email} });

    try {
      const obj = {
        Username: data.username,
        Email: data.email,
        Password: data.password,
        ConfirmPassword: data.passwordagain,
      };
      console.log(data.email);

      // Sending a POST request to the registration API
      const res = await axios.post(
        "https://6339-212-64-199-253.ngrok-free.app/v1/register",
        obj
      );

      // If the response is successful, navigate to /otp
      if (res.status === 201) {
        console.log("Registration successful");
        allowAccess();

        navigate('/otp2', { state: {  email: data.email} });
      }
    } catch (err) {
      if (err instanceof CanceledError) return;
      console.log(err);
    }
  };


  return (
    <div className="signup">
      <div>
        <img className="img2" src="././public/pacman gif.gif" alt="My GIF" />
      </div>
      <h2 className="sign">ثبت نام</h2>
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
          <i  onClick={handleShowPassword} className={`fa fa-fw ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} ></i> 
          <i className="fa fa-question-circle" aria-hidden="true" ></i> 
          
          </div>
          
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>

        <div className="mb-8">
          <label
            className="block text-gray-700 font-medium mb-2 text-right"
            htmlFor="passwordagain"
          >
            تکرار رمز عبور
          </label>
          <div className="input-container">
          <input
            type={`${showPasswordAgain ? 'text' : 'password'}`} 
            id="passwordagain"
            className="input-field"
            {...register("passwordagain", {
              required: "پرکردن این بخش الزامی است",
            })}
          />
          <i onClick={handleShowPasswordAgain}   className={`fa fa-fw ${showPasswordAgain ? 'fa-eye-slash' : 'fa-eye'}`}></i> 
          </div>
          {errors.passwordagain && (
            <p className="text-danger">{errors.passwordagain.message}</p>
          )}
        </div>

        <div className="mb-7">
          <label
            className="block text-gray-700 font-medium mb-2 text-right"
            htmlFor="email"
          >
            ایمیل
          </label>
          <div className="input-container">
          <input
            type="email"
            id="email"
            className="input-field"
            {...register("email", { required: "پرکردن این بخش الزامی است" })}
          />
          </div>
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>
        <h3 className="log">
          عضو هستید؟
          <Link to="/Login" className="log2">
            ورود
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

export default SignUp;

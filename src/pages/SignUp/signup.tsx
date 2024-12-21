
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import "./signup.css";
import axios, { CanceledError } from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from '../../components/AuthContext';
import { useAppContext } from '../../components/AppContext';
import apiClient from  "../../utils/apiClient"

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
    setValue, // allows controlled inputs with useForm
  } = useForm<FormData>({
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);
  const [errMessage, setErrMessage] = useState<string | null>(null);
  const { backendUrl, setBackendUrl } = useAppContext();  
  const navigate = useNavigate();
  const { allowAccess } = useAuth();

  const title = 'پسورد شما باید : شامل حرف بزرگ انگلیسی, حرف کوچک انگلیسی, حداقل 8 کارکتر, عدد و یک کارکتر خاص مانند @ باشد';

  const handleShowPassword = () => setShowPassword((prev) => !prev);
  const handleShowPasswordAgain = () => setShowPasswordAgain((prev) => !prev);

  const onSubmit = async (data: FormData) => {

    //  allowAccess();

    // navigate('/otp2', { state: {  email: data.email} });
    if (data.password !== data.passwordagain) {
      setErrMessage('پسورد ها یکسان نیستند');
      return;
    }
    try {
      const payload = {
        Username: data.username,
        Email: data.email,
        Password: data.password,
        ConfirmPassword: data.passwordagain,
      };
      const res = await apiClient.post(
        '/v1/auth/register',
        payload
      );
      

      if (res.status === 201) {
        console.log("Registration successful");
        allowAccess();
        navigate('/otp2', { state: { email: data.email } });
      }
    } catch (err) {
      if (err instanceof CanceledError) return;
      if (axios.isAxiosError(err)) {
        setErrMessage('خطایی رخ داد. لطفا دوباره تلاش کنید.');
        console.error('Error submitting registration:', err.request.response);
      }
    }
  };

  return (
    <div className="signup">
      <div>
        <img className="img2" src="././public/pacman gif.gif" alt="My GIF" />
      </div>
      <h2 className="sign">ثبت نام</h2>
      <form className="sign_form" onSubmit={handleSubmit(onSubmit)}>
        {/* Username */}
        <div className="z">
          <label
            className="block text-gray-700 font-medium mb-2 text-right text-xl rounded w-30"
            htmlFor="username"
          >
            نام کاربری
          </label>
          <div className="input-container">
          <input
            type="text"
            id="username"
            // className="input-field"
            {...register("username", {
              required: "پرکردن این بخش الزامی است",
            })}
          />
          </div>
          {errors.username && (
            <p className="text-danger">{errors.username.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="z">
          <label
            className="block text-gray-700 font-medium mb-2 text-right text-xl"
            htmlFor="password"
          >
            رمز عبور
          </label>
          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              // className="input-field"
              {...register("password", { required: "پرکردن این بخش الزامی است" })}
            />
            <i
              onClick={handleShowPassword}
              className={`fa fa-fw ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
            ></i>
            <abbr data-title={title}>
              <i className="fa fa-question-circle" aria-hidden="true"></i>
            </abbr>
          </div>
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="z">
          <label
            className="block text-gray-700 font-medium mb-2 text-right text-xl"
            htmlFor="passwordagain"
          >
            تکرار رمز عبور
          </label>
          <div className="input-container">
            <input
              type={showPasswordAgain ? "text" : "password"}
              id="passwordagain"
              // className="input-field"
              {...register("passwordagain", {
                required: "پرکردن این بخش الزامی است",
              })}
            />
            <i
              onClick={handleShowPasswordAgain}
              className={`fa fa-fw ${
                showPasswordAgain ? "fa-eye-slash" : "fa-eye"
              }`}
            ></i>
          </div>
          {errors.passwordagain && (
            <p className="text-danger">{errors.passwordagain.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="z">
          <label
            className="block text-gray-700 font-medium mb-2 text-right text-xl"
            htmlFor="email"
          >
            ایمیل
          </label>
          <div className="input-container">

          <input
            type="email"
            id="email"
            // className="input-field"
            {...register("email", { required: "پرکردن این بخش الزامی است" })}
          />
          </div>
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>

        {/* Login Link */}
        <h3 className="log2">
          عضو هستید؟
          <Link to="/Login" className="log">
            ورود
          </Link>
        </h3>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isValid}
          className={`submit ${!isValid ? "submit-disabled" : ""}`}
        >
          ثبت
        </button>

        {/* Error Message */}
        <div className="danger-div1">
        {errMessage && <p className="text-danger">{errMessage}</p>}
        </div>
      </form>
    </div>
  );
};

export default SignUp;

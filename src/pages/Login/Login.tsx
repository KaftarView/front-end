import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./Login.css";
import axios, { CanceledError } from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAppContext } from '../../components/AppContext';
import { setRefreshToken, setToken } from "../../utils/jwt";
import apiClient from  "../../utils/apiClient"

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
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState<string>("");
  const { backendUrl, setBackendUrl } = useAppContext();  
  const navigate = useNavigate();
  const location = useLocation();
  const showAlert = () => {  
    alert("خوش آمدید");  
  };  

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data: FormData) => {

    try {
      const obj = { username: data.username, password: data.password };
      console.log(obj.username);
      console.log(obj.password);

      const res = await axios.post(
        `${backendUrl}/v1/auth/login`,
        obj
      );
        console.log(res)
      if(res.data.statusCode === 200)
        {
            // showAlert();
            // navigate('/')
            // setToken(res.data.)
            setToken(res.data.data.access_token);
            setRefreshToken(res.data.data.refresh_token)
            console.log(localStorage.getItem("refresh_token"));
            

        }

    } catch (err) {
      if (err instanceof CanceledError) return;
      console.log(err);

      if (axios.isAxiosError(err)) {
        setErrMessage("اطلاعات وارد شده صحیح نمی‌باشد. لطفا دوباره تلاش کنید.");
        console.error("Error during login:", err.message);
      }
    }
  };

  return (
    <div className="Login">
      <div>
        <img className="img2" src="././public/pacman gif.gif" alt="My GIF" />
      </div>
      <h2 className="entry">ورود</h2>
      <form className="sign_form" onSubmit={handleSubmit(onSubmit)}>
        {/* Username Field */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2 text-right text-xl"
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

        {/* Password Field */}
        <div className="mb-6">
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
              className="input-field"
              {...register("password", {
                required: "پرکردن این بخش الزامی است",
              })}
            />
            <i
              onClick={handleShowPassword}
              className={`fa fa-fw ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
            ></i>
            <div>
              <abbr data-title="پسورد شما باید : شامل حرف بزرگ انگلیسی, حرف کوچک انگلیسی, حداقل 8 کارکتر,عدد و یک کارکتر خاص مانند @ باشد ">
                <i className="fa fa-question-circle" aria-hidden="true"></i>
              </abbr>
            </div>
          </div>
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>
       

        {/* Forgot Password Link */}
        <h3 className="log2">
          رمز خود را فراموش کرده اید؟
          <Link to="/ForgetPassword" className="log">
            بازیابی رمز
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
        <div className="danger-div">
        {errMessage && <p className="text-danger">{errMessage}</p>}
        </div>

      </form>
    </div>
  );
};

export default Login;

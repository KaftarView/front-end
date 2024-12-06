

import { useState } from "react";
import "./ChangePassword.css";
import ProfilePage from "../ProfilePage/ProfilePage";
import Navbar from "../NavBar/NavBar"; 
import Footer from "../Footer/Footer";
import NavbarPersonalInfo from "./NavigationBar";

interface NewPasswordState {
  password: string;
  confirmation: string;
}

function ChangePassword() {
  const [newPassword, setNewPassword] = useState<NewPasswordState>({
    password: "",
    confirmation: "",
  });

  const [errMessage, setErrMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);


  const showAlert = () => {  
    alert("پسورد شما با موفقیت تغییر کرد");  
  };
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: keyof NewPasswordState
  ) => {
    const value = event.target.value;
    setNewPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleShowPassword = () => setShowPassword((prev) => !prev);
  const handleShowPasswordAgain = () => setShowPasswordAgain((prev) => !prev);
  const title = 'پسورد شما باید : شامل حرف بزرگ انگلیسی, حرف کوچک انگلیسی, حداقل 8 کارکتر, عدد و یک کارکتر خاص مانند @ باشد';


  const handleSubmit = () => {
    if (newPassword.password !== newPassword.confirmation) {
      setErrMessage("پسورد ها یکسان نیستند");
      setSuccessMessage("");
    } else if (newPassword.password.length < 8) {
      setErrMessage("پسورد شما شروط قید شده را رعایت نمی کند");
      setSuccessMessage("");
    } else {
      setErrMessage("");
      setSuccessMessage("رمز عبور با موفقیت تعوض شد");
    }
    //try
      //try catch
    // try {
    //     const obj = {  password : newPassword.password , confirmPassword : newPassword.confirmation}
    //     const response = await axios.put(`${backendUrl}/v1/auth/reset-password`, obj);
    //     console.log('Password reset successful:', response.data);
    //     if(response.data.statusCode === 200)
    //     {
    //         showAlert();
    //         navigate('/Profile')
    //     }

    // } catch (error) {
    //     if (axios.isAxiosError(error))
    //     {
    //         setErrMessage('پسورد شما شروط قید شده را رعایت نمیکند')
    //         console.error('Error submitting OTP:', error.request.response);
    //     }
    
  };

  return (
    <>
      <Navbar />

      <div className="content-wrapperChangePass">
      <ProfilePage />
        <div className="lineChangePass"></div>
        <NavbarPersonalInfo/>
        <div className="change-passwordChangePass">
          <form className="sign_formChangePass" onSubmit={(e) => e.preventDefault()}>
        
            <h2 className="text-right mb-10">بازیابی رمز عبور</h2>
            
            <label htmlFor="password" className="block text-right">
              رمز عبور جدید
            </label>
            <div className="input-containerChangePass">

                    <input className='input-fieldChangePass'
                        type={`${showPassword ? 'text' : 'password'}`} 
                        id="password"
                        value={newPassword.password}
                        onChange={(event) => handleChange(event, 'password')}
                        name='password'
                        required
                    />
                     <i  onClick={handleShowPassword} className={`fa fa-fwchange ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} ></i> 

                    </div>
                  <label htmlFor="confirmation" className="block text-right">
                    تکرار رمز عبور جدید
                  </label>
               <div className="input-containerChangePass">
                    <input className='input-fieldChangePass'
                        type={`${showPasswordAgain ? 'text' : 'password'}`} 
                        id="passwordagain"
                        name='confirmation'
                        value={newPassword.confirmation}
                        onChange={(event) => handleChange(event, 'confirmation')}
                        required
                    />
                    <i  onClick={handleShowPasswordAgain} className={`fa fa-fwchange ${showPasswordAgain ? 'fa-eye-slash' : 'fa-eye'}`} ></i> 
                    </div>
          
           
            <button type="submit" className="button" onClick={handleSubmit}>
              ثبت
            </button>
            {errMessage && (
              <p style={{ color: "red", textAlign: "center" }}>{errMessage}</p>
            )}
            {successMessage && (
              <p style={{ color: "green", textAlign: "center" }}>
                {successMessage}
              </p>
            )}
          </form>
        </div>
        
      </div>
      <Footer />
    </>
  );
}

export default ChangePassword;

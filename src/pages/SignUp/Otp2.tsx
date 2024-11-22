// import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { useAuth } from './AuthContext';
// import './Otp.css';

// interface LocationState {
//     state: {
//         email: { email: string };
//     };
// }

// const Otp2: React.FC = () => {
//     const location = useLocation() as LocationState;
//     const { email } = location.state || {};
//     console.log(email)
//     // console.log(email?.email);
//     const { allowAccess } = useAuth();

//     const [otp2, setOtp] = useState<string[]>(Array(6).fill(''));
//     const navigate = useNavigate();
//     const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

//     const handleChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
//         const value = event.target.value;
//         if (/^[0-9]$/.test(value)) {
//             const newOtp = [...otp2];
//             newOtp[index] = value;
//             setOtp(newOtp);
//             if (index < otp2.length - 1) {
//                 inputRefs.current[index + 1]?.focus();
//             }
//         } else if (value === '') {
//             const newOtp = [...otp2];
//             newOtp[index] = '';
//             setOtp(newOtp);

//             if (index > 0) {
//                 inputRefs.current[index - 1]?.focus();
//             }
//         }
//     };

//     const handleSubmit = async (event: FormEvent) => {
//         event.preventDefault();
//         const otpValue = otp2.join('');
//         const payload = { email: email, otp: otpValue };
//         console.log(payload);
//         // allowAccess();
//         // navigate('/resetPass' , { state: { email } });

//         try {
//             const response = await axios.post('https://4410-212-64-199-253.ngrok-free.app/v1/register/verify', payload);
//             console.log('Response:', response.data);

//         } catch (error) {
//             if (axios.isAxiosError(error))
//             {
//                 console.error('Error submitting OTP:', error.request.response);
//             }
//         }

//     };

//     return (
//         <div className="otp_body">
//             <form className="otp_form" onSubmit={handleSubmit}>
//             <div>
//                 <img className="img2" src="././public/Pacman gif.gif" alt="My GIF" />
//                 </div>
//                 <h1>کد ارسال شده به ایمیل را وارد کنید</h1>
//                 <div className='inputs'>
//                     {otp2.map((value, index) => (
//                         <input
//                             className='otp_input'
//                             type="text"
//                             key={index}
//                             value={value}
//                             onChange={(event) => handleChange(event, index)}
//                             maxLength={1}
//                             ref={(el) => (inputRefs.current[index] = el)}
//                         />
//                     ))}
//                 </div>

//                 <button  className="button" type='submit'>تایید</button>
//             </form>
//         </div>
//     );
// }

// export default Otp2;

import React, { useState, useRef, ChangeEvent, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../components/AuthContext";
import "./Otp2.css";
import { useAppContext } from '../../components/AppContext';

interface LocationState {
  state: {
    email: { email: string };
  };
}

const Otp2: React.FC = () => {
  const location = useLocation() as LocationState;
  const { email } = location.state || {};
  const { allowAccess } = useAuth();
  const showAlert = () => {
    alert("خوش آمدید");
  };
  const [otp2, setOtp] = useState<string[]>(Array(6).fill(""));
  // const [popupVisible, setPopupVisible] = useState(false); // State for popup visibility
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [errMessage, setErrMessage] = useState<string>("");
  const { backendUrl, setBackendUrl } = useAppContext();  
  const navigate = useNavigate();

  // const handleChange = (
  //   event: ChangeEvent<HTMLInputElement>,
  //   index: number
  // ) => {
  //   const value = event.target.value;
  //   if (/^[0-9]$/.test(value)) {
  //     const newOtp = [...otp2];
  //     newOtp[index] = value;
  //     setOtp(newOtp);
  //     if (index < otp2.length - 1) {
  //       inputRefs.current[index - 1]?.focus();
  //     }
  //   } else if (value === "") {
  //     const newOtp = [...otp2];
  //     newOtp[index] = "";
  //     setOtp(newOtp);

  //     if (index > 0) {
  //       inputRefs.current[index + 1]?.focus();
  //     }
  //   }
  // };
  const handleChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {  
    const value = event.target.value;  
    if (/^[0-9]$/.test(value)) {  
        const newOtp = [...otp2];  
        newOtp[index] = value;  
        setOtp(newOtp);  
        
        // Move focus to the next input field (to the right in RTL)  
        if (index < otp2.length - 1) {  
            inputRefs.current[index + 1]?.focus();  
        }  
    } else if (value === '') {   
        const newOtp = [...otp2];  
        newOtp[index] = '';  
        setOtp(newOtp);  

        // Move focus to the previous input field (to the left in RTL)  
        if (index > 0) {  
            inputRefs.current[index - 1]?.focus();  
        }  
    }  
};

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const otpValue = otp2.join("");
    const payload = { email: email, otp: otpValue };
    console.log(payload)
    try {
      const response = await axios.post(
        `${backendUrl}/v1/auth/register/verify`,
        payload
      );
      console.log("Response:", response.data);

      // Show the popup on success
      // setPopupVisible(true);
      if (response.data.statusCode === 200) {
        showAlert();
        navigate("/");
      }

      // // Optionally navigate to another page after a delay
      // setTimeout(() => {
      //     allowAccess();
      //     navigate('/Login', { state: { email } });
      // }, 2000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrMessage("کد ورودی اشتباه است");
        console.error("Error submitting OTP:", error.request.response);
      }
    }
  };

  return (
    <div className="otp2_body">
      <form className="otp2_form" onSubmit={handleSubmit}>
        <div>
          <img className="img3" src="././public/Pacman gif.gif" alt="My GIF" />
        </div>
        <h1 className="h1">کد ارسال شده به ایمیل را وارد کنید</h1>
        <div className="inputs2">
        {otp2.slice().reverse().map((value, index) => (  
            <input  
              className="otp2_input"  
              type="text"  
              key={index}  
              value={value}  
              onChange={(event) => handleChange(event, otp2.length - 1 - index)} // Adjust index for reverse mapping  
              maxLength={1}  
              ref={(el) => (inputRefs.current[otp2.length - 1 - index] = el)} // Adjust ref for reverse mapping  
            />  
          ))}  
        </div>

        <button className="button2" type="submit">
          تایید
        </button>
        <div className="error-message">
          <p>{errMessage}</p>
        </div>
      </form>

      {/* {popupVisible && (
                <div className="popup2">
                    <div className="popup_content2">
                        <p>ورود با موفقیت انجام شد</p>
                    </div>
                </div>
            )} */}
    </div>
  );
};

export default Otp2;

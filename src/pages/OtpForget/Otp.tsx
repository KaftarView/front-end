import React, { useState, useRef, ChangeEvent, FormEvent , useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../components/AuthContext';
import './Otp.css';
import { Link } from "react-router-dom";
import {useAppContext} from '../../components/AppContext';

interface LocationState {
    state: {
        email: { email: string };
    };
}

const Otp: React.FC = () => {
    const location = useLocation() as LocationState;
    const { email } = location.state || {};
    // console.log(email?.email);
    const { allowAccess } = useAuth();
    const [errMessage , setErrMessage] = useState<string >('')

    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
    const navigate = useNavigate();
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]); 
    const { backendUrl, setBackendUrl } = useAppContext();  
    const handleChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {  
        const value = event.target.value;  
        if (/^[0-9]$/.test(value)) {  
            const newOtp = [...otp];  
            newOtp[index] = value;  
            setOtp(newOtp);  
            
            // Move focus to the next input field (to the left in RTL)  
            if (index > 0) {  
                inputRefs.current[index - 1]?.focus();  
            }  
        } else if (value === '') {   
            const newOtp = [...otp];  
            newOtp[index] = '';  
            setOtp(newOtp);  
    
            // Move focus to the previous input field (to the right in RTL)  
            if (index < otp.length - 1) {  
                inputRefs.current[index + 1]?.focus();  
            }  
        }  
    };  
    const showAlert = () => {  
        alert("ایمیل با موفقیت ارسال شد");  
    };  

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setErrMessage('');
        const otpValue = otp.join('');
        const payload = { email: email?.email, otp: otpValue };
        console.log(payload);
        // allowAccess();
        // navigate('/resetPassword' , { state: { email } });
        
        try {
            const response = await axios.post( `${backendUrl}/v1/auth/confirm-otp`, payload);
            console.log('Response:', response.data);
            if(response.data.statusCode == 200)
            {
                allowAccess();
                navigate('/resetPass' , { state: { email } });
            }
        } catch (error) {
            if (axios.isAxiosError(error))
            {
                
                // console.log(re.request.status);
                if(error.response)
                {
                    setErrMessage('کد ورودی اشتباه است')
                }
                else {
                    setErrMessage('مشکلی در ارتباط با سرور وجود دارد. لطفا مجددا تلاش کنید');
                }
            }
        }
        

    };

    const [timeLeft, setTimeLeft] = useState(10);
    const [resendEnabled, setResendEnabled] = useState(false);
    const isAllFilled = otp.every(value => value !== '');  
  
    useEffect(() => {
      if (timeLeft > 0) {
        const timerId = setInterval(() => {
          setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
  
        return () => clearInterval(timerId); 
      } else {
        setResendEnabled(true);
      }
    }, [timeLeft]);
  
    // Function to format time
    const formatTime = (seconds: number) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };
  

    const handleResend = async() => {
      setErrMessage('');
      try {
        const response = await fetch(`${backendUrl}/v1/auth/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email.email }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.statusCode === 200) {
            showAlert();
        }
        } catch (error) {  
            setErrMessage('مشکلی در ارتباط با سرور وجود دارد. لطفا مجددا تلاش کنید');      
            
        }
        setTimeLeft(10); 
        setResendEnabled(false);
    };

    return (
        <div className="otp_body">
            <form className="otp_form" onSubmit={handleSubmit}>
            <div>
                <img className="img2" src="././public/Pacman gif.gif" alt="My GIF" />
                </div>
                <p>لطفا کد ارسال شده به ایمیل را وارد کنید</p>
                <div className='inputs'>
                    {otp.map((value, index) => (
                        <input 
                            className='otp_input' 
                            type="text"
                            key={index}
                            value={value}
                            onChange={(event) => handleChange(event, index)}
                            maxLength={1}
                            ref={(el) => (inputRefs.current[index] = el)}  
                        />
                    ))}         
                </div>
                <h3 className="log">
                ایمیل اشتباهی را وارد کردید ؟
                <Link to="/ForgetPassword" className="log2">
                بازیابی رمز
                </Link>
                 </h3>
                 {resendEnabled ? (
                    <p  
                    onClick={handleResend}
                    
                    style={{   
                        color:'#551A8B',   
                        textDecoration: 'underline',   
                        cursor: 'pointer' ,
                        fontFamily: 'Anjoman-FaNum-Light' 
                    }}>ارسال مجدد کد تایید</p>
                ) : (
                    <p> ارسال مجدد کد در{ formatTime(timeLeft)}</p>
                )}

                <button
                disabled={!isAllFilled}
                type="submit"
                className={`submit`}
                > 
          ثبت
        </button>
        <div className='error-message'>
                        <p>{errMessage}</p>
                    </div>
            </form>   
        </div>
    );
}

export default Otp;

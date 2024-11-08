import React, { useState, useRef, ChangeEvent, FormEvent , useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';
import './Otp.css';
import { Link } from "react-router-dom";

interface LocationState {
    state: {
        email: { email: string };
    };
}

const Otp: React.FC = () => {
    const location = useLocation() as LocationState;
    const { email } = location.state || {};
    console.log(email?.email);
    const { allowAccess } = useAuth();

    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
    const navigate = useNavigate();
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]); 

    const handleChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {  
        const value = event.target.value;  
        if (/^[0-9]$/.test(value)) {
            const newOtp = [...otp];  
            newOtp[index] = value;  
            setOtp(newOtp);  
            if (index < otp.length - 1) {  
                inputRefs.current[index + 1]?.focus();  
            }  
        } else if (value === '') { 
            const newOtp = [...otp];  
            newOtp[index] = '';  
            setOtp(newOtp);  

            if (index > 0) {  
                inputRefs.current[index - 1]?.focus();  
            }  
        }  
    };  

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const otpValue = otp.join('');
        const payload = { email: email?.email, otp: otpValue };
        console.log(payload);
        // allowAccess();
        // navigate('/resetPass' , { state: { email } });
        
        try {
            const response = await axios.post('https://6339-212-64-199-253.ngrok-free.app/v1/confirm-otp', payload);
            console.log('Response:', response.data);
            if(response.data.statusCode == 200)
            {
                allowAccess();
                navigate('/resetPass' , { state: { email } });
            }
        } catch (error) {
            if (axios.isAxiosError(error))
            {
                console.error('Error submitting OTP:', error.request.response);
            }
        }
        

    };

    const [timeLeft, setTimeLeft] = useState(10);
    const [resendEnabled, setResendEnabled] = useState(false);
  
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
      setTimeLeft(10);
      try {
        const response = await fetch('https://6339-212-64-199-253.ngrok-free.app/v1/forgot-password', {
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
        console.log('Email sent successfully:', data);
        } catch (error) {
            console.error('Error sending email:', error);
        }
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
                    <p> {formatTime(timeLeft)}   ارسال مجدد در</p>
                )}
                <button
                type="submit"
                className={`submit`}
                >
          ثبت
        </button>
            </form>   
        </div>
    );
}

export default Otp;

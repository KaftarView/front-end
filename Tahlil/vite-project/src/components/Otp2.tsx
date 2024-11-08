import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';
import './Otp.css';

interface LocationState {
    state: {
        email: { email: string };
    };
}

const Otp2: React.FC = () => {
    const location = useLocation() as LocationState;
    const { email } = location.state || {};
    console.log(email)
    // console.log(email?.email);
    const { allowAccess } = useAuth();

    const [otp2, setOtp] = useState<string[]>(Array(6).fill(''));
    const navigate = useNavigate();
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]); 

    const handleChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {  
        const value = event.target.value;  
        if (/^[0-9]$/.test(value)) {
            const newOtp = [...otp2];  
            newOtp[index] = value;  
            setOtp(newOtp);  
            if (index < otp2.length - 1) {  
                inputRefs.current[index + 1]?.focus();  
            }  
        } else if (value === '') { 
            const newOtp = [...otp2];  
            newOtp[index] = '';  
            setOtp(newOtp);  

            if (index > 0) {  
                inputRefs.current[index - 1]?.focus();  
            }  
        }  
    };  

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const otpValue = otp2.join('');
        const payload = { email: email, otp: otpValue };
        console.log(payload);
        // allowAccess();
        // navigate('/resetPass' , { state: { email } });
        
        try {
            const response = await axios.post('https://6339-212-64-199-253.ngrok-free.app/v1/register/verify', payload);
            console.log('Response:', response.data);
        } catch (error) {
            if (axios.isAxiosError(error))
            {
                console.error('Error submitting OTP:', error.request.response);
            }
        }
        

    };

    return (
        <div className="otp_body">
            <form className="otp_form" onSubmit={handleSubmit}>
            <div>
                <img className="img2" src="././public/Pacman gif.gif" alt="My GIF" />
                </div>
                <h1>کد ارسال شده به ایمیل را وارد کنید</h1>
                <div className='inputs'>
                    {otp2.map((value, index) => (
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
                
                <button  className="button" type='submit'>تایید</button>
            </form>   
        </div>
    );
}

export default Otp2;

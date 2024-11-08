import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './forgetpassword.css';

const ForgetPassword: React.FC = () => {
    const [email, setEmail] = useState<{ email: string }>({ email: '' });
    const navigate = useNavigate();
    const { allowAccess } = useAuth();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        // allowAccess();
        // navigate('/otp', { state: { email } });

        try {
            const response = await fetch('https://6339-212-64-199-253.ngrok-free.app/v1/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email.email }),
            });

            // if (!response.ok) { // Check if the response is not OK
            //     throw new Error(`HTTP error! status: ${response.status}`);
            // }

            const data = await response.json();
            console.log('Email sent successfully:', data);
            if (data.statusCode === 200) {
                allowAccess();
                navigate('/otp', { state: { email } });
            }
        } catch (error) {
            if (error instanceof Error) {  
                console.error('Error sending email:', error.message);  

            } else {  
                console.error('Unexpected error:', error);  

            }  
        }
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail({ email: e.target.value });
        console.log(email);
    };

    return (
        <div className='container'>
            <div className='forget_body'>
            <div>
                <img className="img2" src="././public/Pacman gif.gif" alt="My GIF" />
                </div>
                <form className='sign_form' onSubmit={handleSubmit}>
                    <h2>بازیابی رمزعبور</h2>
                    <p>لطفا ایمیلی که با آن ثبت نام کرده اید وارد کنید</p>
                    <div className="input-container">
                    <input className='input-field1'
                        type="text"
                        value={email.email}
                        onChange={handleEmailChange}
                    />
                    </div>
                    <button
                    type="submit"
                    // disabled={!isValid}
                    className={`submit`}
                    >
                    ثبت
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ForgetPassword;

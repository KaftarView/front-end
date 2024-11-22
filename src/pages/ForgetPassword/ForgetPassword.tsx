import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext';
import './forgetpassword.css';
import { useAppContext } from '../../components/AppContext';

const ForgetPassword: React.FC = () => {
    const [email, setEmail] = useState<{ email: string }>({ email: '' });
    const [errMessage , setErrMessage] = useState<string >("")
    const navigate = useNavigate();
    const { allowAccess } = useAuth();
    
    const { backendUrl, setBackendUrl } = useAppContext();  
    // console.log(backendUrl);
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        // allowAccess();
        // navigate('/otp', { state: { email } });
        setErrMessage('');

        try {
            const response = await fetch(`${backendUrl}/v1/auth/forgot-password`, {
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
            console.log(data);
            if (data.statusCode === 200) {
                allowAccess();
                navigate('/otp', { state: { email } });
            }
            if(data.statusCode === 422) {
                setErrMessage('ایمیل وجود ندارد')
                setEmail({ email: '' })

            }
        } catch (error) {
            if (error instanceof Error) {  
                setErrMessage('مشکلی در ارتباط با سرور وجود دارد. لطفا مجددا تلاش کنید');
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
                <form className='forget_form' onSubmit={handleSubmit}>
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
                    disabled = {email.email === ''}
                    className={`submit`}
                    >
                    ثبت
                    </button>
                    <div className='error-message'>
                        <p>{errMessage}</p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgetPassword;

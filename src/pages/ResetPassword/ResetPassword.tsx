import { useState, ChangeEvent } from 'react'; 
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './resetpasword.css';
import apiClient from '../../utils/apiClient';
// import './tooltip.css'
import { set } from 'react-hook-form';
import {useAppContext} from '../../components/AppContext'
interface NewPasswordState {
    password: string;
    confirmation: string;
}
interface LocationState {
    state: {
        email: { email: string };
    };
}

function ResetPassword() {
    const [newPassword, setNewPassword] = useState<NewPasswordState>({
        password: '',
        confirmation: '',
    });
    const showAlert = () => {  
        alert("پسورد شما با موفقیت تغییر کرد");  
    };  
    const { backendUrl, setBackendUrl } = useAppContext();  
    const location = useLocation() as LocationState;
    const { email } = location.state || {};
    const title = 'پسورد شما باید : شامل حرف بزرگ انگلیسی, حرف کوچک انگلیسی, حداقل 8 کارکتر,عدد و یک کارکتر خاص مانند @ باشد '
    const [errMessage , setErrMessage] = useState<string >('')
    const navigate = useNavigate();

    const handleChange = (event: ChangeEvent<HTMLInputElement>, name: keyof NewPasswordState) => {  
        const value = event.target.value;  
        setNewPassword((prev) => ({  
            ...prev,  
            [name]: value,
        }));  
    };  

    const [showPassword, setShowPassword] = useState<boolean>(false);  
    const [showPasswordAgain, setShowPasswordAgain] = useState<boolean>(false);  
  
    const handleShowPassword = () => {  
      setShowPassword(prev => !prev);  
    };  
  
    const handleShowPasswordAgain = () => {  
      setShowPasswordAgain(prev => !prev);  
    };  

    const handleSubmit = async () => {
        setErrMessage('');
        if (newPassword.password !== newPassword.confirmation) {
            setErrMessage('پسورد ها یکسان نیستند')
            return;
        }
        // showAlert();
        // navigate('/login')
        
        try {
            const obj = {email : email.email , password : newPassword.password , confirmPassword : newPassword.confirmation}
            const response = await apiClient.put(`/v1/auth/reset-password`, obj);
            console.log('Password reset successful:', response.data);
            if(response.data.statusCode === 200)
            {
                showAlert();
                navigate('/login')
            }

        } catch (error) {
            if (axios.isAxiosError(error))
            {
                if(error.response)
                {
                    setErrMessage('پسورد شما شروط قید شده را رعایت نمیکند')
                }
                else {
                    setErrMessage('مشکلی در ارتباط با سرور وجود دارد. لطفا مجددا تلاش کنید');
                }

                console.error('Error submitting OTP:', error.request.response);
            }
        }
    };

    return (
        <div className='container'>
            <div className='forget_body'>
                
                <div>
                <img className="img2" src="././public/Pacman gif.gif" alt="My GIF" />
                </div>
                <form className='sign_form1' onSubmit={(e) => e.preventDefault()}>
                    <h2 className='resetTitle'>بازیابی رمز عبور</h2>
                    <label
                        htmlFor="password"
                    >
                        رمز عبور جدید
                    </label>
                    <div className="input-container">

                    <input className='input-field2'
                        type={`${showPassword ? 'text' : 'password'}`} 
                        id="password"
                        value={newPassword.password}
                        onChange={(event) => handleChange(event, 'password')}
                        name='password'
                        required
                    />
                     <i  onClick={handleShowPassword} className={`fa fa-fw ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} ></i> 
                     <div>
                     <abbr data-title={title}><i className="fa fa-question-circle" aria-hidden="true" ></i> </abbr>
                     </div>

                    </div>
                    <label
                        htmlFor="passwordagain"
                    >
                       تکرار رمز عبور جدید
                    </label>
                    <div className="input-container">
                    <input className='input-field2'
                        type={`${showPasswordAgain ? 'text' : 'password'}`} 
                        id="passwordagain"
                        name='confirmation'
                        value={newPassword.confirmation}
                        onChange={(event) => handleChange(event, 'confirmation')}
                        required
                        style={{  
                            marginBottom : '20px'
                        }}  
                    />
                    <i  onClick={handleShowPasswordAgain} className={`fa fa-fw ${showPasswordAgain ? 'fa-eye-slash' : 'fa-eye'}`} ></i> 
                    </div>

                    <button
                    type="submit"
                    className={`submit`}
                    onClick={handleSubmit}
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

export default ResetPassword;

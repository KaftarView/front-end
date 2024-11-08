import { useState, ChangeEvent } from 'react'; 
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './resetpasword.css';

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

    const location = useLocation() as LocationState;
    const { email } = location.state || {};
    
    
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
        if (newPassword.password !== newPassword.confirmation) {
            alert("Passwords do not match");
            return;
        }
        
        
        try {
            const obj = {email : email.email , password : newPassword.password , confirmPassword : newPassword.confirmation}
            const response = await axios.put('https://6339-212-64-199-253.ngrok-free.app/v1/reset-password', obj);
            console.log('Password reset successful:', response.data);
        } catch (error) {
            console.error('Error resetting password:', error);
            alert("An error occurred while resetting your password.");
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
                        className="block text-gray-700 font-medium mb-2 text-right"
                        htmlFor="password"
                    >
                        رمز عبور جدید
                    </label>
                    <div className="input-container">

                    <input className='input-field'
                        type={`${showPassword ? 'text' : 'password'}`} 
                        id="password"
                        value={newPassword.password}
                        onChange={(event) => handleChange(event, 'password')}
                        name='password'
                        required
                    />
                     <i  onClick={handleShowPassword} className={`fa fa-fw ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} ></i> 

                    </div>
                    <label
                        className="block text-gray-700 font-medium mb-2 text-right"
                        htmlFor="passwordagain"
                    >
                       تکرار رمز عبور جدید
                    </label>
                    <div className="input-container">
                    <input className='input-field'
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

                </form>
            </div>
        </div>
    );
}

export default ResetPassword;

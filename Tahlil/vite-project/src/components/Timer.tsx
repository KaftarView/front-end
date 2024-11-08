import React, { useState, useEffect } from 'react';

const ForgotPassword: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(10); // 5 minutes in seconds
  const [resendEnabled, setResendEnabled] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId); // Clean up the timer
    } else {
      setResendEnabled(true); // Enable resend link when time is up
    }
  }, [timeLeft]);

  // Function to format time
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Function to handle resend code
  const handleResend = () => {
    // Logic to resend the code goes here
    setTimeLeft(300); // Reset timer to 5 minutes
    setResendEnabled(false);
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <p>We sent you a verification code. Please check your email.</p>
      
      {resendEnabled ? (
        <button onClick={handleResend}>Resend Code</button>
      ) : (
        <p>Resend code available in {formatTime(timeLeft)}</p>
      )}
    </div>
  );
};

export default ForgotPassword;

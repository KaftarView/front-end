// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import './index.css'
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import ForgetPassword from "./components/ForgetPassword";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider, useAuth } from "./components/AuthContext";
import Otp from "./components/Otp";
import ResetPassword from "./components/ResetPassword";
import Login from "./components/Login";
import SignUp from "./components/signup";
import ForgotPassword from "./components/Timer";
import Otp2 from "./components/Otp2";


const Main: React.FC = () => {
  const { isAllowed } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/app" element={<App />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ForgotPassword />} />
        <Route
          path="/otp"
          element={<PrivateRoute element={Otp} isAllowed={isAllowed} />}
        />
        <Route
          path="/otp2"
          element={<PrivateRoute element={Otp2} isAllowed={isAllowed} />}
        />
        <Route
          path="/resetPass"
          element={
            <PrivateRoute element={ResetPassword} isAllowed={isAllowed} />
          }
        />
      </Routes>
    </Router>
  );
};

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}

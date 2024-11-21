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
import './index.css'
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, BrowserRouter as Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";

// const Main: React.FC = () => {
//   const { isAllowed } = useAuth();

//   return (
//     <Router>
//       <Routes>
//         <Route path="/ForgetPassword" element={<ForgetPassword />} />
//         <Route path="/app" element={<App />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/login" element={<Login />} />
//         {/* <Route path="/event-details" element={<EventDetail />} /> */}
//         <Route path="/event/:id" element={<EventDetail />} /> 
//         <Route path="/events" element={<EventsPage />} />
//         <Route path="/" element={<HomePage />} />
//         {/* <Route path="/" element={<Footer />} /> */}
//         <Route/>
//         <Route/>
//         <Route
//           path="/otp"
//           element={<PrivateRoute element={Otp} isAllowed={isAllowed} />}
//         />
//         <Route
//           path="/otp2"
//           element={<PrivateRoute element={Otp2} isAllowed={isAllowed} />}
//         />
//         <Route
//           path="/resetPass"
//           element={
//             <PrivateRoute element={ResetPassword} isAllowed={isAllowed} />
//           }
//         />
//       </Routes>
//     </Router>
//   );
// };

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    // {/* </React.StrictMode> */}
  );
} else {
  console.error("Root element not found");
}
document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
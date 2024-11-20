// // import { useState } from "react";
// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import "./App.css";
// // import Login from "./components/Login";
// // import SignUp from "./components/signup";

// // function App() {
// //   const [count, setCount] = useState(0);

// //   return (
// //     <div>
// //       {/* <Login /> */}
// //       <SignUp/>
// //     </div>
// //   );
// // }

// // export default App;


// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./App.css";
// import Login from "./components/Login";
// import SignUp from "./components/signup";
// import ForgetPassword from "./components/ForgetPassword";
// import PrivateRoute from './components/PrivateRoute';  
// import { AuthProvider, useAuth } from './components/AuthContext'; 
// import Otp from './components/Otp'
// import ResetPassword from './components/ResetPassword';

// function App() {
  
//   return (
//     <Router>
//       <Routes>
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/login" element={<Login />} />
       
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Router from './router/Router';
// import React from 'react';
// import SignUp from './components/signup';
// import Login from './components/Login';
// import ForgetPassword from './components/ForgetPass/ForgetPassword';
// import Otp from './components/Otp';
// import ResetPassword from './components/ResetPassword';
// import PrivateRoute from './components/PrivateRoute';  
// import { AuthProvider, useAuth } from './components/AuthContext';

function App() {
  return (
    // <Router>
    //   <Routes>
        // <Route path="/signup" element={<SignUp />} />
        // <Route path="/login" element={<Login />} />
    //   </Routes>
    // </Router>
    <div className='my-app'>
      <Router/>
    </div>
  );
}



export default App;

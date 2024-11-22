import{Routes,Route} from "react-router-dom"
// import EventsPage from "../Pages/EventsPage/EventsPage"
// import EventDetail from "../Pages/EventDetail/EventDetail"
import PATHS from "./path"
import HomePage from "../pages/HomePage"
import ForgetPassword from "../pages/ForgetPassword/ForgetPassword"
import EventDetail from "../pages/EventDetail/EventDetail"
import EventsPage from "../pages/EventsPage/EventsPage"
import Otp from "../pages/OtpForget/Otp"
import ResetPassword from "../pages/ResetPassword/ResetPassword"
import PrivateRoute from "../components/PrivateRoute"
import { useAuth } from "../components/AuthContext"
import Login from "../pages/Login/Login"
import Navbar from "../pages/NavBar/NavBar"
import ProfilePage from "../pages/ProfilePage/ProfilePage"
import ChangePassword from "../pages/ChangePasswordAndUserInfo/ChangePassword"
import PersonalInfo from "../pages/ChangePasswordAndUserInfo/PersonalInfo"
// import Footer from "../pages/Footer/Footer"


const Router = () => {
  const { isAllowed } = useAuth();
  return (
    <Routes>
       <Route path={PATHS.Login}  element={<Login/>}></Route>
        <Route path={PATHS.home}  element={<HomePage/>}></Route>
        <Route path={PATHS.forgetpassword}  element={<ForgetPassword/>}></Route>
        <Route path={PATHS.eventdetail}  element={<EventDetail/>}></Route>
        <Route path={PATHS.event}  element={<EventsPage/>}></Route>
        <Route
              path={PATHS.otp}
              element={<PrivateRoute element={<Otp />} isAllowed={isAllowed} />}
            />
        <Route
              path={PATHS.resetPassword}
              element={<PrivateRoute element={<ResetPassword />} isAllowed={isAllowed} />}
            />
        <Route path={PATHS.Navbar}  element={<Navbar/>}></Route>
        <Route path={PATHS.ProfilePage}  element={<ProfilePage/>}></Route>
        <Route path={PATHS.ChangePassword}  element={<ChangePassword/>}></Route>
        <Route path={PATHS.PersonalInfo}  element={<PersonalInfo/>}></Route>
        {/* <Route path={PATHS.Footer}  element={<Footer/>}></Route> */}
        {/* <Route path={PATHS.event} element={<EventsPage/>}></Route>
        <Route path={PATHS.eventdetail} element={<EventDetail />} ></Route> */}
        <Route></Route>
        <Route></Route>
        <Route></Route>

    </Routes>
  )
}

export default Router
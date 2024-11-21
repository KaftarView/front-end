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
// import ResetPassword from "../pages/ChangePassword/ChangePassword"

const Router = () => {
  const { isAllowed } = useAuth();
  return (
    <Routes>
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
        <Route></Route>
        <Route></Route>
        <Route></Route>

    </Routes>
  )
}

export default Router
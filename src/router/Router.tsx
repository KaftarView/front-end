import{Routes,Route} from "react-router-dom"
// import EventsPage from "../Pages/EventsPage/EventsPage"
// import EventDetail from "../Pages/EventDetail/EventDetail"
import PATHS from "./path"
import HomePage from "../pages/HomePage"
import Login from "../pages/Login/Login"
import ProfilePage from "../pages/ProfilePage/ProfilePage"


const Router = () => {
  return (
    <Routes>
       <Route path={PATHS.Login}  element={<Login/>}></Route>
        <Route path={PATHS.home}  element={<HomePage/>}></Route>
        <Route path={PATHS.ProfilePage}  element={<ProfilePage/>}></Route>
        {/* <Route path={PATHS.event} element={<EventsPage/>}></Route>
        <Route path={PATHS.eventdetail} element={<EventDetail />} ></Route> */}
        <Route></Route>
        <Route></Route>
        <Route></Route>

    </Routes>
  )
}

export default Router
import{Routes,Route} from "react-router-dom"
// import EventsPage from "../Pages/EventsPage/EventsPage"
// import EventDetail from "../Pages/EventDetail/EventDetail"
import PATHS from "./path"
import HomePage from "../Pages/HomePage"

const Router = () => {
  return (
    <Routes>
        <Route path={PATHS.home}  element={<HomePage/>}></Route>
        {/* <Route path={PATHS.event} element={<EventsPage/>}></Route>
        <Route path={PATHS.eventdetail} element={<EventDetail />} ></Route> */}
        <Route></Route>
        <Route></Route>
        <Route></Route>

    </Routes>
  )
}

export default Router
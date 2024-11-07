import{Routes,Route} from "react-router-dom"
import HomePage from "../pages/HomePage"
import AboutUsPage from "../pages/AboutUsPage"
import PATHS from "./path"

const Router = () => {
  return (
    <Routes>
        <Route path={PATHS.home}  element={<HomePage/>} />
        <Route path={PATHS.aboutUse} element={<AboutUsPage/>} />

    </Routes>
  )
}

export default Router
import{Routes,Route} from "react-router-dom"
// import EventsPage from "../Pages/EventsPage/EventsPage"
// import EventDetail from "../Pages/EventDetail/EventDetail"
import PATHS from "./path"
import HomePage from "../pages/HomePage"
import SignUp from "../pages/SignUp/signup"
import Otp2 from "../pages/SignUp/Otp2"
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
import NewsPage from "../pages/NewsPage/NewsPage"
import Addevent from "../pages/AddEvent/addevent"
import Tikets from "../pages/AddEvent/Tickets"
import Discount from "../pages/AddEvent/Discount"
import PodcastPage from "../pages/PodCasts/Podcast"
import PodcastDetail from "../pages/PodcastDetail/PodcastDetail"
import Nashrie from "../pages/nashrie/Nashrie"
import Organizer from "../pages/AddEvent/addOrganizer"
import EditEpisode from "../pages/EditEpisode/EditEpisode"
import AddNashriye from "../pages/AddNashriye/AddNashriye"
import RoleManagement from "../pages/AssignRole/assignRole"
import CreateRole from "../pages/CreateRole/createRole"
import AddPodcast from "../pages/CreatePodcast/createPodcast"
import UploadPodcast from "../pages/CreateEpisode/createEpisode"
import AdminPanel from "../pages/AdminPanel/mainPage"
import EventComponent from "../components/BuyTicketPopup/BuyTicket"
import MembersPage from "../pages/AssocitionMembers/Members"
import UploadMedia from "../pages/AddEventMedia/addEventMedia"
import ProfileEvent from "../pages/ProfileEvents/ProfileEvent"
import EditPadcast from "../pages/EditPadcast/EditPadcast"
import Members from "../pages/Addmembers/Addmembers"
import ProtectedRoute from "../components/ProtectedRoute"
import { Ticket } from "lucide-react"
import DiscountPanel from "../pages/AdminPanel/discountpanel"
import TiketsPanel from "../pages/AdminPanel/ticketpanel"
import Addnews from "../pages/AddNews/Addnews"
import NewsPageshow from "../pages/News/News"
import EditNews from "../pages/EditNews/EditNews"
import EditDiscount from "../pages/EdiitDiscount/EditDiscount"
import EditTicket from "../pages/EditTicket/EditTicket"




const Router = () => {
  const { isAllowed } = useAuth();
  return (
    <Routes>
       <Route path={PATHS.Login}  element={<Login/>}></Route>
        <Route path={PATHS.home}  element={<HomePage/>}></Route>

        <Route path={PATHS.SignUp} element={<SignUp/>}></Route>
        <Route path={PATHS.Otp2} element={<Otp2/>}></Route>
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
        <Route 
            path={PATHS.adminpanel} 
            element={
              <ProtectedRoute 
                element={<AdminPanel />} 
                requiredRole="ManageEvent" 
              />
            }
            />
        <Route 
            path={PATHS.AddEvent} 
            element={
              <ProtectedRoute 
                element={<Addevent />} 
                requiredRole="ManageEvent" 
              />
            }
            />
        <Route 
            path={PATHS.AddNashriye} 
            element={
              <ProtectedRoute 
                element={<AddNashriye />} 
                requiredRole="ManageJournal" 
              />
            }
            />
          <Route 
            path={PATHS.Tikets} 
            element={
              <ProtectedRoute 
                element={<Tikets />} 
                requiredRole="ManageEvent" 
              />
            }
            />
          <Route 
            path={PATHS.Discount} 
            element={
              <ProtectedRoute 
                element={<Discount />} 
                requiredRole="ManageEvent" 
              />
            }
            />
        <Route 
            path={PATHS.EditEpisode} 
            element={
              <ProtectedRoute 
                element={<EditEpisode />} 
                requiredRole="ManagePodcasts" 
              />
            }
            />
        <Route 
            path={PATHS.EditPodcast} 
            element={
              <ProtectedRoute 
                element={<EditPadcast />} 
                requiredRole="ManagePodcasts" 
              />
            }
            />
        <Route 
            path={PATHS.addpodcast} 
            element={
              <ProtectedRoute 
                element={<AddPodcast />} 
                requiredRole="ManagePodcasts" 
              />
            }
            />
          <Route 
            path={PATHS.addmedia} 
            element={
              <ProtectedRoute 
                element={<UploadMedia />} 
                requiredRole="ManageEvent" 
              />
            }
            />
          <Route 
            path={PATHS.addepisode} 
            element={
              <ProtectedRoute 
                element={<UploadPodcast />} 
                requiredRole="ManagePodcasts" 
              />
            }
            />
          <Route 
            path={PATHS.Addmembers} 
            element={
              <ProtectedRoute 
                element={<Members />} 
                requiredRole="ManageJournal" 
              />
            }
            />
          <Route 
            path={PATHS.giverole} 
            element={
              <ProtectedRoute 
                element={<RoleManagement />} 
                requiredRole="ManageJournal" 
              />
            }
            />
          <Route 
            path={PATHS.createrole} 
            element={
              <ProtectedRoute 
                element={<CreateRole />} 
                requiredRole="ManageJournal" 
              />
            }
            />
          <Route 
            path={PATHS.TicketPanel} 
            element={
              <ProtectedRoute 
                element={<TiketsPanel />} 
                requiredRole="ManageEvent" 
              />
            }
            />
          <Route 
            path={PATHS.DiscountPanel} 
            element={
              <ProtectedRoute 
                element={<DiscountPanel />} 
                requiredRole="ManageEvent" 
              />
            }
            />
            <Route path={PATHS.EditDiscount}  element={<EditDiscount/>} />
                <Route path={PATHS.EditTicket}  element={<EditTicket/>} />
        <Route path={PATHS.Navbar}  element={<Navbar/>}></Route>
        <Route path={PATHS.ProfilePage}  element={<ProfilePage/>}></Route>
        <Route path={PATHS.ChangePassword}  element={<ChangePassword/>}></Route>
        <Route path={PATHS.PersonalInfo}  element={<PersonalInfo/>}></Route>
        <Route path={PATHS.NewsPage}  element={<NewsPage/>}></Route>
        {/* <Route path={PATHS.AddEvent}  element={<Addevent />} /> */}
        {/* <Route path={PATHS.Tikets} element={<Tikets />} /> */}
        {/* <Route path={PATHS.Discount}  element={<Discount />} /> */}

        <Route path={PATHS.podcast}  element={<PodcastPage />} />
        <Route path={PATHS.podcastDetails}  element={<PodcastDetail />} />
        <Route path={PATHS.magazine}  element={<Nashrie />} />
        <Route path={PATHS.AddOrganizer}  element={<Organizer />} />
        {/* <Route path={PATHS.AddNashriye} element={< AddNashriye/>} /> */}
        {/* <Route path={PATHS.EditEpisode} element={< EditEpisode/>} /> */}
        {/* <Route path={PATHS.EditPodcast} element={< EditPadcast/>} /> */}


        {/* <Route path={PATHS.Footer}  element={<Footer/>}></Route> */}
        {/* <Route path={PATHS.event} element={<EventsPage/>}></Route>
        <Route path={PATHS.eventdetail} element={<EventDetail />} ></Route> */}
        {/* <Route path={PATHS.giverole} element={<RoleManagement/>}/> */}
        {/* <Route path={PATHS.createrole} element={<CreateRole/>}/> */}
        {/* <Route path={PATHS.addpodcast} element={<AddPodcast/>}/> */}
        {/* <Route path={PATHS.addepisode} element={<UploadPodcast/>}/> */}
        {/* <Route path={PATHS.adminpanel} element={<AdminPanel/>}/> */}
        {/* <Route path={PATHS.giverole} element={<RoleManagement/>}/> */}
        {/* <Route path={PATHS.createrole} element={<CreateRole/>}/> */}
        {/* <Route path={PATHS.addpodcast} element={<AddPodcast/>}/> */}
        {/* <Route path={PATHS.addepisode} element={<UploadPodcast/>}/> */}
        {/* <Route path={PATHS.test} element={<EventComponent/>}/> */}
        <Route path={PATHS.MembersPage}  element={<MembersPage />} />
        {/* <Route path={PATHS.Addmembers} element={<Members/>}/> */}
        {/* <Route path={PATHS.addmedia}  element={<UploadMedia />} /> */}
        <Route path={PATHS.ProfileEvent}  element={<ProfileEvent/>}></Route>
                <Route path={PATHS.Addnews}  element={<Addnews/>} />
                <Route path={PATHS.EditNews}  element={<EditNews/>} />
                <Route path={PATHS.ShowNewsPage}  element={<NewsPageshow/>} />
    </Routes>
  )
}

export default Router
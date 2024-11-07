import { Link } from "react-router-dom"
import PATHS from "../router/path"
import './Reset.css'
import  './Header.css'


const headerMenus=[
    {id:1 , path: PATHS.home , lable:' خانه '},
    {id:2 , path: PATHS.aboutUse , lable:'  درباره ما '},
]


const Header = () => {
  return (
    <div className="p-2 space-x-2 bg-sky-500 text-white">
    {/* <Link to={PATHS.home}>Home</Link>
    <Link to={PATHS.aboutUse}>About us</Link>
 */}
    {
        headerMenus.map(item =>(<Link key={item.id} to ={item.path} className="bg-sky-800 p-1">{item.lable}</Link>) )
    }
    </div>
  )
}

export default Header
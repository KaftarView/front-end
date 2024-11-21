
import React, { useEffect } from "react";
import ProfileImage from "./ProfileImage";
import MenuItem from "./MenuItem";
// import Footer from "../Fototer/Footer";
// import Navbar from "../NavBar/NavBar";
// import "../../components/ChangePassword/ChangePassword.css"
// import "./ProfilePage.css"

interface FormData {
  banner?: File;
}
const ProfilePage: React.FC = () => {
  const menuItems = [
    {
      title: "رویدادهای من",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/bf8f40b1c61ac24b45ea5fcf709b5e74b415f3750a2f34914de26c13781c6deb?placeholderIfAbsent=true&apiKey=74dd80253d9244ddae80b45ff5ab670e",
      link: "/my-events",
    },
    {
      title: "گواهی نامه",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d986b3e4ab9f1b3494083e6eba399037a2eb9e42fc1e68c59a6cf4c907784e20?placeholderIfAbsent=true&apiKey=74dd80253d9244ddae80b45ff5ab670e",
      link: "/certificates",
    },
    {
      title: "حساب کاربری",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/26c8d01ecaea3732c32e92cabda469bf8a96ff3d00e45d32737b1a5a5683202c?placeholderIfAbsent=true&apiKey=74dd80253d9244ddae80b45ff5ab670e",
      link: "/personal-info",
    },
    // {
    //   title: "تغییر رمز عبور",
    //   icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/26c8d01ecaea3732c32e92cabda469bf8a96ff3d00e45d32737b1a5a5683202c?placeholderIfAbsent=true&apiKey=74dd80253d9244ddae80b45ff5ab670e",
    //   link: "/ChangePassword",
    // },
    {
      title: "خروج",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/26c8d01ecaea3732c32e92cabda469bf8a96ff3d00e45d32737b1a5a5683202c?placeholderIfAbsent=true&apiKey=74dd80253d9244ddae80b45ff5ab670e",
      link: "/ChangePass",
    },
  ];

  return (
    <>
      {/* <Navbar/> */}
      {/* <div className="profile-boxP"> Add class for CSS styling */}
      <aside className="flex flex-col bg-gray-200 shadow-xl rounded-[30px] p-8 py-12 text-black text-right max-w-xs  mr-10 mt-36 w-2/3">
        <div className="flex flex-col items-center mb-8">
          <ProfileImage />
        </div>
        <nav className="flex flex-col gap-4">
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              title={item.title}
              icon={item.icon}
              link={item.link}
            />
          ))}
        </nav>
      </aside>

      {/* </div> */}
      {/* <Footer /> */}
    </>
  );
};

export default ProfilePage;

import { useState } from "react";
import "./PersonalInfo.css";
import ProfilePage from "../ProfilePage/ProfilePage";
import Navbar from "../NavBar/NavBar"; // Optional if Navbar is separate
import Footer from "../Footer/Footer";
import NavbarPersonalInfo from "./NavigationBar";

interface NewUsernameState {
  username: string;
  confirmation: string;
}

function PersonalInfo() {
  const [newUsername, setNewUsername] = useState<NewUsernameState>({
    username: "",
    confirmation: "",
  });

  const [errMessage, setErrMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const showAlert = () => {
    alert("نام کاربری شما با موفقیت تغییر کرد");
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: keyof NewUsernameState
  ) => {
    const value = event.target.value;
    setNewUsername((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (newUsername.username !== newUsername.confirmation) {
      setErrMessage("نام های کاربری یکسان نیستند");
      setSuccessMessage("");
    } else if (newUsername.username.length < 5) {
      setErrMessage("نام کاربری باید حداقل ۵ کاراکتر باشد");
      setSuccessMessage("");
    } else {
      setErrMessage("");
      setSuccessMessage("نام کاربری با موفقیت تعویض شد");
      showAlert();

      /*
      try {
        const obj = { username: newUsername.username };
        const response = await axios.put(`${backendUrl}/v1/auth/change-username`, obj);
        if (response.data.statusCode === 200) {
          showAlert();
          navigate("/Profile");
        }
      } catch (error) {
        console.error("Error changing username:", error);
        setErrMessage("خطا در تغییر نام کاربری رخ داده است");
      }
      */
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />

      <div className="content-wrapperPersonalInfo">
        <ProfilePage />

        <div className="linePersonalInfo"></div>
        <NavbarPersonalInfo />
        <div className="change-usernamePersonalInfo">
          <form className="sign_formPersonalInfo" onSubmit={(e) => e.preventDefault()}>
            <h2 className="text-right mb-10">تغییر نام کاربری</h2>

            <label htmlFor="username" className="block text-right">
              نام کاربری جدید
            </label>
            <input
              type="text"
              id="username"
              className="input-field"
              value={newUsername.username}
              onChange={(e) => handleChange(e, "username")}
              required
            />
            <label htmlFor="confirmation" className="block text-right">
              تکرار نام کاربری جدید
            </label>
            <input
              type="text"
              id="confirmation"
              className="input-field"
              value={newUsername.confirmation}
              onChange={(e) => handleChange(e, "confirmation")}
              required
            />
            <button type="submit" className="button" onClick={handleSubmit}>
              ثبت
            </button>
            {errMessage && (
              <p style={{ color: "red", textAlign: "center" }}>{errMessage}</p>
            )}
            {successMessage && (
              <p style={{ color: "green", textAlign: "center" }}>{successMessage}</p>
            )}
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default PersonalInfo;

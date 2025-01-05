import { useState } from "react";
import "./ChangePassword.css";
import ProfilePage from "../ProfilePage/ProfilePage";
import Navbar from "../NavBar/NavBar"; // Optional if Navbar is separate
import Footer from "../Footer/Footer";
import apiClient from "../../utils/apiClient";

interface NewUsernameState {
  username: string;
  // confirmation: string;
}

function PersonalInfo() {
  const [newUsername, setNewUsername] = useState<NewUsernameState>({
    username: "",
    // confirmation: "",
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

  const handleSubmit = async () => {
    // if (newUsername.username !== newUsername.confirmation) {
    //   setErrMessage("نام های کاربری یکسان نیستند");
    //   setSuccessMessage("");
    // }
    if (newUsername.username.length < 5) {
      setErrMessage("نام کاربری باید حداقل ۵ کاراکتر باشد");
      setSuccessMessage("");
    } else {
      setErrMessage("");
      setSuccessMessage("نام کاربری با موفقیت تعویض شد");
      showAlert();

      try {
        const obj = { username: newUsername.username };
        const response = await apiClient.put(`/v1/profile/username`, obj);
        if (response.data.statusCode === 200) {
          showAlert();
        }
      } catch (error) {
        console.error("Error changing username:", error);
        setErrMessage("خطا در تغییر نام کاربری رخ داده است");
      }
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />

      <div className="content-wrapperChangePass">
        <ProfilePage />

        <div className="change-passwordChangePass">
          <form
            className="sign_formChangePass"
            onSubmit={(e) => e.preventDefault()}
          >
            <h2 className="text-right mb-10">تغییر نام کاربری</h2>

            <label htmlFor="username" className="block text-right">
              نام کاربری جدید
            </label>
            <div className="input-containerChangePass">
              <input
                className="input-fieldChangePass"
                type="text"
                id="username"
                value={newUsername.username}
                onChange={(event) => handleChange(event, "username")}
                name="username"
                required
              />
            </div>
            {/* <label htmlFor="confirmation" className="block text-right">
              تکرار نام کاربری جدید
            </label> */}
            {/* <input
              type="text"
              id="confirmation"
              className="input-field"
              value={newUsername.confirmation}
              onChange={(e) => handleChange(e, "confirmation")}
              required
            /> */}
            {/* <div className="input-containerChangePass">
                    <input className='input-fieldChangePass'
                        type="text"
                        id="confirmation"
                        name='confirmation'
                        value={newUsername.confirmation}
                        onChange={(event) => handleChange(event, 'confirmation')}
                        required
                    />
                    </div> */}
            <button type="submit" className="button" onClick={handleSubmit}>
              ثبت
            </button>
            {errMessage && (
              <p style={{ color: "red", textAlign: "center" }}>{errMessage}</p>
            )}
            {successMessage && (
              <p style={{ color: "green", textAlign: "center" }}>
                {successMessage}
              </p>
            )}
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default PersonalInfo;

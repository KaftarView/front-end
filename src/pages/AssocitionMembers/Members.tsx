import React, { useState, useEffect } from "react";
import "./members.css";
import Navbar from "../NavBar/NavBar";
import apiClient from "../../utils/apiClient";
import { useAuth } from "../../components/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../../components/PopupQuestion/PopopQuestion";
import moment from "moment-jalaali";

type Member = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  promotedYear: number;
  profile: string;
  description: string;
  enteringYear: number;
};

const MembersPage: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [inputYear, setInputYear] = useState<string>("");

  moment.loadPersian({ dialect: "persian-modern" });

  const persianYear = moment().jYear();

  console.log(persianYear);
  const [selectedYear, setSelectedYear] = useState<number>(persianYear);

  const [loading, setLoading] = useState<boolean>(true);
  const { getUserRoles } = useAuth();
  const userRole = getUserRoles()[0];
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentMemberId, setCurrentMemberId] = useState<number | null>(null);

  // useEffect(() => {
  //   // Mock data for testing
  //   const mockMembers = [
  //     {
  //       id:1,
  //       lastname: " فتوحی",
  //       firstname:"ارغوان",
  //       email: "arrrrrrrrrrrrr@gmail.com",
  //       promotedDate: 2023,
  //       profile: "https://placehold.co/160",
  //       description:'عضو',
  //       semester:2
  //     },
  //     {
  //       id:2,
  //       lastname: " فتوحی",
  //       firstname:"ارغوان",
  //       email: "arrrrrrrrrrrrr@gmail.com",
  //       promotedDate: 2023,
  //       profile: "https://placehold.co/160",
  //       description:'عضو',
  //       semester:2
  //     },
  //     // {
  //     //   id:3,
  //     //   lastname: " فتوحی",
  //     //   firstname:"ارغوان",
  //     //   email: "arrrrrrrrrrrrr@gmail.com",
  //     //   promotedDate: 2023,
  //     //   profile: "https://placehold.co/160",
  //     //   description:'عضو',
  //     //   semester:2
  //     // },
  //     // {
  //     //   id:3,
  //     //   lastname: " فتوحی",
  //     //   firstname:"ارغوان",
  //     //   email: "arrrrrrrrrrrrr@gmail.com",
  //     //   promotedDate: 2023,
  //     //   profile: "https://placehold.co/160",
  //     //   description:'عضو',
  //     //   semester:2
  //     // },
  //     {
  //       id:3,
  //       lastname: " فتوحی",
  //       firstname:"ارغوان",
  //       email: "arrrrrrrrrrrrr@gmail.com",
  //       promotedDate: 2023,
  //       profile: "https://placehold.co/160",
  //       description:'عضو',
  //       semester:2
  //     },
  //     // {
  //     //   id:3,
  //     //   lastname: " فتوحی",
  //     //   firstname:"ارغوان",
  //     //   email: "ar@gmail.com",
  //     //   promotedDate: 2023,
  //     //   profile: "https://placehold.co/160",
  //     //   description:'عضو',
  //     //   semester:2
  //     // },
  //     // {
  //     //   id:3,
  //     //   lastname: " فتوحی",
  //     //   firstname:"ارغوان",
  //     //   email: "arrrrrrrrrrrrr@gmail.com",
  //     //   promotedDate: 2023,
  //     //   profile: "https://placehold.co/160",
  //     //   description:'عضو',
  //     //   semester:2
  //     // },
  //     // {
  //     //   id:3,
  //     //   lastname: " فتوحی",
  //     //   firstname:"ارغوان",
  //     //   email: "arrrrrrrrrrrrr@gmail.com",
  //     //   promotedDate: 2023,
  //     //   profile: "https://placehold.co/160",
  //     //   description:'عضو',
  //     //   semester:2
  //     // },
  //     // {
  //     //   id:3,
  //     //   lastname: " فتوحی",
  //     //   firstname:"ارغوان",
  //     //   email: "arrrrrrrrrrrrr@gmail.com",
  //     //   promotedDate: 2023,
  //     //   profile: "https://placehold.co/160",
  //     //   description:'عضو',
  //     //   semester:2
  //     // },
  //     // {
  //     //   id:3,
  //     //   lastname: " فتوحی",
  //     //   firstname:"ارغوان",
  //     //   email: "alice.johnson@example.com",
  //     //   promotedDate: 2023,
  //     //   profile: "https://via.placeholder.com/150?text=Alice",
  //     //   description:'عضو',
  //     //   semester:2
  //     // },

  //   ];

  //   setTimeout(() => {
  //     setMembers(mockMembers);
  //     setLoading(false);
  //   }, 1000); // Simulate network delay
  // }, []);
  const fetchData = async () => {
    setLoading(true);
    console.log(selectedYear);
    try {
      const response = await apiClient.get(
        `/v1/public/councilors?promotedYear=${selectedYear}`,
        // `/v1/public/councilors?promotedYear=1403`,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 && response.data) {
        setMembers(response.data.data);
        console.log(response);
      }
    } catch (err) {
      console.error("Error fetching members:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteMember = async (id: number) => {
    // // Remove the member with the given ID
    // setMembers((prevMembers) => prevMembers.filter((member) => member.id !== id));
    // console.log(`Member with ID 4 deleted`);
    try {
      await apiClient.delete(`/v1/admin/councilors/${id}`);
      console.log("Member deleted successfully");
      setMembers((prevNewsList) =>
        prevNewsList.filter((news) => news.id !== id)
      );
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error deleting members:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedYear]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const year = parseInt(inputYear, 10);
    if (!isNaN(year) && inputYear.length === 4) {
      setSelectedYear(year);
    } else {
      alert("لطفا یک سال 4 رقمی معتبر وارد کنید");
    }
  };

  const handleDeleteClick = (memberId: number) => {
    setCurrentMemberId(memberId);
    setIsModalVisible(true);
  };

  const handleConfirmDelete = () => {
    if (currentMemberId !== null) {
      deleteMember(currentMemberId);
    }
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
    setCurrentMemberId(null);
  };

  return (
    <>
      <Navbar />
      <div className="members-page">
        <div className="header-container">
          <h1>اعضای انجمن</h1>
          {userRole === "SuperAdmin" && (
            <button
              className="addmembers-button"
              onClick={() => navigate("/addmembers")}
            >
              <i className="fa fa-plus" style={{ color: "white" }}></i>
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="year-input">
          <label className="labelform" htmlFor="year">
            سال را وارد کنید:
          </label>
          <div className="form-group">
            <input
              type="text"
              id="year"
              value={inputYear}
              onChange={(e) => setInputYear(e.target.value)}
              placeholder="مثال: 1402"
              maxLength={4}
            />
            <button type="submit">تایید</button>
          </div>
        </form>

        <div className="members-grid">
          {loading ? (
            <p>در حال بارگذاری...</p>
          ) : members.length > 0 ? (
            members.map((member) => (
              <div key={member.id} className="member-card">
                <img
                  src={member.profile}
                  alt={`${member.firstName} ${member.lastName}`}
                  className="member-picture"
                />
                <h3>
                  {member.firstName} {member.lastName}
                </h3>
                <p>{member.description}</p>
                <p>{member.email}</p>
                <p>سال ورود : {member.enteringYear}</p>

                {userRole === "SuperAdmin" && (
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteClick(member.id)}
                  >
                    <i className="fa fa-trash" style={{ color: "#e47f12" }}></i>
                  </button>
                )}
              </div>
            ))
          ) : (
            <p>هیچ عضوی یافت نشد.</p>
          )}
        </div>
        <Modal
          isVisible={isModalVisible}
          message="آیا از حذف این عضو اطمینان دارید؟"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      </div>
    </>
  );
};

export default MembersPage;

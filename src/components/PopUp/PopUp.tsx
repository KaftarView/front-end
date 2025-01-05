import React, { useState } from "react";
import './PopUp.css';

export default function Popup() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const mockData = [
    { id: 1, name: "Alice", age: 25, role: "Developer", status: "Active" },
    { id: 2, name: "Bob", age: 30, role: "Designer", status: "Active" },
    { id: 3, name: "Charlie", age: 28, role: "Manager", status: "On Leave" },
    { id: 4, name: "David", age: 35, role: "Tester", status: "Active" },
    { id: 5, name: "Eva", age: 22, role: "Intern", status: "Inactive" },
    { id: 6, name: "Frank", age: 29, role: "Support", status: "Active" },
    { id: 7, name: "Grace", age: 27, role: "HR", status: "Active" },
    { id: 8, name: "Hannah", age: 33, role: "Analyst", status: "On Leave" },
    { id: 9, name: "Ian", age: 40, role: "CEO", status: "Active" },
    { id: 10, name: "Jack", age: 26, role: "DevOps", status: "Inactive" },
  ];

  return (
    <div>
      <button onClick={handleOpenPopup} className="open-popup-button">
        شرکت کنندگان
      </button>

      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="user-popup">
            <h2>Scrollable Table</h2>
            <div className="pop-table-container">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.age}</td>
                      <td>{item.role}</td>
                      <td>{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button onClick={handleClosePopup} className="close-popup-button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

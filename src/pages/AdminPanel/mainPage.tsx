import React, { useState } from 'react';
import './mainPage.css'
import Navbar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import ShowTickets from './GetTickets';
import GetDiscounts from './GetDiscounts';
import MediaPage from './EventMedia';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const tabs = [
    { id: 0, label: 'ویرایش اطلاعات رویداد', content: <EditEventInfo /> },
    { id: 1, label: 'بلیت‌ها', content: <ShowTickets /> },
    { id: 2, label: 'تخفیف‌ها', content: <GetDiscounts /> },
    { id: 3, label: 'شرکت کننده‌گان', content: <EventSettings /> },
    { id: 4, label: 'فایل‌های رویداد', content: <MediaPage /> },
  ];

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
    setIsDropdownOpen(false); 
  };

  return (
    <>
    <Navbar/>
    <div className='panel-container'>
    <div className="admin-panel">
      <div className="tabs-container">
        {/* Tabs */}
        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dropdown for smaller screens */}
        <div className="dropdown">
          <button className="dropdown-toggle" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            {tabs[activeTab].label} ▾
          </button>
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              {tabs.map((tab) => (
                <li key={tab.id} onClick={() => handleTabClick(tab.id)}>
                  {tab.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="tab-content">{tabs[activeTab].content}</div>
    </div>
    </div>
    <Footer />
    </>
  );
};

// Example Components for Tabs
const EditEventInfo: React.FC = () => <div>Edit Event Information here.</div>;
const ManageAttendees: React.FC = () => <div>Manage Attendees here.</div>;
const EventReports: React.FC = () => <div>View Event Reports here.</div>;
const EventSettings: React.FC = () => <div>Configure Event Settings here.</div>;
const EventNotifications: React.FC = () => <div>Manage Event Notifications here.</div>;

export default AdminPanel;

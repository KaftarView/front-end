import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfilePage from "../ProfilePage/ProfilePage";
import Navbar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import "./ProfileEvent.css";
import apiClient from "../../utils/apiClient";

// Define the Event interface
interface Event {
  id: number;
  basePrice:number;
  banner: string;
  name: string;
  description: string;
  location: string;
  status: string;
  venueType: string;
  categories: string[];
  createdAt: string;
  fromDate: string;
  toDate: string;
}

const ProfileEvent = () => {
  const [events, setEvents] = useState<Event[]>([]); 
  const [loading, setLoading] = useState(true); 

  const navigate = useNavigate();

  const handleSubmit = (eventId: number) => {
    navigate(`/event/${eventId}`); 
  };

    useEffect(() => {
      const fetchEvents = async () => {
        setLoading(true);
        try {
          const response = await apiClient.get('v1/profile/events' ,
            {
              headers: {
                "ngrok-skip-browser-warning": "69420",
                "Content-Type": "application/json",
              },
            }
          ); 
          if (response.status === 200 && response.data) {
            console.log(response.data.data);
            setEvents(response.data.data);
          }
          
        } catch (error) {
          console.error('Error fetching events:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchEvents();
    }, []);

    if (loading) {
      return <div>Loading...</div>;
    }

  // useEffect(() => {
  //   // Mock data for testing
  //   const mockData: Event[] = [
  //     {
  //       id: 1,
  //       banner: "https://via.placeholder.com/150",
  //       basePrice:100,
  //       name: "Event 1",
  //       description: "Description for Event 1",
  //       location: "Location 1",
  //       status: "Ongoing",
  //       venueType: "Online",
  //       categories: ["Category1", "Category2"],
  //       createdAt: "2024-12-01",
  //       fromDate: "2024-12-10",
  //       toDate: "2025-12-20",
  //     },
  //     {
  //       id: 2,
  //       banner: "https://via.placeholder.com/150",
  //       basePrice:100,
  //       name: "Event 2",
  //       description: "Description for Event 2",
  //       location: "Location 2",
  //       status: "Upcoming",
  //       venueType: "Offline",
  //       categories: ["Category3"],
  //       createdAt: "2024-11-20",
  //       fromDate: "2024-12-15",
  //       toDate: "2025-12-25",
  //     },
  //     {
  //       id: 2,
  //       banner: "https://via.placeholder.com/150",
  //       basePrice:100,
  //       name: "Event 2",
  //       description: "Description for Event 2",
  //       location: "Location 2",
  //       status: "Upcoming",
  //       venueType: "Offline",
  //       categories: ["Category3"],
  //       createdAt: "2024-11-20",
  //       fromDate: "2024-12-15",
  //       toDate: "2025-12-25",
  //     },
  //     {
  //       id: 2,
  //       banner: "https://via.placeholder.com/150",
  //       basePrice:100,
  //       name: "Event 2",
  //       description: "Description for Event 2",
  //       location: "Location 2",
  //       status: "Upcoming",
  //       venueType: "Offline",
  //       categories: ["Category3"],
  //       createdAt: "2024-11-20",
  //       fromDate: "2024-12-15",
  //       toDate: "2025-12-25",
  //     },
      // {
      //   id: 2,
      //   banner: "https://via.placeholder.com/150",
      //   name: "Event 2",
      //   description: "Description for Event 2",
      //   location: "Location 2",
      //   status: "Upcoming",
      //   venue_type: "Offline",
      //   categories: ["Category3"],
      //   created_at: "2024-11-20",
      //   from_date: "2024-12-15",
      //   to_date: "2024-12-25",
      // },
      // {
      //   id: 2,
      //   banner: "https://via.placeholder.com/150",
      //   name: "Event 2",
      //   description: "Description for Event 2",
      //   location: "Location 2",
      //   status: "Upcoming",
      //   venue_type: "Offline",
      //   categories: ["Category3"],
      //   created_at: "2024-11-20",
      //   from_date: "2024-12-15",
      //   to_date: "2024-12-25",
      // },
      // {
      //   id: 2,
      //   banner: "https://via.placeholder.com/150",
      //   name: "Event 2",
      //   description: "Description for Event 2",
      //   location: "Location 2",
      //   status: "Upcoming",
      //   venue_type: "Offline",
      //   categories: ["Category3"],
      //   created_at: "2024-11-20",
      //   from_date: "2024-12-15",
      //   to_date: "2024-12-25",
      // },
      // {
      //   id: 2,
      //   banner: "https://via.placeholder.com/150",
      //   name: "Event 2",
      //   description: "Description for Event 2",
      //   location: "Location 2",
      //   status: "Upcoming",
      //   venueType: "Offline",
      //   categories: ["Category3"],
      //   createdAt: "2024-11-20",
      //   from_date: "2024-12-15",
      //   to_date: "2024-12-25",
      // },
      // {
      //   id: 2,
      //   banner: "https://via.placeholder.com/150",
      //   name: "Event 2",
      //   description: "Description for Event 2",
      //   location: "Location 2",
      //   status: "Upcoming",
      //   venueType: "Offline",
      //   categories: ["Category3"],
      //   createdAt: "2024-11-20",
      //   fromDate: "2024-12-15",
      //   toDate: "2024-12-25",
      // },
  //   ];

  //   setTimeout(() => {
  //     setEvents(mockData);
  //     setLoading(false);
  //   }, 1000); // Simulate network delay
  // }, []);


  const calculateProgress = (fromDate: string, toDate: string): number => {
    if (!fromDate || !toDate) {
      console.error("Missing fromDate or toDate:", { fromDate, toDate });
      return 0; 
    }

    const start = new Date(fromDate).getTime();
    const end = new Date(toDate).getTime();
    const now = Date.now();

    if (isNaN(start) || isNaN(end)) {
      console.error("Invalid date format for fromDate or toDate:", {
        fromDate,
        toDate,
      });
      return 0;
    }

    if (now < start) return 0; 
    if (now > end) return 100; 

    const totalDuration = end - start;
    const elapsedDuration = now - start;

    return Math.round((elapsedDuration / totalDuration) * 100); 
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />

      {/* <div className="content-wrapperPersonalInfo"> */}
      <div className="container">
        <ProfilePage />


        <main className="main-content">
          <h2>رویداد‌های من</h2>
          <div className="grid-container">
            {events.map((event) => (
              <div key={event.id} className="event-card">
                <img
                  src={event.banner}
                  alt={event.name}
                  className="event-image"
                />
                <div className="event-card-content">
                  <h3>{event.name}</h3>
                  <p>مدرس: {event.description}</p>
                 
                  <div className="progress-containerProfile">
                    <div className="progress-bar-backgroundProfile">
                      <div
                        className="progress-barProfile"
                        style={{
                          width: `${calculateProgress(
                            event.fromDate,
                            event.toDate
                          )}%`,
                        }}
                      ></div>
                    </div>
                    <span className="progress-text">
                      {calculateProgress(event.fromDate, event.toDate)}%
                    </span>
                  </div>

                  <button
                    type="button"
                    className="buttonE"
                    onClick={() => handleSubmit(event.id)}
                  >
                    ادامه دوره
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default ProfileEvent;

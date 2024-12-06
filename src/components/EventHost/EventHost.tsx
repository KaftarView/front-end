// EventHost.tsx  
import React from 'react';  
import './EventHost.css';  

interface EventHostProps {  
  eventId: string;
}  

const EventHost: React.FC<EventHostProps> = ({ eventId }) => {  
    const hosts = [
        {
          name: "John Doe",
          description: "An experienced event host who brings energy and enthusiasm to every event.",
          photoUrl: "https://via.placeholder.com/150",
        },
        {
          name: "Jane Smith",
          description: "A professional host with years of experience in corporate and social events.",
          photoUrl: "https://via.placeholder.com/150",
        },
        {
          name: "Alex Johnson",
          description: "Known for creative event hosting and engaging with diverse audiences.",
          photoUrl: "https://via.placeholder.com/150",
        }];

  return (  
    <div className="event-hosts">
      {hosts.map((host, index) => (
        <div key={index} className="event-host">
          <img
            src={host.photoUrl}
            alt={host.name}
            className="event-host-photo"
          />
          <div className="event-host-info">
            <h3>{host.name}</h3>
            <p>{host.description}</p>
          </div>
        </div>
      ))}
    </div>
  );  
};  

export default EventHost;  
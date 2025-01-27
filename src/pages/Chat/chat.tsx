import  { useEffect, useRef, useState } from 'react';
import apiClient from '../../utils/apiClient';
import {User , useAuth} from '../../components/AuthContext'
// import axios from 'axios';


//// Types
interface UserDetailsResponse {
  name: string;
  email: string;
}

interface RoomDetailsResponse {
  id: number;
  tag: string;
  admins: UserDetailsResponse[];
}

interface MessageDetailsResponse {
  sender: UserDetailsResponse;
  content: string;
}

//  const API_BASE_URL = 'http://api.cesaiust.ir'; 

// ChatService for API and WebSocket management
const token = localStorage.getItem('access_token');


const ChatService = {
   
  async getUserGroups(): Promise<RoomDetailsResponse[]> {
    try {
      const response = await apiClient.post(`/v1/chat/room`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response) {
        throw new Error(`Error fetching user groups: ${response}`);
      }
      console.log("-------------getting group");
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error('Error in getUserGroups:', error);
      throw error;
    }
  },

  async createNewGroup(): Promise<RoomDetailsResponse> {
    try {
      const response = await apiClient.post(`/v1/chat/room`, {
        // method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userIds: [localStorage.getItem('userId')],
        }),
      });
      if (!response) {
        throw new Error(`Error creating room: ${response}`);
      }
      console.log("-------------create group");
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error('Error in createNewGroup:', error);
      throw error;
    }
  },

  async fetchMessages(roomId: number): Promise<MessageDetailsResponse[]> {
    try {
      const response = await apiClient.get(`/v1/chat/room/${roomId}/messages`, {
        headers: {
            'ngrok-skip-browser-warning': '69420',
          Authorization: `Bearer ${token}`,
        },
      });
        // if (!token) {
        // throw new Error('No authorization token found in localStorage');
        // }
      if (!response) {
        throw new Error(`Error fetching messages: ${response}`);
      }
      console.log("-----------------MESSAGES");
      console.log(response.data);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  },
};

const ChatSupport: React.FC = () => {
  const [groups, setGroups] = useState<RoomDetailsResponse[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<RoomDetailsResponse | null>(null);
  const [messages, setMessages] = useState<MessageDetailsResponse[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const socketRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { getUserUsername} = useAuth();
  const username=getUserUsername();
  const currentUserName = username;
  

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const userGroups = await ChatService.getUserGroups();
        setGroups(userGroups);
      } catch (error) {
        console.error('Error fetching user groups:', error);
      }
    };

    fetchGroups();
  }, []);

  const handleCreateNewGroup = async () => {
    try {
      const newRoom = await ChatService.createNewGroup();
      console.log("-------------Room ID")
      console.log(newRoom);
      setSelectedRoom(newRoom);

      const messages = await ChatService.fetchMessages(newRoom.id);
      setMessages(messages);

      connectToWebSocket(newRoom.id);
    } catch (error) {
      console.error('Error creating new group:', error);
    }
  };

//   const connectToWebSocket = (roomId: number) => {
//     // const token = localStorage.getItem('access_to');
//     if (token) {
//       // Close existing socket if open
//       console.log("---------test socketRef: "+socketRef.current)
//       console.log(socketRef.current)
//       if (socketRef.current) {
//         console.log("---------test socketRef: "+socketRef.current)
//         socketRef.current.close();
//       }
//       console.log("--------test const 1")
//       const socket = new WebSocket(
//         `wss://7cdb-212-64-199-253.ngrok-free.app/v1/ws/chat/room/${roomId}/token/${token}`
//       );
//       console.log("--------test const 2")
//       console.log(socket)
//       socketRef.current = socket;
//       console.log("--------test const 3")

//       socket.addEventListener('open', () => {
//         console.log('WebSocket connected successfully');
//       });
//       console.log("--------test const 4")

//  socket.onmessage = (event) => {
//         try
// {        const data = event.data;

//     console.log("------------event data---------ERROR")
//     console.log(data);
//     // console.log("---------PREV")

//         // setMessages((prevMessages) => [...prevMessages, data]);
//         // setMessages((prevMessages) => {
//         //     const updatedMessages = [...prevMessages, data];
//         //     console.log("Updated messages array:", prevMessages); // Log the updated messages array

//         //     console.log(updatedMessages);
//         //     return updatedMessages;
//         //   });
//         const username1: UserDetailsResponse = {  
//             name: username,  
//             email: "test@gmail.com"  
//           };  
          
//           // Simulating an event with data  

          
//           // Creating the datattt object with the proper typing  
//           const datattt: MessageDetailsResponse = {  
//             sender: username1, // sender conforms to the UserDetailsResponse structure  
//             content: event.data // content is a string  
//           };
//         setMessages((prevMessages) => [...prevMessages, datattt]);
  
    
    
//     }
//         catch{
//             console.error('Error parsing message:');
//         }
//       };

//       socket.onerror = (event) => {
//         console.error('WebSocket error:', event);
//       };


//       socket.onclose = (event) => {
//         // let retries=0;
//         // if (retries<20)
//         // {
//         //   setTimeout(()=>
//         //     ChatService.connectToRoom(roomId),1000);
//         //   retries+=1;
//         // }
//         // else{
//           console.log(`WebSocket closed for room ${roomId}`);
//         // }
        

//       };
//     }
//   };








const connectToWebSocket = (roomId: number) => {
  if (token) {
    // Close existing socket if open
    if (socketRef.current) {
      socketRef.current.onmessage = null;
      socketRef.current.onclose = null;
      socketRef.current.onerror = null;
      socketRef.current.close();
    }

    let retries = 0; // Variable to count retries
    const maxRetries = 30; // Maximum retries to prevent infinite loops
    const delay = 1000; // Initial retry delay (1 second)

    const establishConnection = () => {
      const socket = new WebSocket(
        `wss://24ab-212-64-199-253.ngrok-free.app/v1/ws/chat/room/${roomId}/token/${token}`
      );

      socketRef.current = socket;

      socket.addEventListener('open', () => {
        console.log('WebSocket connected successfully');
        
        retries = 0; // Reset retries on successful connection
      });

      socket.onmessage = (event) => {
        try {
          //const data = event.data;
          console.log(currentUserName)
          const username1: UserDetailsResponse = {
            name: username,
            email: 'test@gmail.com',
          };

          const datattt: MessageDetailsResponse = {
            sender: username1,
            content: event.data,
          };
          setMessages((prevMessages) => [...prevMessages, datattt]);
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };

      socket.onerror = (event) => {
        console.error('WebSocket error:', event);
      };

      socket.onclose = (event) => {
        if (retries < maxRetries) {
          console.log(`WebSocket closed. Retrying in ${delay / 1000} seconds...`);
          setTimeout(() => {
            retries += 1;
            establishConnection(); // Try reconnecting
          }, delay);

          // Optionally increase delay for each retry (e.g., exponential backoff)
        } else {
          console.log(`WebSocket closed for room ${roomId}. Max retries reached.`);
        }
      };
    };

    establishConnection(); // Attempt to establish the WebSocket connection
  }
};


  const handleGroupSelect = async (group: RoomDetailsResponse) => {
    try {
      setSelectedRoom(group);
      console.log('-----------Group ID:'+group.id)
      const messages = await ChatService.fetchMessages(group.id);
      
      console.log("-----------Done massage :")
      console.log(messages)
      setMessages(messages);
      console.log
      connectToWebSocket(group.id);
    } catch (error) {
      console.error('Error selecting group:', error);
    }
  };

  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !socketRef.current) return;

    const messagePayload = { 
      content: newMessage 
    };
    console.log("------------------New Message Handle");
    console.log(newMessage);
    console.log("------------------New Message Json");
    console.log(messagePayload.content);
    socketRef.current.send(messagePayload.content);
    setNewMessage('');
  };
  const totalMessages = messages.length;
  return (
    
    <div>
      <div className="fixed inset-0 w-full h-full bg-white shadow-lg flex flex-col lg:flex-row">
  {/* Sidebar for Groups List */}
  <div className="lg:w-1/4 bg-gray-200 text-black p-4 space-y-4 lg:h-full flex-shrink-0">
    <h3 className="font-semibold">پشتیبانی آنلاین</h3>
    {selectedRoom?.tag && (
      <span className="text-sm text-gray-600">{selectedRoom.tag}</span>
    )}

    {/* Groups List */}
    <div className="flex-1 overflow-y-auto">
      {groups.length > 0 ? (
        groups.map((group) => (
          <div
            key={group.id}
            className="flex justify-between items-center cursor-pointer hover:bg-gray-300 p-2 rounded"
            onClick={() => handleGroupSelect(group)}
          >
            <div className="font-medium">{group.tag || `گروه ${group.id}`}</div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-600">
          گروهی پیدا نشد. شما می‌توانید گروه جدیدی بسازید.
        </div>
      )}

      {groups.length === 0 && (
        <button
          onClick={handleCreateNewGroup}
          className="mt-4 bg-gray-300 text-black px-3 py-1 rounded text-sm hover:bg-gray-400"
        >
          ساخت گروه جدید
        </button>
      )}
    </div>
          {/* Back to Home Button */}
          <div className="mt-auto self-center">
        <button
          onClick={() => window.location.href = '/'} // Adjust this to your home page route
          className="bg-blue-800 text-white px-5 py-1 rounded text-xs hover:bg-red-600"
        >
          بازگشت به صفحه اصلی
        </button>
      </div>
  </div>

  {/* Main Content Area for Messages */}
  <div className="flex-1 flex flex-col lg:w-3/4">
    {/* Messages */}
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg, index) => (
        <div key={index} className="flex">
          <div       className= 
         "p-3 rounded-lg max-w-md bg-gray-200 text-black self-start"
    >
          <div className="text-sm font-semibold">
          { msg.sender.name}
        </div>
            <div className="text-sm">{msg.content}</div>
            <div className="text-xs text-gray-500 mt-1"></div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>

    {/* Input */}
    <form onSubmit={handleSendMessage} className="p-4 border-t bg-white">
      <div className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="پیام خود را وارد کنید..."
          className="flex-1 border rounded px-3 py-2"
          aria-label="پیام خود را تایپ کنید"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          aria-label="ارسال پیام"
        >
          ارسال
        </button>
      </div>
    </form>
  </div>
</div>

    </div>

  );
};

export default ChatSupport;

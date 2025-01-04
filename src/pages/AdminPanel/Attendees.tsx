import React , {useEffect , useState} from 'react'
import './Attendees.css'
import * as XLSX from 'xlsx';
import { Download } from 'lucide-react';
interface Attendee 
{
    id : number,
    name :string,
    email : string,
    phoneNumber : string,
    ticketType : string,
    paid : number,

}
interface SendEmail {
  eventid: number;
  email2: string;
}


const attendeesList: Attendee[] = [  
    {  
        id : 1,
        name: "John Doe",  
        email: "john.doe@example.com",  
        phoneNumber: "123-456-7890",  
        ticketType: "VIP",  
        paid: 150.00  
    },  
    {  
        id: 2,
        name: "Jane Smith",  
        email: "jane.smith@example.com",  
        phoneNumber: "987-654-3210",  
        ticketType: "General Admission",  
        paid: 75.00  
    },  
    {  
        id: 3,
        name: "Alice Johnson",  
        email: "alice.johnson@example.com",  
        phoneNumber: "555-123-4567",  
        ticketType: "Early Bird",  
        paid: 50.00  
    },  
    {  
        id: 4,
        name: "Bob Brown",  
        email: "bob.brown@example.com",  
        phoneNumber: "555-765-4321",  
        ticketType: "Student",  
        paid: 30.00  
    }  
];
type SortField = 'id' | 'name' | 'phoneNumber' | 'email' | 'ticketType' | 'paid';
type SortOrder = 'asc' | 'desc';
const GetAttendees: React.FC = () => {
    const [attendees , setAttendees] = useState<Attendee[]>(attendeesList);
    const [sortField, setSortField] = useState<SortField>('id');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

    const [sendEmailData, setSendEmailData] = useState<SendEmail>({ eventid: 0, email2: '' });

    const handleSort = (field: SortField) => {
        const newSortOrder = field === sortField && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(newSortOrder);
    
        const sortedTickets = [...attendees].sort((a, b) => {
          const aValue = a[field];
          const bValue = b[field];
    
          if (typeof aValue === 'string' && typeof bValue === 'string') {
            return newSortOrder === 'asc'
              ? aValue.localeCompare(bValue)
              : bValue.localeCompare(aValue);
          }
    
          if (typeof aValue === 'number' && typeof bValue === 'number') {
            return newSortOrder === 'asc' ? aValue - bValue : bValue - aValue;
          }
    
          if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
            return newSortOrder === 'asc'
              ? Number(aValue) - Number(bValue)
              : Number(bValue) - Number(aValue);
          }
    
          return 0;
        });
    
        setAttendees(sortedTickets);
      };
    const getSortIcon = (field: SortField) => {
        if (field !== sortField) return '↕️';
        return sortOrder === 'asc' ? '↑' : '↓';
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(attendees.map(attendee => ({
          'Name': attendee.name,
          'Email': attendee.email,
          'Phone Number': attendee.phoneNumber,
          'Ticket Type': attendee.ticketType,
          'Amount Paid': attendee.paid
        })));
    
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendees');
        XLSX.writeFile(workbook, 'attendees.xlsx');
      };

    const totalPaid = attendees.reduce((total, attendee) => total + attendee.paid, 0);
    const numberOfAttendees = attendees.length;
    
    const handleSendEmail = async () => {
      const { eventid, email2 } = sendEmailData;
  
      if (!eventid || !email2) {
        alert('Please provide both the event ID and email address.');
        return;
      }}
    return (
        <div className="min-h-screen bg-white-100 p-8 no-padding">
          
            <div className='sold-tickets-panel'>
            <h5>وضعیت بلیت های فروش رفته :</h5>
            <h6>تعداد کل شرکت کننده‌گان : {numberOfAttendees}</h6>
            <h6>کل مبلغ دریافتی: {totalPaid} هزار      تومان</h6>

            <button
              onClick={exportToExcel}
              className="download-excel-button"
            >
              <Download size={20} />
              دانلود گزارش اکسل
            </button>
            </div>

          <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md">

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6"> شرکت کننده‌گان</h2>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        className="px-6 py-3 text-center text-medium font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('id')}
                      >
                       
                      </th>
                      <th
                        className="px-6 py-3 text-center text-medium font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('name')}
                      >
                        نام {getSortIcon('name')}
                      </th>
                      <th
                        className="px-6 py-3 text-center text-medium font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('phoneNumber')}
                      >
                        شماره تلفن {getSortIcon('phoneNumber')}
                      </th>
                      <th
                        className="px-6 py-3 text-center text-medium font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('email')}
                      >
                        ایمیل {getSortIcon('email')}
                      </th>
                      <th
                        className="px-6 py-3 text-center text-medium font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('ticketType')}
                      >
                        بلیت {getSortIcon('ticketType')}
                      </th>
                      <th
                        className="px-6 py-3 text-center text-medium font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('paid')}
                      >
                        پرداختی {getSortIcon('paid')}
                      </th>
                      <th className="px-6 py-3 text-center text-medium font-medium text-gray-500 uppercase tracking-wider">
                        عملیات
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {attendees.map((attendee , index) => (
                      <tr key={attendee.id} className="hover:bg-gray-50">
                        <td className="px-6 text-center py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                        <td className="px-6 text-center py-4 whitespace-nowrap text-sm text-gray-900">{attendee.name}</td>
                        <td className="px-6 text-center py-4 whitespace-nowrap text-sm text-gray-900">${attendee.phoneNumber}</td>
                        <td className="px-6 text-center py-4 text-sm text-gray-900">{attendee.email}</td>
                        <td className="px-6 text-center py-4 text-sm text-gray-900">{attendee.ticketType}</td>
                        <td className="px-6 text-center py-4 text-sm text-gray-900">{attendee.paid}</td>
                        <td className="px-3 text-center py-4 text-large text-gray-900">
                          <i className="fa fa-trash-o text-red-500 cursor-pointer mx-2" aria-hidden="true"></i>
                          <i className="fa fa-pencil-square-o text-blue-500 cursor-pointer mx-2" aria-hidden="true"></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

          </div>
          <div className='sold-tickets-panel'>
          <h5>متن ایمیل:</h5>
          </div>
          <div className="mb-4">

            <textarea
              value={sendEmailData.email2}
              onChange={(e) => setSendEmailData({ ...sendEmailData, email2: e.target.value })}
              placeholder="Enter Email"
              className="textarea-fieldevent"
              
            />


          </div>
          <button onClick={handleSendEmail} className="event">
              ارسال به شرکت کنندگان
            </button>
        </div>
      );
}
    
export default GetAttendees



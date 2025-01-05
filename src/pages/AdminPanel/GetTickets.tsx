import React, { useState , useEffect } from 'react';
import './GetTickets.css';
import axios from 'axios'
import apiClient from '../../utils/apiClient'
import PopupQuestion from '../../components/PopupQuestion/PopopQuestion'
import * as XLSX from 'xlsx';
import { Download } from 'lucide-react';

interface Ticket {
  id: number;
  name: string;
  price: number;
  isAvailable: boolean;
  availableFrom: string;
  availableUntil: string;
  createdAt: string;
  description?: string;
  quantity?: number;
}

// Mock data
const mockTickets: Ticket[] = [
  {
    id: 1,
    name: 'VIP Ticket',
    price: 100,
    isAvailable: true,
    availableFrom: '2024-12-27T09:00:00Z',
    availableUntil: '2025-01-05T23:59:59Z',
    createdAt: '2024-12-01T12:00:00Z',
    description: 'Exclusive access to the VIP lounge with complimentary drinks.',
    quantity: 50,
  },
  {
    id: 2,
    name: 'Standard Ticket',
    price: 50,
    isAvailable: true,
    availableFrom: '2024-12-27T09:00:00Z',
    availableUntil: '2025-01-05T23:59:59Z',
    createdAt: '2024-12-01T12:00:00Z',
    description: 'Standard access to the event.',
    quantity: 200,
  },
];

type SortField = 'id' | 'name' | 'price' | 'description' | 'isAvailable' | 'quantity' | 'availableFrom'| 'availableUntil';
type SortOrder = 'asc' | 'desc';

function App() {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTicketId , setCurrentNewsId] = useState<number | null>(null); 
  const [isModalVisible, setIsModalVisible] = useState(false); 


  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiClient.get('/v1/admin/events/7/tickets' , {
          headers: {  
            "ngrok-skip-browser-warning": "69420",  
            'Content-Type': 'application/json',
          },  
        });
        console.log(response.data.data)
        setTickets(response.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'An error occurred while fetching tickets.');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const handleSort = (field: SortField) => {
    const newSortOrder = field === sortField && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newSortOrder);

    const sortedTickets = [...tickets].sort((a, b) => {
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

    setTickets(sortedTickets);
  };

  const deleteDiscountById = async (ticketId: number) => {  
    try {  
      await apiClient.delete(`/v1/admin/events/ticket/${ticketId}`);  
      console.log('News deleted successfully'); 
      alert("بلیت با موفقیت حذف شد") 
      setTickets((prevTicketList) => prevTicketList.filter((ticket) => ticket.id !== ticketId));  
      setIsModalVisible(false);  
    } catch (error : any) {  
      console.error('Error deleting news:', error); 
      alert(error.response?.data?.message || 'An error occurred while fetching discounts.') 
    }  
  };  

  const handleDeleteClick = (discountId: number) => {  
    setCurrentNewsId(discountId);  
    setIsModalVisible(true);  
  };  

  const handleConfirmDelete = () => {  
    if (currentTicketId !== null) {  
      deleteDiscountById(currentTicketId);  
    }  
  };  

  const handleCancelDelete = () => {  
    setIsModalVisible(false);  
    setCurrentNewsId(null);  
  };  
  

  const getSortIcon = (field: SortField) => {
    if (field !== sortField) return '↕️';
    return sortOrder === 'asc' ? '↑' : '↓';
  };
  const exportToExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(
    tickets.map(ticket => ({
      'Ticket ID': ticket.id,
      'Name': ticket.name,
      'Price': ticket.price,
      'Available': ticket.isAvailable ? 'Yes' : 'No',
      'Available From': ticket.availableFrom,
      'Available Until': ticket.availableUntil,
      'Created At': ticket.createdAt,
      'Description': ticket.description || 'N/A',
      'Quantity': ticket.quantity !== undefined ? ticket.quantity : 'Unlimited',
    }))
  );
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendees');
  XLSX.writeFile(workbook, 'attendees.xlsx');
}

  return (
    <div className="min-h-screen bg-white-100 p-8 no-padding">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md">
        <div className="p-6">
        <button
              onClick={exportToExcel}
              className="download-excel-button"
            >
              <Download size={20} />
              دانلود گزارش اکسل
            </button>
          <h2 className="text-2xl font-bold mb-6">بلیت ها</h2>
          <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
  <thead className="bg-gray-50">
    <tr>
      <th
        className="px-6 py-3 text-center text-medium font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
        onClick={() => handleSort('id')}
      >
        #
      </th>
      <th
        className="px-6 py-3 text-center text-medium font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
        onClick={() => handleSort('name')}
      >
        عنوان {getSortIcon('name')}
      </th>
      <th
        className="px-6 py-3 text-center text-medium font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
        onClick={() => handleSort('price')}
      >
        قیمت {getSortIcon('price')}
      </th>
      <th
        className="px-6 py-3 text-center text-medium font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
        onClick={() => handleSort('description')}
      >
        توضیحات {getSortIcon('description')}
      </th>
      <th
        className="px-6 py-3 text-center text-medium font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
        onClick={() => handleSort('availableFrom')}
      >
        شروع اعتبار {getSortIcon('availableFrom')}
      </th>
      <th
        className="px-6 py-3 text-center text-medium font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
        onClick={() => handleSort('availableUntil')}
      >
        پایان اعتبار {getSortIcon('availableUntil')}
      </th>
      <th
        className="px-6 py-3 text-center text-medium font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
        onClick={() => handleSort('isAvailable')}
      >
        اعتبار {getSortIcon('isAvailable')}
      </th>
      <th
        className="px-6 py-3 text-center text-medium font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
        onClick={() => handleSort('quantity')}
      >
        تعداد {getSortIcon('quantity')}
      </th>
      <th className="px-6 py-3 text-center text-medium font-medium text-gray-500 uppercase tracking-wider">
        عملیات
      </th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    {tickets.map((ticket, index) => (
      <tr key={ticket.id} className="hover:bg-gray-50">
        <td className="px-6 text-center py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
        <td className="px-6 text-center py-4 whitespace-nowrap text-sm text-gray-900">{ticket.name}</td>
        <td className="px-6 text-center py-4 whitespace-nowrap text-sm text-gray-900">{ticket.price}</td>
        <td className="px-6 text-center py-4 text-sm text-gray-900">{ticket.description}</td>
        <td className="px-6 text-center py-4 text-sm text-gray-900">
        {new Date(ticket.availableFrom).toLocaleDateString("fa-IR", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                        })}
        </td>
        <td className="px-6 text-center py-4 text-sm text-gray-900">
        {new Date(ticket.availableUntil).toLocaleDateString("fa-IR", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                        })}
        </td>
        <td className="px-6 text-center py-4 text-sm text-gray-900">{ticket.isAvailable ? 'معتبر' : 'نامعتبر'}</td>
        <td className="px-6 text-center py-4 text-sm text-gray-900">{ticket.quantity ?? 'N/A'}</td>
        <td className="px-3 text-center py-4 text-large text-gray-900">
          <i className="fa fa-trash-o text-red-500 cursor-pointer mx-2" onClick={() => handleDeleteClick(ticket.id)} aria-hidden="true"></i>
          <i className="fa fa-pencil-square-o text-blue-500 cursor-pointer mx-2" aria-hidden="true"></i>
        </td>
      </tr>
    ))}
  </tbody>
</table>
          </div>
        </div>
      </div>
      <PopupQuestion   
                  isVisible={isModalVisible}  
                  message = "آیا از حذف این خبر اطمینان دارید؟"
                  onConfirm={handleConfirmDelete}  
                  onCancel={handleCancelDelete}  
                />  
      <button className='add-ticket-panel-button'>اضافه کردن بلیت</button>
    </div>
  );
}

export default App;

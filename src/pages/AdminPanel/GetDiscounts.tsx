// src/components/GetDiscounts.tsx  

import React, { useState, useEffect } from 'react';  
import apiClient from '../../utils/apiClient';  
import PopupQuestion from '../../components/PopupQuestion/PopopQuestion'
import * as XLSX from 'xlsx';
import { Download } from 'lucide-react';
import { useParams } from 'react-router-dom';

interface Discount {  
  validFrom: string;  
  validUntil: string;  
  code: string;  
  createdAt: string;  
  id: number;  
  minTickets: number;  
  quantity: number;  
  type: 'Fixed' | 'Percentage';  
  usedCount: number;  
  value: number;  
}  

// const mockDiscounts: Discount[] = [  
//   {  
//     availableFrom: "2024-12-05T16:22:00+03:30",  
//     availableUntil: "2024-12-21T16:22:00+03:30",  
//     code: "r4",  
//     createdAt: "2024-12-28T12:53:00.569+03:30",  
//     id: 1,  
//     minTickets: 1,  
//     quantity: 43,  
//     type: "Fixed",  
//     usedCount: 0,  
//     value: 44,  
//   },  
//   {  
//     availableFrom: "2024-12-05T16:22:00+03:30",  
//     availableUntil: "2024-12-21T16:22:00+03:30",  
//     code: "r4",  
//     createdAt: "2024-12-28T12:53:00.569+03:30",  
//     id: 2,  
//     minTickets: 1,  
//     quantity: 43,  
//     type: "Fixed",  
//     usedCount: 0,  
//     value: 44,  
//   },  
// ];  
type SortField = 'id'  | 'quantity' | 'type' | 'value' | 'validFrom' | 'validUntil' | 'usedCount';
type SortOrder = 'asc' | 'desc';

function GetDiscounts() {  
  const [discounts, setDiscounts] = useState<Discount[]>([]);  
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState<string | null>(null);  
  const [currentDiscountId , setCurrentNewsId] = useState<number | null>(null); 
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const { id } = useParams();

  useEffect(() => {  
    const fetchDiscounts = async () => {  
      setLoading(true);  
      setError(null);  

      try {  
        const response = await apiClient.get(`/v1/admin/events/${id}/discounts`, {  
          headers: {  
            "ngrok-skip-browser-warning": "69420",  
            'Content-Type': 'application/json',  
          },  
        });  
        setDiscounts(response.data.data); 
        console.log(response.data.data) 
      } catch (err: any) {  
        setError(err.response?.data?.message || 'An error occurred while fetching discounts.');  
      } finally {  
        setLoading(false);  
      }  
    };  

    fetchDiscounts();  
  }, []);  

  const handleSort = (field: SortField) => {
    const newSortOrder = field === sortField && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newSortOrder);

    const sortedTickets = [...discounts].sort((a, b) => {
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

    setDiscounts(sortedTickets);
  };

  const deleteDiscountById = async (discountId: number) => {  
    try {  
      await apiClient.delete(`/v1/admin/events/discount/${discountId}`);  
      console.log('News deleted successfully'); 
      alert("تخفیف با موفقیت حذف شد") 
      setDiscounts((prevDiscountList) => prevDiscountList.filter((discount) => discount.id !== discountId));  
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
    if (currentDiscountId !== null) {  
      deleteDiscountById(currentDiscountId);  
    }  
  };  

  const handleCancelDelete = () => {  
    setIsModalVisible(false);  
    setCurrentNewsId(null);  
  };  
  
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(discounts.map(discount => ({
      'Discount Code': discount.code,
      'Type': discount.type,
      'Value': discount.value,
      'Minimum Tickets Required': discount.minTickets,
      'Quantity Available': discount.quantity,
      'Used Count': discount.usedCount,
      'Available From': discount.validFrom,
      'Available Until': discount.validUntil,
      'Created At': discount.createdAt,
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendees');
    XLSX.writeFile(workbook, 'attendees.xlsx');
  };


  const getSortIcon = (field: SortField) => {
    if (field !== sortField) return '↕️';
    return sortOrder === 'asc' ? '↑' : '↓';
  };

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
          <h2 className="text-2xl font-bold mb-6">تخفیف ها</h2>  
          {loading && <p>Loading discounts...</p>}  
          {error && <p className="text-red-600">{error}</p>}  
          <div className="overflow-x-auto">  
          <table className="min-w-full divide-y divide-gray-200">
  <thead className="bg-gray-50">
    <tr>
      <th className="px-6 py-3 text-center text-medium font-medium text-gray-500 cursor-pointer uppercase tracking-wider" onClick={() => handleSort('id')}>#</th>
      <th className="px-6 py-3 text-center text-medium font-medium text-gray-500 cursor-pointer uppercase tracking-wider">کد</th>
      <th className="px-6 py-3 text-center text-medium font-medium text-gray-500 cursor-pointer uppercase tracking-wider" onClick={() => handleSort('quantity')}>تعداد {getSortIcon('quantity')}</th>
      <th className="px-6 py-3 text-center text-medium font-medium text-gray-500 cursor-pointer uppercase tracking-wider" onClick={() => handleSort('type')}>نوع {getSortIcon('type')}</th>
      <th className="px-6 py-3 text-center text-medium font-medium text-gray-500 cursor-pointer uppercase tracking-wider" onClick={() => handleSort('value')}>مقدار {getSortIcon('value')}</th>
      <th className="px-6 py-3 text-center text-medium font-medium text-gray-500 cursor-pointer uppercase tracking-wider" onClick={() => handleSort('validFrom')}>شروع اعتبار {getSortIcon('validFrom')}</th>
      <th className="px-6 py-3 text-center text-medium font-medium text-gray-500 cursor-pointer uppercase tracking-wider" onClick={() => handleSort('validUntil')}>پایان اعتبار {getSortIcon('validUntil')}</th>
      <th className="px-6 py-3 text-center text-medium font-medium text-gray-500 cursor-pointer uppercase tracking-wider" onClick={() => handleSort('usedCount')}>استفاده‌شده {getSortIcon('usedCount')}</th>
      <th className="px-6 py-3 text-center text-medium font-medium text-gray-500 cursor-pointer uppercase tracking-wider">عملیات</th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    {discounts.map((discount , index) => (
      <tr key={discount.id} className="hover:bg-gray-50">
        <td className="px-6 text-center py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
        <td className="px-6 text-center py-4 whitespace-nowrap text-sm text-gray-900">{discount.code}</td>
        <td className="px-6 text-center py-4 whitespace-nowrap text-sm text-gray-900">{discount.quantity}</td>
        <td className="px-6 text-center py-4 whitespace-nowrap text-sm text-gray-900">{discount.type === "Percentage" ? "درصدی" : "ثابت"}</td>
        <td className="px-6 text-center py-4 whitespace-nowrap text-sm text-gray-900">{discount.value}</td>
        <td className="px-6 text-center py-4 whitespace-nowrap text-sm text-gray-900">
        {new Date(discount.validFrom).toLocaleDateString("fa-IR", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                        })}
        </td>
        <td className="px-6 text-center py-4 whitespace-nowrap text-sm text-gray-900">
        {new Date(discount.validUntil).toLocaleDateString("fa-IR", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                        })}
        </td>
        <td className="px-6 text-center py-4 whitespace-nowrap text-sm text-gray-900">{discount.usedCount}</td>
        <td className="px-3 text-center py-4 text-large text-gray-900">
          <i className="fa fa-trash-o text-red-500 cursor-pointer mx-2" aria-hidden="true" onClick={() => handleDeleteClick(discount.id)} />
          <i className="fa fa-pencil-square-o text-blue-500 cursor-pointer mx-2" aria-hidden="true" />
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
      <button className='add-ticket-panel-button'>اضافه کردن تخفیف</button>  
    </div>  
    
  );  
}  

export default GetDiscounts;
// src/components/GetDiscounts.tsx  

import React, { useState, useEffect } from 'react';  
import apiClient from '../../utils/apiClient';  

interface Discount {  
  available_from: string;  
  available_until: string;  
  code: string;  
  created_at: string;  
  id: number;  
  min_tickets: number;  
  quantity: number;  
  type: 'Fixed' | 'Percentage';  
  used_count: number;  
  value: number;  
}  

const mockDiscounts: Discount[] = [  
  {  
    available_from: "2024-12-05T16:22:00+03:30",  
    available_until: "2024-12-21T16:22:00+03:30",  
    code: "r4",  
    created_at: "2024-12-28T12:53:00.569+03:30",  
    id: 1,  
    min_tickets: 1,  
    quantity: 43,  
    type: "Fixed",  
    used_count: 0,  
    value: 44,  
  },  
  {  
    available_from: "2024-12-05T16:22:00+03:30",  
    available_until: "2024-12-21T16:22:00+03:30",  
    code: "r4",  
    created_at: "2024-12-28T12:53:00.569+03:30",  
    id: 5,  
    min_tickets: 1,  
    quantity: 41,  
    type: "Fixed",  
    used_count: 0,  
    value: 44,  
  },  
];  
type SortField = 'id'  | 'quantity' | 'type';
type SortOrder = 'asc' | 'desc';

function GetDiscounts() {  
  const [discounts, setDiscounts] = useState<Discount[]>(mockDiscounts);  
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState<string | null>(null);  

  useEffect(() => {  
    const fetchDiscounts = async () => {  
      setLoading(true);  
      setError(null);  

      try {  
        const response = await apiClient.get('/v1/events/discount-details/18', {  
          headers: {  
            "ngrok-skip-browser-warning": "69420",  
            'Content-Type': 'application/json',  
          },  
        });  
        setDiscounts(response.data.data);  
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

  

  const getSortIcon = (field: SortField) => {
    if (field !== sortField) return '↕️';
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  return (  
    <div className="min-h-screen bg-white-100 p-8 no-padding">  
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md">  
        <div className="p-6">  
          <h2 className="text-2xl font-bold mb-6">تخفیف ها</h2>  
          {loading && <p>Loading discounts...</p>}  
          {error && <p className="text-red-600">{error}</p>}  
          <div className="overflow-x-auto">  
            <table className="min-w-full divide-y divide-gray-200">  
              <thead className="bg-gray-50">  
                <tr>  
                  <th className="px-6 py-3 text-center text-medium font-medium text-gray-500 cursor-pointer uppercase tracking-wider" onClick={() => handleSort('id')}>آیدی {getSortIcon('id')}</th>  
                  <th className="px-6 py-3 text-center text-medium font-medium text-gray-500 cursor-pointer uppercase tracking-wider">کد</th>  
                  <th className="px-6 py-3 text-center text-medium font-medium text-gray-500 cursor-pointer uppercase tracking-wider" onClick={() => handleSort('quantity')}>تعداد {getSortIcon('quantity')}</th>  
                  <th className="px-6 py-3 text-center text-medium font-medium text-gray-500 cursor-pointer uppercase tracking-wider" onClick={() => handleSort('type')}>نوع {getSortIcon('type')}</th>  
                  <th className="px-6 py-3 text-center text-medium font-medium text-gray-500 cursor-pointer uppercase tracking-wider">عملیات</th>  
                </tr>  
              </thead>  
              <tbody className="bg-white divide-y divide-gray-200">  
                {discounts.map((discount) => (  
                  <tr key={discount.id} className="hover:bg-gray-50">  
                    <td className="px-6 text-center py-4 whitespace-nowrap text-sm text-gray-900">{discount.id}</td>  
                    <td className="px-6 text-center py-4 whitespace-nowrap text-sm text-gray-900">{discount.code}</td>  
                    <td className="px-6 text-center py-4 whitespace-nowrap text-sm text-gray-900">{discount.quantity}</td>  
                    <td className="px-6 text-center py-4 whitespace-nowrap text-sm text-gray-900">{discount.type}</td>  
                    <td className="px-6 text-center py-4 text-large text-gray-900">  
                      <i className="fa fa-trash-o text-red-500 cursor-pointer mx-2" aria-hidden="true" />  
                      <i className="fa fa-pencil-square-o text-blue-500 cursor-pointer mx-2" aria-hidden="true" />  
                    </td>  
                  </tr>  
                ))}  
              </tbody>  
            </table>  
          </div>  
        </div>  
      </div>  
      <button className='add-ticket-panel-button'>اضافه کردن تخفیف</button>  
    </div>  
  );  
}  

export default GetDiscounts;
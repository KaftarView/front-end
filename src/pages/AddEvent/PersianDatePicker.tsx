import React, { useState } from 'react';
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

interface PersianDatePickerProps {
  onChange?: (date: Date) => void;
  label?: string;
}

export const PersianDatePicker: React.FC<PersianDatePickerProps> = ({ 
  onChange,
  label = "انتخاب تاریخ"
}) => {
  const [value, setValue] = useState<any>(null);

  const handleDateChange = (date: any) => {
    setValue(date);
    if (onChange && date?.toDate) {
      onChange(date.toDate());
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
          {label}
        </label>
      )}
      <DatePicker
        value={value}
        onChange={handleDateChange}
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        containerClassName="w-full"
        inputClass="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
        className="rmdp-prime"
      />
    </div>
  );
};

// import {PersianDatePicker} from './PersianDatePicker'
// const handleDateChange = (date: Date) => {
//   console.log(date);
// }
{/* <PersianDatePicker 
onChange={handleDateChange}
label="لطفا تاریخ را انتخاب کنید"
/> */}
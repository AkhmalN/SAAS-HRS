import { useState } from "react";

export const getDate = () => {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [date, setDate] = useState("");

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleDateConfirm = (selectedDate) => {
    hideDatePicker();
    if (selectedDate) {
      setDate(selectedDate);
    } else {
      return null;
    }
  };

  return {
    showDatePicker,
    hideDatePicker,
    handleDateConfirm,
    isDatePickerVisible,
    date,
  };
};

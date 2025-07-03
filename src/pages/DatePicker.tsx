import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./custom-datepicker.css";

const MultiDatePicker: React.FC = () => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [fromInput, setFromInput] = useState<string>("");
  const [toInput, setToInput] = useState<string>("");

  const normalizeDate = (date: Date | null): Date | null => {
    if (!date) return null;
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  const formatDateForInput = (date: Date | null): string => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleChange = (date: Date | null) => {
    if (!date) return;

    setSelectedDates((prevDates) => {
      const normalizedDate = normalizeDate(date);
      if (!normalizedDate) return prevDates;

      const sortedDates = prevDates
        .map(normalizeDate)
        .sort((a, b) => a!.getTime() - b!.getTime());

      // The First Date
      const firstDate = sortedDates[0];

      // If clicking the first date again, reset to just that date
      if (firstDate && normalizedDate.getTime() === firstDate.getTime()) {
        setFromInput(formatDateForInput(normalizedDate));
        setToInput("");
        return [normalizedDate];
      }

      // Initial selection or starting a new range
      if (prevDates.length === 0) {
        setFromInput(formatDateForInput(normalizedDate));
        setToInput("");
        return [normalizedDate];
      }

      // Selecting an earlier date than the first selected date
      if (normalizedDate < firstDate!) {
        setFromInput(formatDateForInput(normalizedDate));
        setToInput("");
        return [normalizedDate];
      }

      // Selecting a date after the first date, filling the range
      const filledDates: Date[] = [];
      for (
        let current = new Date(firstDate!);
        current <= normalizedDate;
        current.setDate(current.getDate() + 1)
      ) {
        filledDates.push(new Date(current));
      }

      setToInput(formatDateForInput(normalizedDate));
      return filledDates;
    });
  };

  const handleFromBlur = () => {
    const date = new Date(fromInput);
    if (!isNaN(date.getTime())) {
      setSelectedDates([normalizeDate(date)!]);
      setToInput("");
    }
  };

  const handleToBlur = () => {
    const date = new Date(toInput);
    if (!isNaN(date.getTime()) && selectedDates.length > 0) {
      const firstDate = selectedDates[0];

      if (date >= firstDate) {
        const filledDates: Date[] = [];
        for (
          let current = new Date(firstDate);
          current <= date;
          current.setDate(current.getDate() + 1)
        ) {
          filledDates.push(normalizeDate(new Date(current))!);
        }
        setSelectedDates(filledDates);
      }
    }
  };

  const firstDate = selectedDates.length > 0 ? selectedDates[0] : null;
  const lastDate =
    selectedDates.length > 1
      ? selectedDates[selectedDates.length - 1]
      : firstDate;

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col justify-center items-center p-4 gap-3 bg-white rounded-lg shadow-sm">
        <div className="flex gap-4">
          <div className="flex flex-col gap-2 font-light text-sm">
            <p>From</p>
            <input
              type="date"
              value={fromInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFromInput(e.target.value)
              }
              onBlur={handleFromBlur}
              className="border border-gray-300 min-w-[120px] min-h-[45px] rounded-md py-2 px-4"
            />
          </div>

          <div className="flex flex-col gap-2 font-light text-sm">
            <p>To</p>
            <input
              type="date"
              value={toInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setToInput(e.target.value)
              }
              onBlur={handleToBlur}
              className="border border-gray-300 min-w-[120px] min-h-[45px] rounded-md py-2 px-4"
            />
          </div>
        </div>

        <DatePicker
          selected={null}
          onChange={handleChange}
          inline
          calendarClassName="custom-datepicker"
          renderDayContents={(day, date) => {
            const normalized = normalizeDate(date);
            if (!normalized) return day;

            const dateString = normalized.toDateString();
            const isFirst =
              firstDate && firstDate.toDateString() === dateString;
            const isLast = lastDate && lastDate.toDateString() === dateString;
            const isSelected = selectedDates.some(
              (d) => d.toDateString() === dateString
            );

            return (
              <div
                className={`flex items-center justify-center ${
                  isFirst
                    ? "bg-[#2B8C34] text-white font-normal rounded-l-lg"
                    : isLast
                    ? "bg-[#2B8C34] text-white font-normal rounded-r-lg"
                    : isSelected
                    ? "bg-[#EDF7EE] text-[#2B8C34] font-normal"
                    : ""
                }`}
              >
                {day}
              </div>
            );
          }}
          renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
            <div className="flex w-full justify-between items-center text-black px-4 py-2 rounded-t-lg">
              <button onClick={decreaseMonth} className="px-3 py-1 text-sm">
                {"<"}
              </button>
              <span className="text-sm font-normal">
                {date.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <button onClick={increaseMonth} className="px-3 py-1 text-sm">
                {">"}
              </button>
            </div>
          )}
        />

        <div className="flex items-center justify-center gap-4">
          <p className="text-xs font-medium text-[#96A397]">
            {selectedDates.length} Days Selected
          </p>

          <button
            onClick={() => {
              setSelectedDates([]);
              setFromInput("");
              setToInput("");
            }}
            className="text-sm rounded-md py-2 px-5 font-medium text-[#5C715E]"
          >
            Cancel
          </button>

          <button className="text-sm bg-[#2B8C34] rounded-md py-2 px-5 font-medium text-white">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultiDatePicker;

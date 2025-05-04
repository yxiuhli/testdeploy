"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dayjs from "dayjs";
import { useWorkShifts } from "@/hooks/useWorkShifts";

const EmployeeWorkSchedule = () => {
  const { getShiftsOfEmployee } = useWorkShifts();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [weekOffset, setWeekOffset] = useState(0);
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const shiftsData = await getShiftsOfEmployee();
        setShifts(shiftsData);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchShifts();
  }, []);

  const getShiftsForDate = (date) => {
    const dateStr = date.format("YYYY-MM-DD");
    return shifts.filter((shift) => shift.date === dateStr);
  };

  const WeekView = () => {
    const weekDays = Array.from({ length: 7 }, (_, i) =>
      dayjs(selectedDate).startOf("week").add(weekOffset, "week").add(i, "day")
    );

    return (
      <div>
        <div className="flex justify-between items-center mb-2 mt-2">
          <button
            onClick={() => setWeekOffset((prev) => prev - 1)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-semibold">
            {weekDays[0].format("MMM D")} - {weekDays[6].format("MMM D, YYYY")}
          </h2>
          <button
            onClick={() => setWeekOffset((prev) => prev + 1)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day) => {
            const shifts = getShiftsForDate(day);
            return (
              <div
                key={day.format()}
                className="min-h-96 border rounded-lg p-3"
              >
                <div className="flex justify-between items-center mb-3 ">
                  <h3 className="text- font-semibold">{day.format("dddd")}</h3>
                  <span
                    className={`px-2 py-1 rounded text-md ${
                      day.isSame(dayjs(), "day")
                        ? "bg-blue-200 text-blue-800"
                        : "text-gray-500"
                    }`}
                  >
                    {day.isSame(dayjs(), "day") ? "Today" : day.format("DD/MM")}
                  </span>
                </div>
                {!loading ? (
                  shifts.length > 0 ? (
                    <div className="space-y-2">
                      {shifts.map((shift) => (
                        <div
                          key={shift.id}
                          className="bg-gray-200 rounded p-3"
                        >
                          <div className="font-medium text-l mb-1 ">
                            {shift.title}
                          </div>
                          <div className="text-gray-600 mb-2 ">
                            {dayjs(`${shift.date}T${shift.startTime}`).format("HH:mm")} -{" "}
                            {dayjs(`${shift.date}T${shift.endTime}`).format("HH:mm")}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-400 text-lg text-center py-4">
                      No shifts scheduled
                    </div>
                  )
                ) : (
                  <div className="text-gray-400 text-lg text-center py-4">
                    Loading...
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full mx-auto p-4">
      {loading ? <div>Loading shifts...</div> : <WeekView />}
    </div>
  );
};

export default EmployeeWorkSchedule;
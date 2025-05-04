"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, Popover } from "antd";
import dayjs from "dayjs";
import { useWorkShifts } from "@/hooks/useWorkShifts";

const AdminWorkSchedule = ({ selectedShift, onSelectShift }) => {
  const { getWorkShifts, getEmployeesByShiftId } = useWorkShifts();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [weekOffset, setWeekOffset] = useState(0);
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [highlightedEmployee, setHighlightedEmployee] = useState(null);
  const [currentHoverKey, setCurrentHoverKey] = useState(null);

  const isSelectable = (shiftDate) => {
    return dayjs(shiftDate).diff(dayjs(), "day") >= 7;
  };

  const handleShiftSelection = (shiftId, isSelectable) => {
    if (!isSelectable) return;
    onSelectShift((prev) => (prev === shiftId ? null : shiftId));
  };

  useEffect(() => {
    const fetchShiftsWithEmployees = async () => {
      try {
        // 1. Fetch all shifts
        const shiftsData = await getWorkShifts();

        // 2. Fetch employees for each shift in parallel
        const shiftsWithEmployees = await Promise.all(
          shiftsData.map(async (shift) => {
            const employees = await getEmployeesByShiftId(shift.id);
            return {
              ...shift,
              employees: employees.map((emp) => ({
                id: emp.id,
                name: `${emp.firstName} ${emp.lastName}`,
                avatarUrl: emp.avatarUrl,
                position: emp.position,
              })),
            };
          })
        );

        setShifts(shiftsWithEmployees);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShiftsWithEmployees();
  }, []);

  const getShiftsForDate = (date) => {
    const dateStr = date.format("YYYY-MM-DD");
    return shifts.filter((shift) => shift.date === dateStr);
  };

  const WeekView = () => {
    const weekDays = Array.from({ length: 7 }, (_, i) =>
      dayjs(selectedDate).startOf("week").add(weekOffset, "week").add(i, "day")
    );

    const EmployeeHoverCard = ({ employee }) => (
      <div className="w-30 p-4">
        <div className="flex items-start gap-4">
          <Avatar src={employee.avatarUrl} size={48} />
          <div>
            <h4 className="font-semibold text-base">{employee.name}</h4>
            <p className="text-sm text-gray-500 capitalize">
              {employee.position?.toLowerCase().replace("_", " ")}
            </p>
          </div>
        </div>
      </div>
    );

    const EmployeeAvatar = ({ employee, shiftId }) => {
      const uniqueKey = `${shiftId}-${employee.id}`;

      return (
        <div
          className="relative inline-block"
          onMouseEnter={() => {
            setHighlightedEmployee(employee.id);
            setCurrentHoverKey(uniqueKey);
          }}
          onMouseLeave={() => {
            setHighlightedEmployee(null);
            setCurrentHoverKey(null);
          }}
        >
          <Popover
            content={<EmployeeHoverCard employee={employee} />}
            open={currentHoverKey === uniqueKey}
          >
            <Avatar
              src={employee.avatarUrl}
              size="default"
              className={`cursor-pointer border-2 transition-all ${
                highlightedEmployee === employee.id
                  ? "border-blue-500 scale-110"
                  : "border-transparent"
              }`}
            />
          </Popover>
        </div>
      );
    };

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
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold">{day.format("dddd")}</h3>
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
                      {shifts.map((shift) => {
                        const selectable = isSelectable(shift.date);
                        const isSelected = selectedShift === shift.id;

                        return (
                          <div
                            key={shift.id}
                            onClick={() =>
                              handleShiftSelection(shift.id, selectable)
                            }
                            className={`rounded-lg p-3 transition-all cursor-pointer border
        ${
          isSelected
            ? "bg-gray-300 border-gray-500"
            : "bg-gray-100 hover:bg-gray-200"
        }
        ${!selectable ? "opacity-90 cursor-not-allowed" : ""}`}
                          >
                            <div className="font-medium text-l mb-1">
                              {shift.title}
                            </div>
                            <div className="text-gray-600 mb-2">
                              {dayjs(`${shift.date}T${shift.startTime}`).format(
                                "HH:mm"
                              )}{" "}
                              -{" "}
                              {dayjs(`${shift.date}T${shift.endTime}`).format(
                                "HH:mm"
                              )}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {shift.employees?.map((employee) => (
                                <EmployeeAvatar
                                  key={`${shift.id}-${employee.id}`}
                                  employee={employee}
                                  shiftId={shift.id}
                                />
                              ))}
                            </div>
                          </div>
                        );
                      })}
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

export default AdminWorkSchedule;

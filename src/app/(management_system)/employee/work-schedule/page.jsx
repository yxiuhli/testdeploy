import EmployeeWorkSchedule from "@/components/work-schedule/EmployeeWorkSchedule";
import React from "react";

const WorkSchedulePage = () => {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="px-8 pt-6 pb-4 bg-slate-200">
        <h1 className="text-2xl font-bold">WORK SCHEDULE</h1>
      </div>
      <div className="pl-12 pr-8 pt-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">Employee Work Schedule</h2>
            <h3 className="text-gray-500">
              Check your work schedule below!
            </h3>
          </div>
        </div>
        <hr />
        <EmployeeWorkSchedule />
      </div>
    </div>
  );
};

export default WorkSchedulePage;
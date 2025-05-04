import Sidebar from "@/components/layout/Sidebar";
import React from "react";

const EmployeeLayout = ({ children }) => {
  return (
    <div className="grid grid-cols-6 ">
      <Sidebar className="col-span-1" />
      <div className="col-span-5">{children}</div>
    </div>
  );
};

export default EmployeeLayout;
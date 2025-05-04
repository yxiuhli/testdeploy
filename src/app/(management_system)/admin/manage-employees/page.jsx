"use client";
import { Tabs } from "antd";
import SignedEmployeesTable from "@/components/manage-employees/SignedEmployeesTable";
import WaitingAccountsTable from "@/components/manage-employees/WaitingAccountsTable";

const ManageEmployees = () => {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="px-8 pt-6 pb-4 bg-slate-200">
        <h1 className="text-2xl font-bold">MANAGE EMPLOYEES</h1>
      </div>
      <div className="pl-12 pr-8 my-1">
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Signed Employees" key="1">
            <SignedEmployeesTable />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Waiting Accounts" key="2">
            <WaitingAccountsTable />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default ManageEmployees;

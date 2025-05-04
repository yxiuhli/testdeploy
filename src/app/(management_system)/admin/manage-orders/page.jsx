"use client";
import { Card, Table, Modal, Button, Input, Tabs, Select, Tag } from "antd";

import PaymentListTable from "@/components/manage-orders/PaymentListTable";
import OrderListTable from "@/components/manage-orders/OrderListTable";

const ManageOrders = () => {

  return (
    <div className="h-full w-full flex flex-col">
      <div className="px-8 pt-6 pb-4 bg-slate-200">
        <h1 className="text-2xl font-bold">MANAGE ORDERS</h1>
      </div>

      <div className="pl-12 pr-8 my-1">
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane
            tab="Order List"
            key="2"
          >
            <OrderListTable />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="Payment List"
            key="3"
          >
            <PaymentListTable />
          </Tabs.TabPane>
        </Tabs>

      </div>
    </div>
  );
};

export default ManageOrders;
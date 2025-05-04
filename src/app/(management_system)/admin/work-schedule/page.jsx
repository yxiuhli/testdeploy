"use client";
import React, { useState } from "react";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Modal, Form, Input, Button, DatePicker, TimePicker, Select, Avatar, message } from "antd";
import dayjs from "dayjs";
import AdminWorkSchedule from "@/components/work-schedule/AdminWorkSchedule";
import { useWorkShifts } from "@/hooks/useWorkShifts";
import { useEmployees } from "@/hooks/useEmployees";
import CreateShiftModal from "@/components/work-schedule/CreateShiftModal";

const { RangePicker } = TimePicker;
const { confirm } = Modal;

const WorkSchedulePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedShift, setSelectedShift] = useState(null);
  const { createWorkShift, deleteWorkShift } = useWorkShifts();

  const handleCreate = async (values) => {
    try {
      await createWorkShift(values);
      setIsModalVisible(false);
      message.success("Shift created successfully");
    } catch (error) {
      message.error("Failed to create shift");
    }
  };

  const showDeleteConfirm = () => {
    confirm({
      title: `Delete Shift ${selectedShift}?`,
      content: "This action cannot be undone and will permanently remove the selected shift.",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await deleteWorkShift(selectedShift);
          setSelectedShift(null);
          message.success("Shift deleted successfully");
        } catch (error) {
          message.error("Failed to delete shift");
        }
      },
    });
  };

  return (
    <div className="h-full w-full flex flex-col">
      {/* Header section */}
      <div className="px-8 pt-6 pb-4 bg-slate-200">
        <h1 className="text-2xl font-bold">WORK SCHEDULE</h1>
      </div>
      
      <div className="pl-12 pr-8 pt-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">General Work Schedule</h2>
            <h3 className="text-gray-500">
              View work schedule for all employees below!
            </h3>
          </div>
          
          <div className="flex gap-4">
            <Button
              danger
              className={`flex gap-2 items-center px-4 py-2 text-lg h-12 rounded-md ${selectedShift?"":"hidden"}`}
              variant="outlined"
              color="red"
              
              onClick={showDeleteConfirm}
            >
              Delete Selected Shift
            </Button>
            
            <button
              className="flex gap-2 items-center text-white px-4 py-2 text-lg bg-rose-800 rounded-md hover:bg-rose-700 ring-1 ring-white"
            
              onClick={() => setIsModalVisible(true)}
            >
              New Work Shift
            </button>
          </div>
        </div>
        <hr />
      </div>

      <CreateShiftModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onCreate={handleCreate}
      />

      <AdminWorkSchedule 
        selectedShift={selectedShift}
        onSelectShift={setSelectedShift}
      />
    </div>
  );
};

export default WorkSchedulePage;
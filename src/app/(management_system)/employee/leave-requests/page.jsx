"use client";
import { useState, useEffect } from "react";
import { Card, Statistic } from "antd";
import { useRouter } from "next/navigation";
import {
  DownCircleOutlined,
  PlusCircleOutlined,
  UpCircleOutlined,
} from "@ant-design/icons";
import { useLeaves } from "@/hooks/useLeaves";
import RequestHistoryTable from "@/components/leave-request/employee/RequestHistoryTable";
import RequestSubmitModal from "@/components/leave-request/employee/RequestSubmitModal";

const EmployeeLeaveRequest = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { submitRequest, getEmployeeRequests } = useLeaves();

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    setLoading(true);
    try {
      const requests = await getEmployeeRequests();
      setRequests(requests);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNewRequest = async (formData) => {
    try {
      await submitRequest(formData);
      await loadRequests();
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="px-8 pt-6 pb-4 bg-slate-200">
        <h1 className="text-2xl font-bold">LEAVE REQUESTS</h1>
      </div>
      <div className="pl-12 pr-8 mt-8">
        <div className="flex justify-between gap-8 mb-4">
          <Card
            bordered={false}
            className="w-72 mb-4 bg-blue-50 border-solid border-2 border-blue-400"
          >
            <Statistic
              title="Annual Paid Leaves"
              value={16}
              precision={0}
              valueStyle={{ color: "#3b82f6", fontSize: "36px" }}
              prefix={<PlusCircleOutlined />}
            />
          </Card>
          <Card
            bordered={false}
            className="w-72 mb-4 bg-amber-50 border-solid border-2 border-amber-400"
          >
            <Statistic
              title="Unpaid Leaves Taken"
              value={9}
              precision={0}
              valueStyle={{ color: "#f59e0b", fontSize: "36px" }}
              prefix={<DownCircleOutlined />}
            />
          </Card>
          <Card
            bordered={false}
            className="w-72 mb-4 bg-red-50 border-solid border-2 border-red-400"
          >
            <Statistic
              title="Paid Leaves Taken"
              value={7}
              precision={0}
              valueStyle={{ color: "#cf1322", fontSize: "36px" }}
              prefix={<DownCircleOutlined />}
            />
          </Card>
          <Card
            bordered={false}
            className="w-72 mb-4 bg-green-50 border-solid border-2 border-green-400"
          >
            <Statistic
              title="Paid Leaves Remaining"
              value={9}
              precision={0}
              valueStyle={{ color: "#3f8600", fontSize: "36px" }}
              prefix={<UpCircleOutlined />}
            />
          </Card>
        </div>

        <hr />
        <div className="flex justify-between items-center my-4">
          <h2 className="text-xl font-bold mt-2">Leave Request History</h2>
          <button
            className="text-white px-6 py-2 bg-rose-800 rounded-md hover:bg-rose-700 ring-1 ring-white"
            onClick={() => setIsModalOpen(true)}
          >
            NEW REQUEST
          </button>
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        <RequestHistoryTable data={requests} loading={loading} />
        <RequestSubmitModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleNewRequest}
        />
      </div>
    </div>
  );
};

export default EmployeeLeaveRequest;

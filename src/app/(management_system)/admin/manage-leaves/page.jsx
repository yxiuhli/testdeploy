"use client";
import { useState, useEffect } from "react";
import { useLeaves } from "@/hooks/useLeaves";
import { Tabs } from "antd";
import PendingRequestsTable from "@/components/leave-request/admin/PendingRequestsTable";
import ReviewedRequestsTable from "@/components/leave-request/admin/ReviewedRequestsTable";

const ManageLeaves = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getReviewedRequests } = useLeaves();
  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    setLoading(true);
    try {
      const requests = await getReviewedRequests();
      setRequests(requests);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="px-8 pt-6 pb-4 bg-slate-200">
        <h1 className="text-2xl font-bold">MANAGE LEAVES</h1>
      </div>
      <div className="pl-12 pr-8 my-1">
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Pending Requests" key="1">
            <PendingRequestsTable refresh={loadRequests} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Reviewed Requests" key="2">
            <ReviewedRequestsTable data={requests} loading={loading} />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default ManageLeaves;

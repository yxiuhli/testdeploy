"use client";
import { useState, useEffect } from "react";
import { Table, Button, Tag, Modal, Input, message } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useLeaves } from "@/hooks/useLeaves";

const PendingRequestsTable = ({ refresh }) => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [actionType, setActionType] = useState(null); // "APPROVED" or "REJECTED"
  const [comment, setComment] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getPendingRequests, updateRequest } = useLeaves();

  useEffect(() => {
    loadPendingRequests();
  }, []);

  const loadPendingRequests = async () => {
    setLoading(true);
    try {
      const requests = await getPendingRequests();
      setPendingRequests(requests);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);

    // Format time as HH:MM
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const time = `${hours}:${minutes}`;

    // Format date as DD/MM/YYYY
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    return `${time}, ${formattedDate}`;
  };

  const openModal = (request, type) => {
    setSelectedRequest(request);
    setActionType(type);
    setComment(""); // reset comment input
    setModalVisible(true);
  };

  const handleSubmitAction = async () => {
    if (!comment.trim()) {
      message.error("Please provide a comment before submitting.");
      return;
    }
    setLoading(true);
    try {
      await updateRequest(selectedRequest.id, actionType, comment);
      setModalVisible(false);
      await loadPendingRequests();
      refresh();
      message.success(`Request ${actionType.toLowerCase()} successfully.`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Submitted By",
      dataIndex: "employee",
      width: "12%",
      className: "text-base",
      render: (employee) => (
        <p>{employee.lastName + " " + employee.firstName}</p>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      width: "10%",
      className: "text-base",
      render: (type) => (
        <Tag className="text-base" color={type === "PAID" ? "blue" : "orange"}>
          {type}
        </Tag>
      ),
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      width: "12%",
      className: "text-base",
      render: (date) => formatDateTime(date),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      width: "12%",
      className: "text-base",
      render: (date) => formatDateTime(date),
    },
    {
      title: "Total",
      width: "8%",
      align: "center",
      className: "text-base",
      render: (_, record) => {
        const start = new Date(record.startDate);
        const end = new Date(record.endDate);
        const diffTime = Math.abs(end - start);
        return <Tag  color="purple">
          {Math.ceil(diffTime / (1000 * 60 * 60 * 24))} days
        </Tag>
      },
    },
    {
      title: "Reason",
      dataIndex: "reason",
      width: "20%",
      className: "text-base",
      ellipsis: true,
    },
    {
      title: "Submission Date",
      dataIndex: "submissionDate",
      width: "12%",
      className: "text-base",
      render: (date) => formatDateTime(date),
    },
    {
      title: "Actions",
      width: "20%",
      className: "text-base",
      render: (_, record) => (
        <div className="flex flex-col gap-2">
          <Button
            icon={<CheckCircleOutlined />}
            color="blue" variant="outlined"
            onClick={() => openModal(record, "APPROVED")}
            loading={loading}
          >
            Approve request
          </Button>
          <Button
            icon={<CloseCircleOutlined />}
            color="red" variant="outlined"
            className="text-red-500 border-red-500 hover:text-red-600 hover:border-red-600"
            onClick={() => openModal(record, "REJECTED")}
            loading={loading}
          >
            Reject request
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <Table
        columns={columns}
        dataSource={pendingRequests}
        rowKey="id"
        bordered
        pagination={{ pageSize: 4 }}
        scroll={{ x: true }}
        className="rounded-lg shadow-sm"
        loading={loading}
      />

      <Modal
        open={modalVisible}
        title={actionType === "APPROVED" ? "Approve Request" : "Reject Request"}
        onOk={handleSubmitAction}
        onCancel={() => setModalVisible(false)}
        okText={actionType === "APPROVED" ? "Approve" : "Reject"}
        confirmLoading={loading}
      >
        <p className="mb-2 font-medium">Admin Comment:</p>
        <Input.TextArea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          placeholder="Write your comment here..."
        />
      </Modal>
    </>
  );
};

export default PendingRequestsTable;

"use client";
import { Table, Tag } from "antd";

const ReviewedRequestsTable = ({ data, loading }) => {
  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    
    // Format time as HH:MM
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const time = `${hours}:${minutes}`;
    
    // Format date as DD/MM/YYYY
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    
    return `${time}, ${formattedDate}`;
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
      render: (type) => (
        <Tag  color={type === "PAID" ? "blue" : "orange"}>
          {type}
        </Tag>
      ),
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      width: "12%",
      render: (date) => formatDateTime(date)
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      width: "12%",
      render: (date) => formatDateTime(date)
    },
    {
      title: "Total",
      width: "10%",
      align: "center",
      render: (_, record) => {
        const start = new Date(record.startDate);
        const end = new Date(record.endDate);
        const diffTime = Math.abs(end - start);
        return <Tag  color="purple">
          {Math.ceil(diffTime / (1000 * 60 * 60 * 24))} days
        </Tag>
      }
    },
    {
      title: "Reason",
      dataIndex: "reason",
      width: "15%",
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "13%",
      render: (status) => {
        const statusColors = {
          PENDING: "gold",
          APPROVED: "green",
          REJECTED: "red",
        };
        return (
          <Tag
            color={statusColors[status]}
          >
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Submission Date",
      dataIndex: "submissionDate",
      width: "12%",
      render: (date) => formatDateTime(date)
    },
    {
      title: "Response Date",
      dataIndex: "responseDate",
      width: "12%",
      render: (date) => formatDateTime(date),
    },
    {
      title: "Admin Comment",
      dataIndex: "adminComment",
      width: "18%",
      ellipsis: true,
      render: (comment) => comment || 'N/A',
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      bordered
      pagination={{ pageSize: 5, showSizeChanger: false }}
      size="large"
      loading={loading}
    />
  );
};

export default ReviewedRequestsTable;
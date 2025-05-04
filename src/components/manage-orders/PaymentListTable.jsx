"use client";
import { useState, useEffect } from "react";
import { Table, Button, Tag, Modal, Descriptions } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { usePayments } from "@/hooks/usePayments";


const PaymentListTable = () => {
    const [payments, setPayments] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const { getPayments } = usePayments();
  
    useEffect(() => {
      getPayments().then(setPayments);
    }, []);
  
    const columns = [
      {
        title: "Payment ID",
        dataIndex: "id",
        render: (id) => <span className="font-mono text-base">#{id.slice(0, 8)}</span>,
        width: "12%"
      },
      {
        title: "Order ID",
        dataIndex: "orderId",
        width: "12%",

        render: (id) => <span className="font-mono text-base">#{id.slice(0, 8)}</span>,
      },
      { title: "Payer Email", dataIndex: "payerEmail",
        render: (email) => <a className="text-blue-600">{email}</a>,
         ellipsis: true,

        width: "15%"
       },
      {
        title: "Amount",
        dataIndex: "amount",
        render: (amount) => <Tag color="purple" className="text-base">${amount.toFixed(2)}</Tag>,

        width: "10%"
      },
      {
        title: "Method",
        dataIndex: "paymentMethod",
        render: (method) => <Tag color="blue" className="text-base">{method}</Tag>,

        width: "10%"
      },
      {
        title: "Date",
        dataIndex: "paymentTimestamp",
        render: (date) => <span className="text-base">{new Date(date).toLocaleDateString()}</span>,

        width: "10%"
      },
      {
        title: "Status",
        dataIndex: "paymentStatus",
        render: (status) => {
          const statusColors = {
            COMPLETED: "green",
            PENDING: "orange",
            FAILED: "red",
          };
          return <Tag color={statusColors[status]} className="text-base">{status}</Tag>;
        },

        width: "15%"
      },
      {
        title: "Actions",
        render: (_, record) => (
          <Button
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedPayment(record);
              setViewModalVisible(true);
            }}
            className="text-base"
          >
            Details
          </Button>
        ),
      },
    ];
  
    return (
      <>
        <Table
          columns={columns}
          dataSource={payments}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
  
        <Modal
          title="PAYMENT DETAILS"
          open={viewModalVisible}
          onCancel={() => setViewModalVisible(false)}
          footer={null}
          width={600}
        >
          {selectedPayment && (
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Payment ID">
                {selectedPayment.id}
              </Descriptions.Item>
              <Descriptions.Item label="Order ID">
                {selectedPayment.orderId}
              </Descriptions.Item>
              <Descriptions.Item label="Payer">
                {selectedPayment.payerEmail}
              </Descriptions.Item>
              <Descriptions.Item label="Amount">
                <Tag color="green">${selectedPayment.amount.toFixed(2)}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Method">
                <Tag color="blue">{selectedPayment.paymentMethod}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag color={selectedPayment.paymentStatus === 'COMPLETED' ? 'green' : 'orange'}>
                  {selectedPayment.paymentStatus}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Date">
                {new Date(selectedPayment.paymentTimestamp).toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="Gateway ID">
                {selectedPayment.paymentId}
              </Descriptions.Item>
            </Descriptions>
          )}
        </Modal>
      </>
    );
  };

  export default PaymentListTable;
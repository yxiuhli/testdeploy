"use client";
import { useState, useEffect } from "react";
import { Table, Button, Tag, Modal } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useOrders } from "@/hooks/useOrders";

const OrderListTable = () => {
        const [orders, setOrders] = useState([]);
        const [selectedOrder, setSelectedOrder] = useState(null);
        const [viewModalVisible, setViewModalVisible] = useState(false);
        const { getOrders } = useOrders();
      
        useEffect(() => {
          getOrders().then(setOrders);
        }, []);
      
        const columns = [
          {
            title: "Order ID",
            dataIndex: "id",
            render: (id) => <span className="font-mono text-base">#{id.slice(0, 8)}</span>,
          },
          { title: "Buyer Name", dataIndex: "buyerName",
            render: (name) => <span className="text-base ">{name}</span>,
           },
          { title: "Email", dataIndex: "buyerEmail",
            render: (email) => <a className="text-blue-600 text-base">{email}</a>,
           },
          {
            title: "Total",
            dataIndex: "total",
            render: (total) => <Tag color="purple" className="text-base">${total.toFixed(2)}</Tag>,
          },
          {
            title: "Date",
            dataIndex: "createdAt",
            render: (date) => <span className="text-base">{new Date(date).toLocaleDateString()}</span>
          },{
            title: "Payment Method",
            dataIndex: "method",
            render: (method) => {
              const statusColors = {
                COD: "orange",
                
                PAYPAL: "blue",
              };
              return <Tag color={statusColors[method]} className="text-base">{method}</Tag>;
            },
    
            width: "15%"
          }
          ,{
            title: "Actions",
            render: (_, record) => (
              <Button
                icon={<EyeOutlined />}
                onClick={() => {
                  setSelectedOrder(record);
                  setViewModalVisible(true);
                }}
                className="text-base"
              >
                View Items
              </Button>
            ),
          },
        ];
      
        return  (
            <>
              <Table
                columns={columns}
                dataSource={orders}
                rowKey="id"
                pagination={{ pageSize: 5 }}
              />
        
              <Modal
                title={`ORDERS ITEMS (#${selectedOrder?.id.slice(0, 8)})`}
                open={viewModalVisible}
                onCancel={() => setViewModalVisible(false)}
                footer={null}
                width={800}
              >
                {selectedOrder && (
                  <Table
                    dataSource={selectedOrder.items}
                    rowKey="drinkId"
                    columns={[
                      { title: "Drink", dataIndex: "drinkName" },
                      { title: "Size", dataIndex: ["selectedVariant", "size"] },
                      {
                        title: "Price",
                        dataIndex: ["selectedVariant", "price"],
                        render: (price) => `$${price.toFixed(2)}`,
                      },
                      { title: "Qty", dataIndex: "quantity" },
                      {
                        title: "Subtotal",
                        render: (_, item) =>
                          `$${(item.selectedVariant.price * item.quantity).toFixed(2)}`,
                      },
                    ]}
                    pagination={false}
                    bordered
                    summary={() => (
                      <Table.Summary.Row>
                        <Table.Summary.Cell index={0} colSpan={4}>
                          <strong>Total</strong>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={1}>
                          <Tag color="green" style={{ fontSize: 16 }}>
                            ${selectedOrder.total.toFixed(2)}
                          </Tag>
                        </Table.Summary.Cell>
                      </Table.Summary.Row>
                    )}
                  />
                )}
              </Modal>
            </>
          );
        }

export default OrderListTable;
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Table, Button, Typography, Card, Space } from "antd";
import { DeleteOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";

const { Title, Text } = Typography;

const CartPage = () => {
  const router = useRouter();
  const { cart, dispatch } = useCart();

  const handleUpdateQuantity = (item, quantity) => {
    if (quantity === 0) {
      dispatch({
        type: "REMOVE_FROM_CART",
        payload: { id: item.id, size: item.size },
      });
      return;
    }

    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id: item.id, size: item.size, quantity },
    });
  };

  const handleRemoveItem = (item) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: { id: item.id, size: item.size },
    });
  };

  const columns = [
    {
      title: "Image",
      key: "image",
      width: 120,
      render: (_, record) => (
        <Image
          src={record.image}
          alt={record.name}
          width={100}
          height={100}
          style={{ objectFit: "cover", borderRadius: "8px" }}
          className="w-[100px] h-[100px]"
        />
      ),
    },
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>
          <Text strong>{text}</Text>
          <br />
          <Text type="secondary">Size: {record.size}</Text>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price.toFixed(2)}`,
      width: 180,
    },
    {
      title: "Quantity",
      key: "quantity",
      width: 300,
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => handleUpdateQuantity(record, record.quantity - 1)}
            size="small"
          >
            -
          </Button>
          <input
            type="text"
            value={record.quantity}
            readOnly
            className="w-12 text-center border border-gray-300 rounded"
          />
          <Button
            onClick={() => handleUpdateQuantity(record, record.quantity + 1)}
            size="small"
          >
            +
          </Button>
        </Space>
      ),
    },
    {
      title: "Subtotal",
      key: "subtotal",
      width: 180,
      render: (_, record) => `$${(record.price * record.quantity).toFixed(2)}`,
    },
    {
      title: "",
      key: "action",
      width: 100,
      render: (_, record) => (
        <Button
          type="default"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleRemoveItem(record)}
        />
      ),
    },
  ];

  const totalPrice = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-[80vh] bg-[#f5e6d3]">
      {/* Header */}
      <div className="relative flex items-center justify-between bg-[#ff6b6b]">
        <Image
          src="/img/title-background-left.png"
          alt="title"
          width={362}
          height={400}
        />
        <h1 className="text-white text-6xl font-bold text-center">Cart</h1>
        <Image
          src="/img/title-background-right.png"
          alt="title"
          width={345}
          height={400}
          className="object-fit"
        />
      </div>
      <div className="max-w-7xl py-8 mx-auto">
        <div className="flex flex-col bg-gray-50 rounded-lg p-6">
          {cart.items.length === 0 ? (
            // <Card className=" flex flex-col justify-center items-center bg-gray-50">
            <div className="min-h-[40vh] flex flex-col justify-center items-center gap-2">
              <div className="">
                <svg
                  className="w-16 h-16 mx-auto text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <p className="text-gray-400 text-2xl mb-4">
                Your cart is currently empty.
              </p>

              <button
                onClick={() => router.push("/menu")}
                className="text-white px-4 py-2 text-lg bg-rose-800 rounded-md hover:bg-rose-700 ring-1 ring-white"
              >
                Add more drink
              </button>
            </div>
          ) : (
            <>
              <Title level={2}>Added Items</Title>
              <Table
                columns={columns}
                dataSource={cart.items}
                pagination={false}
                rowKey={(record) => `${record.id}-${record.size}`}
              />
              <div className="flex justify-end mt-4 gap-24">
                <div className="flex flex-col">
                  <div className="flex justify-between w-54">
                    <Text className="text-3xl font-semibold">Total:</Text>
                    <Text className="text-3xl font-semibold">
                      ${totalPrice.toFixed(2)}
                    </Text>
                  </div>
                </div>
                <button
                  onClick={() => router.push("/checkout")}
                  className="flex gap-1 text-white items-center px-4 py-2 text-lg bg-rose-800 rounded-md hover:bg-rose-700 ring-1 ring-white"
                >
                  <DoubleRightOutlined />
                  Checkout{" "}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;

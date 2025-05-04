"use client";
import { Table, Tag, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Image from "next/image";

const DrinksTable = ({ drinks, handleEdit, handleDelete }) => {
  const columns = [
    {
      title: "Image",
      dataIndex: "imageUrl",
      width: "10%",
      className: "text-base",
      render: (imageUrl) => (
        <div className="relative h-16 w-16">
          <Image
            src={imageUrl || "/placeholder.png"}
            alt="Drink"
            fill
            className="object-cover rounded-md"
          />
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "15%",
      className: "text-base font-semibold text-blue-800",
    },
    {
      title: "Category",
      dataIndex: "category",
      width: "12%",
      className: "text-base",
      render: (category) => (
        <Tag color="volcano" className="text-base">
          {category?.name || "Unknown"}
        </Tag>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "40%",
      className: "text-base text-gray-700",
      ellipsis: true,
    },
    {
      title: "Variants",
      dataIndex: "variants",
      width: "10%",
      className: "text-base",
      render: (variants) => (
        <div className="flex flex-col gap-2 w-fit">
          {variants.map((v, index) => (
            <Tag key={index} color="purple" className="text-base">
              {v.size}: ${v.price}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: "Actions",
      width: "10%",
      className: "text-base",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            icon={<EditOutlined />}
            className="text-blue-600 hover:text-blue-500"
            onClick={() => handleEdit(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.slug)}
          />
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={drinks}
      rowKey="id"
      bordered
      pagination={{ pageSize: 4, showSizeChanger: false }}
      size="large"
    />
  );
};

export default DrinksTable;

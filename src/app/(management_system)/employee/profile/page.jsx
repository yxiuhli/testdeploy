"use client";
import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  Form,
  Row,
  Col,
  DatePicker,
  Select,
  message,
} from "antd";
import EmployeeProfile from "@/components/EmployeeProfile";
import dayjs from "dayjs";

const ProfilePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const currentEmployee = {
    firstName: "Kai",
    lastName: "Hu",
    role: "EMPLOYEE",
    email: "kai.hu@example.com",
    hireDate: "2025-04-24T17:00:00.000+00:00",
    dateOfBirth: "2000-04-16T17:00:00.000+00:00",
    salary: "1000",
    position: "BARISTA",
    gender: "MALE",
    avatarUrl:
      "https://res.cloudinary.com/dixygabu4/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1746097434/kaihu_kqqkoj.jpg",
    address: "asdsa",
    phone: "012345678",
  };

  const showModal = () => {
    setIsModalVisible(true);
    form.setFieldsValue({
      ...currentEmployee,
      dateOfBirth: dayjs(currentEmployee.dateOfBirth),
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    // API call or state update
    console.log("Updated values: ", values);
    message.success("Profile updated successfully!");
    setIsModalVisible(false);
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="px-8 pt-6 pb-4 bg-slate-200">
        <h1 className="text-2xl font-bold">PROFILE INFORMATION</h1>
      </div>
      <div className="p-16 flex flex-col">
        <EmployeeProfile employee={currentEmployee} />
        <button
          onClick={showModal}
          className="mt-4 self-end text-white px-6 py-2 bg-rose-800 rounded-md hover:bg-rose-700 ring-1 ring-white text-lg"
        >
          Update Information
        </button>
      </div>

      <Modal
        title="UPDATE PROFILE INFORMATION"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: "First name is required" }]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: "Last name is required" }]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Gender"
                name="gender"
                rules={[{ required: true, message: "Please select gender" }]}
              >
                <Select placeholder="Select Gender">
                  <Select.Option value="MALE">Male</Select.Option>
                  <Select.Option value="FEMALE">Female</Select.Option>
                  <Select.Option value="OTHER">Other</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Date of Birth"
                name="dateOfBirth"
                rules={[
                  { required: true, message: "Date of birth is required" },
                ]}
              >
                <DatePicker className="w-full" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Email is required" },
                  { type: "email", message: "Enter a valid email" },
                ]}
              >
                <Input placeholder="Email Address" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[{ required: true, message: "Phone is required" }]}
              >
                <Input placeholder="Phone Number" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Address is required" }]}
          >
            <Input.TextArea rows={2} placeholder="Address" />
          </Form.Item>

          <div className="flex justify-end gap-4 mt-6">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ProfilePage;

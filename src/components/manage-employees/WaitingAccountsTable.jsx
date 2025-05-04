"use client";
import { useEffect, useState } from "react";
import { Table, Button, Modal, Select, Tag, Form, Input, message, Avatar } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useEmployees } from "@/hooks/useEmployees";

const WaitingAccountsTable = () => {
  const [waitingAccounts, setWaitingAccounts] = useState([]);
  const [acceptModalVisible, setAcceptModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [form] = Form.useForm();
  const { getUnsignedEmployees, approveEmployee, rejectEmployee } = useEmployees();

  useEffect(() => {
    getUnsignedEmployees().then(setWaitingAccounts);
  }, []);

  const handleAccept = (employee) => {
    setSelectedEmployee(employee);
    setAcceptModalVisible(true);
    form.resetFields(); // reset form when modal opens
  };

  const handleReject = async (employee) => {
    try {
      await rejectEmployee(employee.id);
      const updatedList = await getUnsignedEmployees();
      setWaitingAccounts(updatedList);
      message.success("Employee rejected successfully!");
    } catch (error) {
      console.error("Failed to reject employee:", error);
    }
  };

  const handleConfirmAccept = async () => {
    try {
      const values = await form.validateFields();
      const { position, salary } = values;

      await approveEmployee(selectedEmployee.id, position, parseFloat(salary));
      const updatedList = await getWaitingEmployees();
      setWaitingAccounts(updatedList);
      
      message.success("Employee approved successfully!");
      setAcceptModalVisible(false);
      setSelectedEmployee(null);
    } catch (error) {
      console.error("Failed to approve employee:", error);
    }
  };

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      render: (avatarUrl) => (
        <Avatar
          src={avatarUrl || "/img/avatar_default.jpg"}
          size={76}
          shape="circle"
        />
      ),
    },
    { title: "First Name", dataIndex: "firstName" },
    { title: "Last Name", dataIndex: "lastName" },
    {
      title: "Gender",
      dataIndex: "gender",
      render: (gender) => <Tag color={gender === "Male" ? "cyan" : "pink"}>{gender}</Tag>,
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (email) => <a href={`mailto:${email}`}>{email}</a>,
    },
    { title: "Phone", dataIndex: "phone" },
    {
      title: "Actions",
      render: (_, record) => (
        <div className="flex flex-col gap-2">
          <Button icon={<CheckCircleOutlined />} color="blue" variant="outlined" onClick={() => handleAccept(record)}>
            Approve
          </Button>
          <Button icon={<CloseCircleOutlined />} danger variant="outlined" onClick={() => handleReject(record)}>
            Reject
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={waitingAccounts} bordered pagination={{ pageSize: 4 }} />

      <Modal
        title="APPROVE EMPLOYEE REGISTRATION"
        open={acceptModalVisible}
        onCancel={() => {
          setAcceptModalVisible(false);
          setSelectedEmployee(null);
          form.resetFields();
        }}
        onOk={handleConfirmAccept}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="position"
            label="Position"
            rules={[{ required: true, message: "Please select a position" }]}
          >
            <Select placeholder="Select and assign a position for employee">
              <Select.Option value="CASHIER">Cashier</Select.Option>
              <Select.Option value="BARISTA">Barista</Select.Option>
              <Select.Option value="WAITER">Wait Staff</Select.Option>
              <Select.Option value="DELIVERER">Delivery Staff</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="salary"
            label="Salary"
            rules={[
              { required: true, message: "Please input a salary" },
              {
                validator: (_, value) =>
                  value > 0 ? Promise.resolve() : Promise.reject("Salary must be greater than 0"),
              },
            ]}
          >
            <Input type="number" placeholder="Enter an initial salary for employee" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default WaitingAccountsTable;

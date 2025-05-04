"use client";
import { useEffect, useState } from "react";
import { Table, Button, Tag, Modal, Input, Avatar, Form } from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import { useEmployees } from "@/hooks/useEmployees";
import EmployeeProfile from "../EmployeeProfile";

const SignedEmployeesTable = () => {
  const [employees, setEmployees] = useState([]);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [updateSalaryModalVisible, setUpdateSalaryModalVisible] =
    useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [form] = Form.useForm();
  const { getSignedEmployees, updateSalary } = useEmployees();

  useEffect(() => {
    getSignedEmployees().then(setEmployees);
  }, []);

  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee);
    setViewModalVisible(true);
  };

  const handleUpdateSalary = (employee) => {
    setSelectedEmployee(employee);
    setUpdateSalaryModalVisible(true);
    form.setFieldsValue({
      salary: employee.salary || "",
    });
  };

  const handleSaveSalary = async () => {
    try {
      const values = await form.validateFields();

      if (!selectedEmployee) return;

      await updateSalary(selectedEmployee.id, parseFloat(values.salary));
      const updatedList = await getSignedEmployees();
      setEmployees(updatedList);

      setUpdateSalaryModalVisible(false);
      setSelectedEmployee(null);
      form.resetFields();
    } catch (error) {
      console.error("Failed to update salary:", error);
    }
  };

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatarUrl",
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
      render: (gender) => (
        <Tag color={gender === "Male" ? "cyan" : "pink"}>{gender}</Tag>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (email) => <a href={`mailto:${email}`}>{email}</a>,
    },
    { title: "Phone", dataIndex: "phone" },
    { title: "Position", dataIndex: "position" },
    {
      title: "Salary",
      dataIndex: "salary",
      render: (salary) => <Tag color="purple">${salary}</Tag>,
    },
    {
      title: "Actions",
      render: (_, record) => (
        <div className="flex flex-col gap-2">
          <Button
            type="default"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(record)}
          >
            Full details
          </Button>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleUpdateSalary(record)}
          >
            Update salary
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={employees}
        rowKey="id"
        bordered
        pagination={{ pageSize: 4 }}
      />

      {/* View Full Details Modal */}
      <Modal
        title={
          <div className="text-xl font-bold text-gray-800">
            Employee Details
          </div>
        }
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={null}
        width={800}
        centered
      >
        {selectedEmployee && (
          <EmployeeProfile employee={selectedEmployee} isPage={false} />
        )}
      </Modal>

      {/* Update Salary Modal with Form */}
      <Modal
        title="UPDATE SALARY"
        open={updateSalaryModalVisible}
        onCancel={() => {
          setUpdateSalaryModalVisible(false);
          form.resetFields();
        }}
        onOk={handleSaveSalary}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="salary"
            label="Enter employee's new salary:"
            layout="horizontal"
            rules={[
              { required: true, message: "Please enter the new salary amount" },
              {
                type: "number",
                min: 0,
                message: "Salary must be a positive number",
                transform: (val) => Number(val),
              },
            ]}
          >
            <Input type="number" prefix="$" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SignedEmployeesTable;

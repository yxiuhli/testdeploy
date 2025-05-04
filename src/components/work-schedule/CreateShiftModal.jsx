"use client";
import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  DatePicker,
  TimePicker,
  Select,
  Avatar,
} from "antd";
import { useEmployees } from "@/hooks/useEmployees";

const { RangePicker } = TimePicker;

const CreateShiftModal = ({ visible, onCancel, onCreate }) => {
  const [form] = Form.useForm();
  const { getSignedEmployees } = useEmployees();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadEmployees = async () => {
      setLoading(true);
      const data = await getSignedEmployees();
      setEmployees(data);
      setLoading(false);
    };

    if (visible) {
      loadEmployees();
    }
  }, [visible]);

  const filterOption = (inputValue, option) => {
    return option.label.toLowerCase().includes(inputValue.toLowerCase());
  };

  return (
    <Modal
      title="CREATE NEW WORK SHIFT"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => {
            form
              .validateFields()
              .then((values) => {
                onCreate({
                  ...values,
                  date: values.date.format("YYYY-MM-DD"),
                  startTime: values.time[0].format("HH:mm:ss"),
                  endTime: values.time[1].format("HH:mm:ss"),
                  employeeIds: values.employees,
                });
                form.resetFields();
              })
              .catch(console.error);
          }}
        >
          Create
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Shift Title"
          rules={[{ required: true, message: "Please input the shift title!" }]}
        >
          <Input placeholder="Morning Shift, Meeting, etc." />
        </Form.Item>

        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: "Please select the date!" }]}
        >
          <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="time"
          label="Time Range"
          rules={[{ required: true, message: "Please select the time range!" }]}
        >
          <RangePicker format="HH:mm" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="employees"
          label="Assign Employees"
          rules={[
            { required: true, message: "Please select at least one employee!" },
          ]}
        >
          <Select
            mode="multiple"
            loading={loading}
            placeholder="Search and select employees..."
            filterOption={filterOption}
            optionFilterProp="label"
            showSearch
          >
            {employees.map((employee) => (
              <Select.Option
                key={employee.id}
                value={employee.id}
                label={`${employee.firstName} ${employee.lastName}`}
              >
                <div className="flex items-center gap-3">
                  <Avatar src={employee.avatarUrl} size="small" />
                  <div>
                    <span>{`${employee.firstName} ${employee.lastName}`}</span>
                    <div className="text-xs text-gray-500">
                      {employee.position?.replace(/_/g, " ")}
                    </div>
                  </div>
                </div>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateShiftModal;

"use client";
import { useState } from "react";
import { Modal, Form, Input, DatePicker, Select, Button } from "antd";

const RequestSubmitModal = ({ isOpen, onClose, onSubmit }) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const values = await form.validateFields();
      await onSubmit({
        ...values,
        startDate: values.dateRange[0].toISOString(),
        endDate: values.dateRange[1].toISOString(),
      });
      form.resetFields();
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      title="NEW LEAVE REQUEST"
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={submitting}
          onClick={handleSubmit}
          className="bg-blue-600"
        >
          Submit
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Leave Type"
          name="type"
          rules={[{ required: true, message: "Please select leave type" }]}
        >
          <Select placeholder="Select leave type">
            <Select.Option value="PAID">Paid Leave</Select.Option>
            <Select.Option value="UNPAID">Unpaid Leave</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Date Range"
          name="dateRange"
          rules={[{ required: true, message: "Please select date range" }]}
        >
          <DatePicker.RangePicker className="w-full" />
        </Form.Item>

        <Form.Item
          label="Reason"
          name="reason"
          rules={[{ required: true, message: "Please enter reason" }]}
        >
          <Input.TextArea placeholder="Write your reason" rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RequestSubmitModal;

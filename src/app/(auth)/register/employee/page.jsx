"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Button,
  Form,
  Input,
  Typography,
  Row,
  Col,
  Select,
  DatePicker,
} from "antd";

const { Title } = Typography;

const EmployeeRegisterPage = () => {
  const router = useRouter();
  const { registerEmployee, isLoading, error } = useAuth();
  const [formError, setFormError] = useState("");

  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    try {
      await registerEmployee(values);
    } catch (err) {
      setFormError(err.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-5xl w-full bg-white p-8 rounded-lg shadow-lg">
        {/* Title with Logo */}
        <div className="flex items-center justify-center mb-6">
          <img src="/img/logo.png" alt="logo" className="w-10 h-10 mr-3" />
          <Title level={3} className="text-rose-700 m-0">
            EMPLOYEE REGISTER
          </Title>
        </div>

        <Form layout="vertical" onFinish={onFinish}>
          {/* Two column layout */}
          <Row gutter={24}>
            {/* Left section */}
            <Col span={12}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label={<>FIRST NAME</>}
                    name="firstName"
                    rules={[
                      { required: true, message: "First name is required" },
                    ]}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={<>LAST NAME</>}
                    name="lastName"
                    rules={[
                      { required: true, message: "Last name is required" },
                    ]}
                  >
                    <Input placeholder="Last Name" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label={<>EMAIL</>}
                name="email"
                rules={[
                  { required: true, message: "Email is required" },
                  { type: "email", message: "Enter a valid email" },
                ]}
              >
                <Input placeholder="Email Address" />
              </Form.Item>

              <Form.Item
                label={<>PASSWORD</>}
                name="password"
                rules={[{ required: true, message: "Password is required" }]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item
                label={<>CONFIRM PASSWORD</>}
                name="confirmPassword"
                rules={[{ required: true, message: "Please confirm password" }]}
              >
                <Input.Password placeholder="Confirm Password" />
              </Form.Item>
            </Col>

            {/* Right section */}
            <Col span={12}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="GENDER"
                    name="gender"
                    rules={[
                      { required: true, message: "Please select gender" },
                    ]}
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
                    label="DATE OF BIRTH"
                    name="dateOfBirth"
                    rules={[
                      {
                        required: true,
                        message: "Please pick your birth date",
                      },
                    ]}
                  >
                    <DatePicker className="w-full" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                label="PHONE"
                name="phone"
                rules={[{ required: true, message: "Phone is required" }]}
              >
                <Input placeholder="Phone Number" />
              </Form.Item>
              
              <Form.Item
                label="ADDRESS"
                name="address"
                rules={[{ required: true, message: "Address is required" }]}
              >
                <Input.TextArea rows={4} placeholder="Address" />
              </Form.Item>
            </Col>
          </Row>

          {/* Error message */}
          {(formError || error) && (
            <div className="text-red-600 text-sm mb-3 text-center">
              {formError || error}
            </div>
          )}

          {/* Submit & Cancel buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              className="px-8"
            >
              {isLoading ? "Registering..." : "Register"}
            </Button>
            <Button
              variant="filled" color="danger"
              onClick={() => router.push("/login")}
              className="px-8"
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EmployeeRegisterPage;

"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button, Form, Input, Typography, Row, Col } from "antd";

const { Title, Text } = Typography;

const RegisterPage = () => {
  const router = useRouter();
  const { register, isLoading, error } = useAuth();
  const [formError, setFormError] = useState("");

  const onFinish = async (values) => {
    const { confirmPassword, ...rest } = values;

    if (values.password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    try {
      await register(rest);
    } catch (err) {
      setFormError(err.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-5xl w-full">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex">
          {/* Left Section */}
          <div className="w-1/2 p-8">
            <Title level={3} style={{ color: "#be123c" }}>
              REGISTER
            </Title>

            <Form layout="vertical" onFinish={onFinish}>
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
                rules={[
                  { required: true, message: "Please confirm your password" },
                ]}
              >
                <Input.Password placeholder="Confirm Password" />
              </Form.Item>

              {(formError || error) && (
                <Text type="danger">{formError || error}</Text>
              )}

              <Form.Item className="mt-4">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  className="w-full"
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </Form.Item>
            </Form>
          </div>

          {/* Right Section */}
          <div className="w-1/2 bg-rose-700 p-8 flex flex-col items-center justify-center text-white">
            <img
              src="/img/logo.png"
              alt="logo"
              className="w-10 h-10 mr-2 mb-4"
            />
            <h2 className="text-2xl font-semibold mb-2">
              Welcome to Yexiu Cafe!
            </h2>
            <p className="mb-6">Already have an account?</p>
            <Button
              type="default"
              onClick={() => router.push("/login")}
              className="rounded-full h-12 text-lg px-6"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

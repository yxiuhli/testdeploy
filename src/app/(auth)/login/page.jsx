"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
  Alert,
} from "antd";

const { Title, Text } = Typography;

const LoginPage = () => {
  const { login, error: authError } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [form] = Form.useForm();
  const router = useRouter();

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setError("");

    try {
      const { email, password } = values;

      // Basic validation
      if (!email || !password) {
        throw new Error("Please fill in all required fields");
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Please enter a valid email address");
      }

      // Attempt login
      await login(email, password);

      // Navigate after successful login
      // router.push("/");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex">
          {/* Left Section */}
          <div className="w-1/2 p-8">
            <Title level={3} style={{ color: '#be123c' }}>LOGIN</Title>

            {(error || authError) && (
              <Alert
                message={error || authError}
                type="error"
                showIcon
                className="mb-4"
              />
            )}

            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              disabled={isLoading}
              initialValues={{
                rememberMe: false,
              }}
            >
              <Form.Item
                label="EMAIL"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  {
                    type: "email",
                    message: "Please enter a valid email address",
                  },
                ]}
              >
                <Input placeholder="Email Address" />
              </Form.Item>

              <Form.Item
                label="PASSWORD"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </Form.Item>

             
            </Form>
          </div>

          {/* Right Section */}
          <div className="w-1/2 bg-rose-700 p-8 flex flex-col items-center justify-center text-white">
            <img src="/img/logo.png" alt="logo" className="w-10 h-10 mr-2 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Welcome back!</h2>
            <p className="mb-6">Don't have an account?</p>
            <Button
              onClick={() => router.push("/register")}
              type="default"
              className="rounded-full h-12 text-lg px-6"
              disabled={isLoading}
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

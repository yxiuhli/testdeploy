"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Result, Spin, Button } from "antd";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";

const PaymentSuccess = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const searchParams = useSearchParams();

  const orderId = searchParams.get("orderId");
  const paymentId = searchParams.get("paymentId");
  const payerId = searchParams.get("PayerID");

  useEffect(() => {
    const executePayment = async () => {
      try {
        if (!orderId || !paymentId || !payerId) return;

        const response = await fetch(
          `http://localhost:8080/api/orders/${orderId}/execute-payment`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              paymentId,
              payerId,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Payment execution failed");
        }

        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setErrorMessage(error.message);
        setIsLoading(false);
      }
    };

    executePayment();
  }, [orderId, paymentId, payerId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spin size="large" tip="Processing your payment...">
          <div className="content" />
        </Spin>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Result
          status="error"
          title="Payment Failed"
          subTitle={errorMessage}
          icon={<CloseCircleFilled className="text-red-500" />}
          extra={[
            <Button
              type="primary"
              key="contact"
              className="bg-blue-500 hover:bg-blue-600"
              onClick={() => router.push("/contact")}
            >
              Contact Support
            </Button>,
            <Button
              key="home"
              onClick={() => router.push("/")}
              className="hover:bg-gray-100"
            >
              Back Home
            </Button>,
          ]}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Result
        status="success"
        icon={<CheckCircleFilled className="text-green-500" />}
        title="Payment Successful!"
        subTitle="Thank you for your purchase. Your payment has been processed successfully."
        extra={[
          <Button
            key="home"
            onClick={() => router.push("/")}
            className="hover:bg-gray-100"
          >
            Back Home
          </Button>,
        ]}
      />
    </div>
  );
};

export default PaymentSuccess;

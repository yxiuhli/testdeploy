"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { Result, Button } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

const PaymentCancel = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Result
        status="warning"
        icon={<ExclamationCircleFilled className="text-yellow-500" />}
        title="Payment Cancelled"
        subTitle="Your payment process was interrupted or cancelled."
        extra={[
        
          <Button
            type="primary"
            key="retry"
            className="bg-blue-500 hover:bg-blue-600"
            onClick={() => router.push('/checkout')} // Replace with your payment page route
          >
            Retry Payment
          </Button>,
          <Button
            key="home"
            onClick={() => router.push('/')}
            className="hover:bg-gray-100"
          >
            Back Home
          </Button>
        ]}
      />
    </div>
  );
};

export default PaymentCancel;
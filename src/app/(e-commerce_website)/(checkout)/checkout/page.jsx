"use client";
import React from "react";
import { Form, Input, Select, Button, Radio } from "antd";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";

const { Option } = Select;

const CheckoutPage = () => {
  const [form] = Form.useForm();

  const { cart } = useCart();

  const calculateTotal = () => {
    const total = cart.items.reduce((sum, item) => sum + item.price, 0);
    return       total;
  };

  const onFinish = (values) => {
    console.log("Received values:", values);
  };

  return (
    <div className="min-h-screen bg-blue-100 py-12">
      <div className="max-w-7xl mx-auto py-6 px-10 bg-white rounded-lg drop-shadow-md">
        <div className="text-2xl font-semibold mb-4">
          <h1>Checkout</h1>
        </div>
        <hr/>

        <div className="grid grid-cols-1 md:grid-cols-2 divide-x gap-8 py-6">
          {/* Left Column - Form */}
          <div className="rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item
                name="fullName"
                label="Full name"
                rules={[
                  { required: true, message: "Please enter your full name" },
                ]}
              >
                <Input placeholder="Enter full name" className="py-2" />
              </Form.Item>


              <Form.Item
                name="phone"
                label="Phone number"
                rules={[
                  { required: true, message: "Please enter your phone number" },
                ]}
              >
                <Input
                  placeholder="Enter phone number"
                  className="py-2"
                />
              </Form.Item>
              <Form.Item
                name="address"
                label="Shipping address"
                rules={[
                  {
                    required: true,
                    message: "Please enter your shipping address",
                  },
                ]}
              >
                <Input placeholder="Enter shipping address" className="py-2" />
              </Form.Item>
              <div className="">
                <h2 className="font-medium mb-2">Payment Method</h2>
                <Radio.Group className="w-full " defaultValue={"cod"}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4 flex items-center space-x-2 cursor-pointer hover:border-blue-500">
                      <Radio value="cod">
                        <span className="ml-2">Cash on Delivery</span>
                      </Radio>
                    </div>
                    <div className="border rounded-lg p-4 flex items-center space-x-2 cursor-pointer hover:border-blue-500">
                      <Radio value="transfer">
                        <span className="ml-2">Paypal</span>
                      </Radio>
                    </div>
                  </div>
                </Radio.Group>
              </div>
            </Form>
          </div>

          {/* Right Column - Cart Summary */}
          <div>
            <div className="bg-white px-8 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

              {cart.items.length > 0 ? (
              cart.items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex items-center justify-between py-4 border-b">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg">
                      <Image
                        src={item.image || "/api/placeholder/64/64"}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="rounded-lg h-16 w-16 object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        {item.quantity}x · {item.size && `Size: ${item.size}`}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-gray-500">
                Your cart is empty
              </div>
            )}

             

              <div className="mt-6 space-y-2 border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total</span>
                  <span>${calculateTotal()}</span>
                </div>
              
              </div>

              <Button
                type="primary"
                size="large"
                className="w-full mt-6 h-12 bg-blue-600"
                onClick={() => form.submit()}
              >
                Submit Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
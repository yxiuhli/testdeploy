"use client"
import { Card, Row, Col } from "antd";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, Tooltip, CartesianGrid } from "recharts";
import { ArrowUpOutlined, MoreOutlined, DownloadOutlined, ArrowDownOutlined } from "@ant-design/icons";

const timeData = [
  { month: 'Jan 2024', revenue: 3467, target: 0 },
  { month: 'Feb 2024', revenue: 2109, target: 0 },
  { month: 'Mar 2024', revenue: 2842, target: 0 },
  { month: 'Apr 2024', revenue: 3063, target: 0 },
  { month: 'May 2024', revenue: 1564, target: 0 },
  { month: 'Jun 2024', revenue: 1735, target: 0 },
  { month: 'Jul 2024', revenue: 2309, target: 0 },
  { month: 'Aug 2024', revenue: 1905, target: 0 },
  { month: 'Sep 2024', revenue: 2634, target: 0 },
  { month: 'Oct 2024', revenue: 3456, target: 0 },
  { month: 'Nov 2024', revenue: 1987, target: 0 },
  { month: 'Dec 2024', revenue: 2789, target: 0 },
];

const bestSellingProducts = [
    { name: 'Caramel Macchiato', sold: 1344 },
    { name: 'Green Tea Latte', sold: 950 },
    { name: 'Mixed-berry Smoothie', sold: 740 },
    { name: 'Taro Milktea', sold: 610 },
    { name: 'Fresh Lemonade', sold: 450 },
  ];

  const sortedProducts = [...bestSellingProducts].sort((a, b) => b.sold - a.sold);


export default function Analytics() {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="px-8 pt-6 pb-4 bg-slate-200">
        <h1 className="text-2xl font-bold">SALE STATISTICS</h1>
      </div>
      <div className="py-8 px-8">
        {/* Top Stats Cards */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={12} md={6}>
            <Card className="shadow-md">
              <div className="space-y-1">
                <div className="text-sm text-gray-600">Total Revenue</div>
                <div className="text-2xl font-semibold">$26.352</div>
                <div className="flex items-center text-xs text-green-500">
                  <ArrowUpOutlined />
                  <span className="ml-1">4.50% Compared to last month</span>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="shadow-md">
              <div className="space-y-1">
                <div className="text-sm text-gray-600">Total Orders</div>
                <div className="text-2xl font-semibold">3294</div>
                <div className="flex items-center text-xs text-green-500">
                  <ArrowUpOutlined />
                  <span className="ml-1">3.26% Compared to last month</span>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="shadow-md">
              <div className="space-y-1">
                <div className="text-sm text-gray-600">Total Views</div>
                <div className="text-2xl font-semibold">10320</div>
                <div className="flex items-center text-xs text-green-500">
                  <ArrowUpOutlined />
                  <span className="ml-1">0.00% Compared to last month</span>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="shadow-md">
              <div className="space-y-1">
                <div className="text-sm text-gray-600">New Register Users</div>
                <div className="text-2xl font-semibold">50</div>
                <div className="flex items-center text-xs text-red-500">
                  <ArrowDownOutlined />
                  <span className="ml-1">12.00% Compared to last month</span>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Charts Row */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} lg={12}>
            <Card 
              title="Revenue Over Time" 
              extra={<div className="flex space-x-2"><MoreOutlined /></div>}
              className="shadow-md"
            >
              {/* <div className="mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm">Total Revenue</span>
                    <span className="ml-2 text-sm">$0.00</span>
                    <span className="ml-2 text-sm text-gray-500">• 0%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                    <span className="text-sm">Total Target</span>
                    <span className="ml-2 text-sm">$0.00</span>
                    <span className="ml-2 text-sm text-gray-500">• 0%</span>
                  </div>
                </div>
              </div> */}
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timeData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Line type="monotone" dataKey="revenue" stroke="#3b82f6" dot={false} />
                    <Line type="monotone" dataKey="target" stroke="#f97316" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </Col>
          
          <Col xs={24} lg={12}>
            <Card
              title="Best Selling Products"
              extra={<MoreOutlined />}
              className="shadow-md"
            >
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sortedProducts}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="name"
                      tick={({ x, y, payload }) => {
                        const words = payload.value.split(" ");
                        const firstLine = words.slice(0, Math.ceil(words.length / 2)).join(" ");
                        const secondLine = words.slice(Math.ceil(words.length / 2)).join(" ");
                        return (
                          <g transform={`translate(${x},${y})`}>
                            <text x={0} y={0} dy={10} textAnchor="middle" fill="#6b7280" fontSize="12">
                              <tspan x="0" dy="0">{firstLine}</tspan>
                              <tspan x="0" dy="15">{secondLine}</tspan>
                            </text>
                          </g>
                        );
                      }}
                      axisLine={false}
                      tickLine={false}
                      interval={0} 
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: "#6b7280" }} 
                      axisLine={false} 
                      tickLine={false} 
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "#111827", 
                        color: "#fff", 
                        borderRadius: "8px", 
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)"
                      }} 
                      itemStyle={{ color: "#fff" }} 
                      formatter={(value) => [`${value} units`, "Sold"]}
                    />
                    <Bar 
                      dataKey="sold" 
                      fill="url(#gradient)" 
                      radius={[10, 10, 0, 0]} 
                      barSize={30}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#60a5fa" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </Col>
        </Row>

      </div>
    </div>
  );
}
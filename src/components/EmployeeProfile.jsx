"use client";
import { Tag, Avatar, Descriptions } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

const EmployeeProfile = ({ employee, isPage = true }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <div className={`py-4 ${isPage ? "flex divide-x gap-12" : ""}`}>
      <div className="flex flex-col items-center mb-6">
        <Avatar
          src={employee.avatarUrl}
          size={isPage ? 300 : 120}
          icon={<UserOutlined />}
          className="mb-4 border-2 border-blue-200"
        />
        <h2 className="text-2xl font-semibold">
          {employee.firstName} {employee.lastName}
        </h2>
        <div className="flex gap-2 mt-2">
          <Tag color="geekblue" className="text-sm">
            {employee.role}
          </Tag>
          <Tag color="green" className="text-sm">
            {employee.position}
          </Tag>
        </div>
      </div>

      <Descriptions
        bordered
        column={2}
        size=""
        className={isPage ? "pl-12 w-full" : ""}
      >
        <Descriptions.Item
          label={
            <span className={`font-semibold ${isPage ? "text-lg" : ""}`}>
              <UserOutlined /> Gender
            </span>
          }
        >
          <Tag
            color={employee.gender === "Male" ? "cyan" : "pink"}
            className={isPage ? "text-lg" : ""}
          >
            {employee.gender}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <span className={`font-semibold ${isPage ? "text-lg" : ""}`}>
              💰 Salary
            </span>
          }
        >
          <Tag color="purple" className={isPage ? "text-lg" : ""}>
            ${employee.salary?.toLocaleString()}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <span className={`font-semibold ${isPage ? "text-lg" : ""}`}>
              <CalendarOutlined /> Hire Date
            </span>
          }
          span={isPage ? 2 : 1}
        >
          <div className={isPage ? "text-lg" : "text-gray-700"}>
            {formatDate(employee.hireDate)}
          </div>
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <span className={`font-semibold ${isPage ? "text-lg" : ""}`}>
              <PhoneOutlined /> Phone
            </span>
          }
          span={2}
        >
          <div className={isPage ? "text-lg" : "text-gray-700"}>
            {employee.phone || "N/A"}
          </div>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <span className={`font-semibold ${isPage ? "text-lg" : ""}`}>
              <MailOutlined /> Email
            </span>
          }
          span={isPage ? 2 : 1}
        >
          <a
            href={`mailto:${employee.email}`}
            className={`text-blue-600 ${isPage ? "text-lg" : ""}`}
          >
            {employee.email}
          </a>
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <span className={`font-semibold ${isPage ? "text-lg" : ""}`}>
              <CalendarOutlined /> Date of Birth
            </span>
          }
          span={2}
        >
          <div className={isPage ? "text-lg" : "text-gray-700"}>
            {" "}
            {formatDate(employee.dateOfBirth)}
          </div>
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <span className={`font-semibold ${isPage ? "text-lg" : ""}`}>
              <EnvironmentOutlined /> Address
            </span>
          }
          span={2}
        >
          <div className={isPage ? "text-lg" : "text-gray-700"}>
            {employee.address
              ?.split("\n")
              .map((line, i) => <p key={i}>{line}</p>) || "N/A"}
          </div>
        </Descriptions.Item>
      </Descriptions>

      {/* <div className="mt-6 text-sm text-gray-500 text-center">
        <p>Account created: {formatDate(employee.hireDate)}</p>
      </div> */}
    </div>
  );
};

export default EmployeeProfile;

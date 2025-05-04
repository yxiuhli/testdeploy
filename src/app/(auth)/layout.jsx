"use client";
import { ConfigProvider } from "antd";

const customTheme = {
  token: {
    colorPrimary: "#a50036", // Tailwind's rose-700
    borderRadius: 6, // Tailwind's rounded-md
    colorPrimaryHover: "#be123c",

    colorBgContainer: "#ffffff",
    controlHeight: 40, // input/button height
    lineWidth: 2,
    lineWidthFocus: 2,
    boxShadow: "0 0 0 1px rgba(165, 0, 54, 0.2)",
  },
  components: {
    Button: {
      defaultHoverBg: "#fff",
      defaultBg: "#be123c",
      defaultColor: "#fff",
    },
  },
};

const AuthLayout = ({ children }) => {
  return (
    <ConfigProvider theme={customTheme}>
      <div className="bg-gray-50">{children}</div>
    </ConfigProvider>
  );
};

export default AuthLayout;

import {
    MailOutlined,
    PhoneOutlined,
    ClockCircleOutlined,
    EnvironmentOutlined,
  } from "@ant-design/icons";
  
  const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-14 text-center justify-items-center md:text-left">
          <div className="col-span-3 justify-self-start">
            <div className="flex items-center justify-start">
              <img src="/img/logo.png" alt="logo" className="w-10 h-10 mx-auto" />
              <h1 className="text-3xl font-semibold">YEXIU CAFÉ</h1>
            </div>
            <p className="text-sm mt-4 text-center">Copyright &copy; 2024</p>
          </div>
  
          {/* Address */}
          <div className="col-span-3">
            <div className="flex gap-2 items-center">
              <EnvironmentOutlined className="text-orange-500 text-2xl mx-auto md:mx-0" />
              <h3 className="text-lg font-semibold">Address</h3>
            </div>
  
            <p className="text-sm mt-4">
              168, Ta Quang Buu Street, Dong Hoa District, Di An City, Binh Duong,
              Vietnam
            </p>
          </div>
  
          {/* Email */}
          <div className="col-span-2">
            <div className="flex gap-2 items-center">
              <MailOutlined className="text-orange-500 text-2xl mx-auto md:mx-0" />
              <h3 className="text-lg font-semibold">E-mail</h3>
            </div>
  
            <p className="text-sm mt-4">
              <a href="mailto:noreply@envato.com" className="hover:underline">
                support.yexiu@example.com
              </a>
            </p>
          </div>
  
          {/* Phone */}
          <div className="col-span-2">
            <div className="flex gap-2 items-center">
              <PhoneOutlined className="text-orange-500 text-2xl mx-auto md:mx-0" />
              <h3 className="text-lg font-semibold ">Call us</h3>
            </div>
            <p className="text-sm mt-4">(+84) 0 0000 0000</p>
          </div>
  
          {/* Opening Hours */}
          <div className="col-span-2">
            <div className="flex gap-2 items-center">
              <ClockCircleOutlined className="text-orange-500 text-2xl mx-auto md:mx-0" />
              <h3 className="text-lg font-semibold ">Opening hours</h3>
            </div>
            <p className="text-sm mt-4">
              Online: 8:00 - 20:00
              <br />
              Offline: 24/24 hours
            </p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
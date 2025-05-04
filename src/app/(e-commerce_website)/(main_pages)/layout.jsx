import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import React, { Suspense } from "react";

const MainPagesLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      <Footer />
    </>
  );
};

export default MainPagesLayout;

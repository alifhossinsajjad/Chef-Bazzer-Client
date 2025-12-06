import React from "react";
import Navbar from "../../Pages/Sheard/Navbar";
import { Outlet } from "react-router";
import Footer from "../../Pages/Sheard/Footer";

const RootLayout = () => {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default RootLayout;

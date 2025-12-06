import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <div className="flex items-end">
      <img src={logo} alt="" />
      <Link to={'/'} className="font-bold text-xl -ms-3">ChefCorner</Link>
    </div>
  );
};

export default Logo;
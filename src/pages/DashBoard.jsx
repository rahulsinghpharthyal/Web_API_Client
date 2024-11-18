import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Home from "./Home";

const DashBoard = () => {
  return (
    <div>
      <div>
      <Navbar />
      </div>
      <Outlet />
    </div>
  );
};

export default DashBoard;

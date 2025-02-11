import React from "react";
import "./topbar.css";

export default function Topbar({ isSidebarOpen }) {
  return (
    <div className={`topbar ${isSidebarOpen ? "shifted" : ""}`}>
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">BMP ATTENDANCE ADMIN</span>
        </div>
      </div>
    </div>
  );
}
"use client";
import { useState } from "react";

export default function Sidebar({toggle}:{
    toggle:{
        isCollapsed:boolean,
        setIsCollapsed:Function
    }
}) {
    
    console.log(toggle.isCollapsed,toggle.setIsCollapsed)
  

  return (
    <div
    onMouseEnter={() => toggle.setIsCollapsed(!toggle.isCollapsed)}
        onMouseLeave={() => toggle.setIsCollapsed(!toggle.isCollapsed)}
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-gray-800 transition-all duration-300 ${
        toggle.isCollapsed ? "w-16" : "w-40"
      }`}
    >
      <button
        
        className="bg-white p-2 m-4"
      >
        {toggle.isCollapsed ? ">" : "<"}
      </button>
      {!toggle.isCollapsed && <div className="mt-4">Menu Items</div>}
    </div>
  );
}

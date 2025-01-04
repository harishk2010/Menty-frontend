"use client"
import { ReactElement, useState } from "react";
import layout from "../layout"
import Sidebar from "../components/instructor/Sidebar";
export default function MainLayout({children}:{
    children:ReactElement
}):ReactElement{
  const [isCollapsed, setIsCollapsed] = useState(true);
    return(
      <div className="relative flex flex-1">
            {/* Sidebar */}
            <Sidebar toggle={{isCollapsed,setIsCollapsed}} />
            {/* Scrollable Main Content */}
            
            <main className={`flex-1 overflow-y-auto
            ${isCollapsed?" pt-16 ml-14 lg:ml-14 xl:ml-14":"pt-16 ml-40 lg:ml-40 xl:ml-40"}
               
               transition-all duration-300`}>
            {/* <main className="flex-1 overflow-y-auto pt-16 ml-14 lg:ml-14 xl:ml-14 transition-all duration-300"> */}
              <div className="p-4">{children}</div>
            </main>
          </div>
    )
}
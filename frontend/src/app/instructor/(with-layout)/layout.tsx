// import Header from '../../components/instructor/Header';
// import Sidebar from '../../components/instructor/Sidebar';

// export const metadata = {
//   title: "My Next.js App",
//   description: "An example app with a header and collapsible sidebar",
// };
// const RootLayout = ({ children }: { children: React.ReactNode }) => {
//   return (

//         <div className="flex flex-col h-screen bg-purple-800 " >
//           <Header />
//           <div className="flex flex-grow overflow-hidden">
//             {/* Sidebar remains fixed */}
//             <div className="sticky top-0 h-full">
//               <Sidebar />
//             </div>

//             {/* Main content area is scrollable */}
//             <main className="flex-grow overflow-y-auto rounded-lg p-4 bg-gray-100">
//               {children}
//             </main>
//           </div>
//         </div>

//   );
// };

// export default RootLayout;
"use client";

import React from "react";
import Header from "../../components/instructor/Header";
import Sidebar from "../../components/instructor/Sidebar";

export const metadata = {
  title: "My Next.js App",
  description: "An example app with a header and collapsible sidebar",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar */}
        <div className="h-full">
          <Sidebar />
        </div>

        {/* Main content area */}
        <main className="flex-grow overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Content wrapper with subtle styling */}
            <div className="bg-white rounded-xl shadow-sm p-6">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}

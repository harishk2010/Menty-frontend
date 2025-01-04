
// import { Geist, Geist_Mono } from "next/font/google";
// import "../../app/globals.css";
// import Header from "../components/instructor/Header";
// import Sidebar from "../components/instructor/Sidebar";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
//         <div className="flex flex-col h-screen">
//           {/* Fixed Header */}
//           <Header />
//           <div className="relative flex flex-1">
//             {/* Sidebar */}
//             <Sidebar />
//             {/* Scrollable Main Content */}
//             <main className="flex-1 overflow-y-auto pt-16 ml-14 lg:ml-14 xl:ml-14 transition-all duration-300">
//               <div className="p-4">{children}</div>
//             </main>
//           </div>
//         </div>
//       </body>
//     </html>
//   );
// }

import { Geist, Geist_Mono } from "next/font/google";
import "../../app/globals.css";
import Header from "../components/instructor/Header";
import Sidebar from "../components/instructor/Sidebar";
import MainLayout from "./page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex flex-col h-screen">
  
          <Header />
          <MainLayout >{children}</MainLayout>
          
        </div>
      </body>
    </html>
  );
}

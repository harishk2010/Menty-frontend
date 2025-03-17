import "./globals.css"; // Import global Tailwind CSS
import {ToastContainer, toast, Slide, Flip, Zoom, Bounce } from "react-toastify";
import { StoreProvider } from "./storeProvider";
export const metadata = {
  title: "Menty",
  description: "E-Learning with Mentor Suppport!",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <StoreProvider>
          {children}
          <ToastContainer 
          autoClose={2000}
          pauseOnHover={false}
          transition={Slide}
          hideProgressBar={false}
          closeOnClick={false}
          pauseOnFocusLoss={true}
          />
        </StoreProvider>
      </body>
    </html>
  );
};

export default RootLayout;

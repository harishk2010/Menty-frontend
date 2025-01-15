import "./globals.css"; // Import global Tailwind CSS
import { ToastContainer, toast } from "react-toastify";
import { StoreProvider } from "./storeProvider";
export const metadata = {
  title: "Menty",
  description: "An example app with a header and collapsible sidebar",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <StoreProvider>
          {children}
          <ToastContainer />
        </StoreProvider>
      </body>
    </html>
  );
};

export default RootLayout;

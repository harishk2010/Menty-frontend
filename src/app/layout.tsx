


import './globals.css'; // Import global Tailwind CSS
import { ToastContainer, toast } from 'react-toastify';
export const metadata = {
  title: 'Menty',
  description: 'An example app with a header and collapsible sidebar',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" >
      <body className="bg-gray-100">

        
              {children}
              <ToastContainer/>
            
      </body>
    </html>
  );
};

export default RootLayout;

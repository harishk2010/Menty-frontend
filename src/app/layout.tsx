


import './globals.css'; // Import global Tailwind CSS

export const metadata = {
  title: 'My Next.js App',
  description: 'An example app with a header and collapsible sidebar',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" >
      <body className="bg-gray-100">
        
              {children}
            
      </body>
    </html>
  );
};

export default RootLayout;

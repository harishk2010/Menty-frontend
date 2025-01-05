
import Header from '../../components/instructor/Header';
import Sidebar from '../../components/instructor/Sidebar';

export const metadata = {
  title: 'My Next.js App',
  description: 'An example app with a header and collapsible sidebar',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    
        <div className="flex flex-col h-screen" suppressHydrationWarning>
          <Header />
          <div className="flex flex-grow overflow-hidden">
            {/* Sidebar remains fixed */}
            <div className="sticky top-0 h-full">
              <Sidebar />
            </div>

            {/* Main content area is scrollable */}
            <main className="flex-grow overflow-y-auto p-4 bg-gray-100">
              {children}
            </main>
          </div>
        </div>
     
  );
};

export default RootLayout;

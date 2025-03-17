import Header from '../../components/admin/Header';
import Sidebar from '../../components/admin/Sidebar';

export const metadata = {
  title: 'Menty Admin Dashboard',
  description: 'Administrative portal for Menty platform',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <Header />
      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar remains fixed */}
        <div className="sticky top-0 h-full">
          <Sidebar />
        </div>
        
        {/* Main content area is scrollable */}
        <main className="flex-grow overflow-y-auto p-4 bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
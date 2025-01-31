
import CustomHeader from '@/app/components/instructor/CustomHeader';
import RegisterHeader from '../../components/instructor/RegisterHeader';
import RegisterFooter from '../../components/instructor/RegisterFooter';
import CustomFooter from '@/app/components/instructor/CustomFooter';

export const metadata = {
  title: 'My Next.js App',
  description: 'An example app with a header and collapsible sidebar',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    
    <div className="bg-white h-screen w-full flex flex-col  items-center">
      {/* <CustomHeader PropHeader={RegisterHeader}/> */}
      
      
      <main className="">
            
              {children}
            </main>
            {/* <CustomFooter PropHeader={RegisterFooter}/> */}

      
    </div>
    
        
     
  );
};

export default RootLayout;

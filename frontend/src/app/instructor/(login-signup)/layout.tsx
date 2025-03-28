import  RegisterFooter  from "@/app/components/instructor/RegisterFooter";
import  RegisterHeader  from "@/app/components/instructor/RegisterHeader";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 min-h-screen w-full flex flex-col items-center">
      <RegisterHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <RegisterFooter />
    </div>
  );
}
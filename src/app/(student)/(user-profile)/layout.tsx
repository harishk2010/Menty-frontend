import type { Metadata } from "next";



import ProfileHeader from "@/app/components/students/pages/ProfileHeader";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<div className="min-h-screen bg-gray-100 p-6">

        <ProfileHeader/>
        {children}
</div>
      

  );
}
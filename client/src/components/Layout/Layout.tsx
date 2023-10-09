import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="w-screen h-screen bg-white flex justify-center">
      <div className="min-w-[336px] max-w-[336px] min-h-screen bg-[#F7F9FA] h-full flex flex-col overflow-auto shadow-2xl">
        {children}
      </div>
    </div>
  );
}

export default Layout;

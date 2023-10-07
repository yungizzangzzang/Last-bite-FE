import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="w-screen h-screen flex justify-center">
      <div className="min-w-[672px] max-w-2xl min-h-screen h-full flex flex-col overflow-auto shadow-2xl">
        {children}
      </div>
    </div>
  );
}

export default Layout;

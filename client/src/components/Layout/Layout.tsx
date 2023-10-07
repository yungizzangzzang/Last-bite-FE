import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="w-screen h-screen flex justify-center mb-10">
      <div className="h-screen w-[672px] max-w-2xl bg-rose-400 flex flex-col overflow-auto">
        {children}
      </div>
    </div>
  );
}

export default Layout;

import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <main className="bg-gradient-to-br from-purple-700 to-blue-50 min-h-screen flex flex-col justify-center items-center">{children}</main>;
};

export default Layout;

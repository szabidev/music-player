import { ReactNode } from "react";

import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen">
      <div>
        <Sidebar />
      </div>
      <div className="flex flex-col flex-grow">
        <div className="p-4 pr-10">
          <Header />
        </div>
        <main className="flex-grow overflow-auto p-8">{children}</main>
      </div>
    </div>
  );
};

export default Layout;

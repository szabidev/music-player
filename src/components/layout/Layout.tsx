import { ReactNode } from "react";

import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import "./layout.css";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-1">
        <Sidebar />
        <Header />
      </div>
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default Layout;

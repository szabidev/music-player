import AppProvider from "../../../context/app-provider";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import { LayoutProps } from "../../../utils/types";

const Layout = ({ children }: LayoutProps) => {
  return (
    <AppProvider>
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
    </AppProvider>
  );
};

export default Layout;

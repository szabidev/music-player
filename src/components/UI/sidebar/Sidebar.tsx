import { useState } from "react";
import { GiMusicSpell } from "react-icons/gi";
import { VscLibrary } from "react-icons/vsc";
import { LiaGuitarSolid } from "react-icons/lia";
import { MdFavorite } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../app-router/routes";
import { useAppProvider } from "../../../context/app-provider";

const navLinks = [
  { name: "Library", icon: VscLibrary, route: routes.LIBRARY },
  { name: "Artists", icon: LiaGuitarSolid, route: routes.ARTISTS },
  { name: "Favorites", icon: MdFavorite, route: routes.FAVORITES },
];

const Sidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useAppProvider();
  const [activeRoute, setActiveRoute] = useState<string>(routes.LIBRARY);

  const navigate = useNavigate();

  const handleClick = (route: string) => {
    setActiveRoute(route);
    navigate(route);
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div
      className={`w-64 bg-gray-100 h-screen fixed cursor-pointer ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <h3 className="text-xs uppercase text-slate-500 font-semibold pt-4 pl-4">
        <GiMusicSpell
          size={40}
          color="rgb(217 70 239)"
          onClick={toggleSidebar}
        />
        <p className="my-1">Nice Tunes</p>
      </h3>
      <div className="mt-2 px-3">
        <ul className="mt-3">
          {navLinks.map((link) => (
            <li
              key={link.name}
              className={`px-3 py-2 mb-0.5 last:mb-0 rounded-xl text-slate-600 ${
                activeRoute === link.route ? "bg-gray-300" : ""
              }`}
              onClick={() => handleClick(link.route)}
            >
              <link.icon
                size={20}
                className="inline mr-2"
                color={activeRoute === link.route ? "rgb(217 70 239)" : ""}
              />
              {link.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

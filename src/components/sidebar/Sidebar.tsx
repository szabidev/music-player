import { useState } from "react";
import { GiMusicSpell } from "react-icons/gi";
import { VscLibrary } from "react-icons/vsc";
import { LiaGuitarSolid } from "react-icons/lia";
import { MdFavorite } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { routes } from "../../app-router/routes";

const navLinks = [
  { name: "Library", icon: VscLibrary, route: routes.LIBRARY },
  { name: "Artists", icon: LiaGuitarSolid, route: routes.ARTISTS },
  { name: "Favorites", icon: MdFavorite, route: routes.FAVORITES },
];

const Sidebar = () => {
  const [activeRoute, setActiveRoute] = useState<string>(routes.LIBRARY);
  const navigate = useNavigate();

  const handleClick = (route: string) => {
    setActiveRoute(route);
    navigate(route);
  };

  return (
    <div className="w-64 bg-gray-100 h-dvh cursor-pointer">
      <h3 className="text-xs uppercase text-slate-500 font-semibold pt-5 pl-3">
        <GiMusicSpell size={40} color="rgb(217 70 239)" />
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

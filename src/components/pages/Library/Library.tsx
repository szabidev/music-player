import React from "react";
import { useAppProvider } from "../../../context/app-provider";

const Library = () => {
  const { music } = useAppProvider();
  console.log(music, "music");
  return (
    <div>
      <h3 className="text-2xl text-slate-500 font-bold mb-5">My Music</h3>
      <table className="table-auto w-full text-slate-500">
        <thead>
          <tr>
            <th className="w-2/3 text-left">Name</th>
            <th className="text-left">Streams</th>
            <th className="text-left">Listeners</th>
            <th className="text-left">Saves</th>
            <th className="text-left">Release Date</th>
          </tr>
        </thead>
        {/* <tbody>
          {music.map((item: any) => (
            <tr key={item.id}>
              <td className="flex items-center space-x-3">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-20 h-20"
                />
                <div>
                  <p>{item.name}</p>
                  <p>Additional Info</p>
                </div>
              </td>
              <td>{item.streams}</td>
              <td>{item.listeners}</td>
              <td>{item.saves}</td>
              <td>{item.releaseDate}</td>
            </tr>
          ))}
        </tbody> */}
      </table>
    </div>
  );
};

export default Library;

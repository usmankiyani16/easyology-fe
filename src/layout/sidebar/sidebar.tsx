import React from "react";
import { logoIcon } from "../../assets/icons";
import { siderbarData } from "./sidebar-mock-data";

const Sidebar = () => {
  return (
    <div>
      <div className="flex gap-4">
        <img src={logoIcon} alt="logo" />
        <h1>Easyology</h1>
      </div>
      <div>
        {siderbarData.map((data) => (
          <div key={data.key} className="flex gap-5 ">
            <span>{data.icon}</span>
            <span>{data.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

import React from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.scss";

import easyology from "../../assets/icons/Shopping_online.png";
import dashboard from "../../assets/icons/dashboard.png";
import purchase_order from "../../assets/icons/purchase_order.png";
import history from "../../assets/icons/history.png";
import payments from "../../assets/icons/payments.png";

// Settings k liye icon daalna hai
import settings from "../../assets/icons/Group.png";
import monthly_report from "../../assets/icons/monthly_report.png";
import daily_ledger from "../../assets/icons/daily.png";
import notification from "../../assets/icons/support.png";
import support from "../../assets/icons/support.png";

const routes = [
  {
    path: "./dashboard",
    name: "Dashboard",
    // icon: <FaHome />
    icon: dashboard,
  },
  {
    path: "./purchaseorder",
    name: "Purchase Order",
    icon: purchase_order,
  },
  {
    path: "./history",
    name: "History",
    icon: history,
  },
  {
    path: "./payments",
    name: "Payments",
    icon: payments,
  },
  {
    path: "./settings",
    name: "Settings",
    icon: settings,
  },
  {
    path: "./monthlyreport",
    name: "Monthly Report",
    icon: monthly_report,
  },
  {
    path: "./dailyledger",
    name: "Daily Ledger",
    icon: daily_ledger,
  },
  {
    path: "./notification",
    name: "Notification",
    icon: notification,
  },
  // {
  //   path: './support',
  //   name: 'Support',
  //   icon: support
  // }
];
const Sidebar = () => {
  return (
    <div className="container_main">
      <div className="home">
        <img src={easyology} alt="" className="easyology_logo" />
      </div>

      <section className="routes">
        {routes.map((route, index) => (
          <NavLink to={route.path} key={index}>
            {/* <div className="icon"></div> */}

            <div className="nav_data">
              <img src={route.icon} alt="" className="icon" />
              {/* <div className="link_text">{route.name}</div> */}
            </div>
          </NavLink>
        ))}
      </section>
    </div>
  );
};

export default Sidebar;

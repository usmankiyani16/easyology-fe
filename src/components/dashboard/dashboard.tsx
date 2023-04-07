import DashboardTabs from "./tabs/tabs";
import "./dashboard.scss";
import { useEffect } from "react";
import { useAppDispatch } from "../../store/store";
import { setLoading } from "../../store/loader/loader-slice";
import {  getCatogaries } from "../../store/catogaries/catogaries-slice";

const Dashboard = () => {
  const dispatch = useAppDispatch()

  // use effect to change loading state
  useEffect(() => {
    dispatch(getCatogaries());
  }, []);
  return (
    <div className="_dashboard_wrap">
      <DashboardTabs />
    </div>
  );
};

export default Dashboard;

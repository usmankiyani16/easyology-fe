import DashboardTabs from "./tabs/tabs";
import "./dashboard.scss";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setLoading } from "../../store/loader/loader-slice";

const Dashboard = () => {
  const dispatch = useAppDispatch()

  // use effect to change loading state
  useEffect(() => {
    dispatch(setLoading(false));
  }, []);
  return (
    <div className="_dashboard_wrap">
      <DashboardTabs />
    </div>
  );
};

export default Dashboard;

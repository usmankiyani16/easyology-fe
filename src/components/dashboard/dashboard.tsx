import DashboardTabs from "./tabs/tabs";
import "./dashboard.scss";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { loadingState } from "../../store/loader/loader.store";
import { useEffect } from "react";
import { authState } from "../../store/auth/auth.store";
import {
  categoriesSelector,
  categoriesState,
} from "../../store/categories/categories.store";

const Dashboard = () => {
  const setLoading = useSetRecoilState(loadingState);

  const auth = useRecoilValue(authState);


  console.log({ auth });

  // use effect to change loading state
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <div className="_dashboard_wrap">
      <DashboardTabs />
    </div>
  );
};

export default Dashboard;

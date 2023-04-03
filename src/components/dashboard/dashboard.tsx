import DashboardTabs from "./tabs/tabs";
import "./dashboard.scss";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loadingState } from "../../store/loading-store";
import { useEffect } from "react";
import { authState } from "../../store/auth.store";


const Dashboard = () => {
  const setLoading = useSetRecoilState(loadingState);

  const auth = useRecoilValue(authState);

  console.log(auth);

  // use effect to change loading state
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <div>
      <DashboardTabs />
      
    </div>
  );
};

export default Dashboard;

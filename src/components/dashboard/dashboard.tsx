import DashboardTabs from "./tabs/tabs";
import "./dashboard.scss";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loadingState } from "../../store/loading-store";
import { useEffect } from "react";
import { authState } from "../../store/auth.store";
import Invoice from "../invoice/invoice";

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
      {/* <DashboardTabs /> */}
      <Invoice/>
    </div>
  );
};

export default Dashboard;

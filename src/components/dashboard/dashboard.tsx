
import DashboardTabs from "./tabs/tabs";
import './dashboard.scss'
import  Invoice from '../invoice/invoice'

const Dashboard = () => {
  return (
    <div>
      {/* <DashboardTabs /> */}
      <Invoice/>
    </div>
  );
};

export default Dashboard;

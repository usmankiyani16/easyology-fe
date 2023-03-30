import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { loadingState } from "../../../store/loading-store";

const AdminDashboard = () => {
  const setLoading = useSetRecoilState(loadingState);

  // use effect to change loading state
  useEffect(() => {
    setLoading(false);
  }, []);
  return <div>AdminDashboard</div>;
};

export default AdminDashboard;

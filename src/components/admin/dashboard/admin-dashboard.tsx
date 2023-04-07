import React, { useEffect } from "react";
import { useAppDispatch } from "../../../store/store";
import { setLoading } from "../../../store/loader/loader-slice";

const AdminDashboard = () => {
  const dispatch = useAppDispatch()

  // use effect to change loading state
  // useEffect(() => {
  //   dispatch(setLoading(false))
  // }, []);
  return <div>AdminDashboard</div>;
};

export default AdminDashboard;

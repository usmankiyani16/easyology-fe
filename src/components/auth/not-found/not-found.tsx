import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/store";
import { useEffect } from "react";
import { setLoading } from "../../../store/loader/loader-slice";

const NotFound = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const dispatch = useAppDispatch()

  // use effect to change loading state
  // useEffect(() => {
  //   dispatch(setLoading(false));
  // }, []);
  return (
    <div className="flex flex-col items-center  h-screen">
      <h1 className="text-6xl font-bold mb-8">404</h1>
      <p className="text-lg mb-4">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Button type="primary" onClick={goBack}>
        Go back
      </Button>
    </div>
  );
};

export default NotFound;

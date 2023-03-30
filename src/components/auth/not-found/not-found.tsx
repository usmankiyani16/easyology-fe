import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

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

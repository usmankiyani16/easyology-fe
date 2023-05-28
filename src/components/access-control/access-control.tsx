
import "./access-control.scss";

import AccessControlCard from "./access-control-card/access-control-card";
import AccessControlHeader from "./access-control-header/access-control-header";
import { Pagination } from "antd";

const AccessControl = () => {
 
  return (
    <div className="_access-control-wrap">

      <div>
        <AccessControlHeader/>

      </div>

    
      <div className="_access-card mt-4">
        <AccessControlCard />
      </div>

      <Pagination
        //   onChange={handlePagination}
        className="flex justify-end"
        defaultCurrent={1}
        defaultPageSize={8}
        total={2}
        showSizeChanger={false}
      />

    </div>
  );
};

export default AccessControl;

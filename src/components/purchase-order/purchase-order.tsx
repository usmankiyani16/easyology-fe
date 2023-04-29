import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Loader from "../common/loader/loader";
// import { purchaseOrders } from "./mock-data/po-data";
import POCard from "./po-card/po-card";
import AddPO from "../../assets/icons/layout/AddPO.png";
import Viewmodal from "./po-view-modal/view-modal";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getPOS } from "../../store/po/po.slice";
import Spinner from "../common/spinner/spinner";
import { Pagination } from "antd";

const PurchaseOrder = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { purchaseOrders } = useAppSelector((state) => state.purchaseOrders);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPOS());
  }, []);

  const pageSize = 10;
  const total = purchaseOrders?.length ?? 0;
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const currentData = purchaseOrders?.slice(startIdx, endIdx);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {/* <Loader /> */}
      <div className="flex items-center justify-between mt-3">
        <h1 className="font-lato  mt-4 text-[2rem]">Purchase Order</h1>
        <NavLink to="/add-purchase-order">
          <div>
            <img src={AddPO} alt="Add PO logo" className="h-8" />
          </div>
        </NavLink>
      </div>
      <div className="_cards">
        {purchaseOrders?.length ? (
          <>
            <POCard purchaseOrders={currentData} />
          </>
        ) : (
          <Spinner />
        )}
      </div>

      <Pagination
        className="flex justify-end mt-4"
        defaultCurrent={1}
        current={currentPage}
        pageSize={pageSize}
        total={total}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default PurchaseOrder;

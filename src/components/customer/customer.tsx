import React, { useEffect, useState } from "react";
import "./customer.scss";
import addCustomerIcon from "../../assets/icons/dashboard/add-customer.png";
import { Button, Pagination } from "antd";

import CustomerCard from "./customer-card/customer-card";
import AddCustomer from "./add-customer/add-customer";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getCustomers } from "../../store/customers/customers.slice";

const Customer = () => {
  const { customers } = useAppSelector((state) => state.customers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCustomers());
  }, []);
  return (
    <div className="_customer-wrapper">
      <div className="flex items-center justify-between mt-3">
        <div>
          <h1 className="font-lato  mt-4 text-[2rem]">Customers</h1>
        </div>

        <div>
          {/* <img src={AddPO} alt="Add PO logo" className="h-8" /> */}
          <Button
            onClick={() => setIsModalOpen(true)}
            className="_bg-primary-color _white-color _border-primary-color _white-color _hover font-medium mt-4 flex justify-between items-center gap-4 cursor-pointer"
          >
            <img
              className="flex justify-start"
              src={addCustomerIcon}
              alt="addCustomerIcon"
            />

            <span>Add Customer</span>
          </Button>
        </div>
      </div>

      <div className="_cards">
        <CustomerCard />
      </div>

      <Pagination
        //   onChange={handlePagination}
        className="flex justify-end"
        defaultCurrent={1}
        defaultPageSize={8}
        total={2}
        showSizeChanger={false}
      />

      {isModalOpen && (
        <AddCustomer
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default Customer;

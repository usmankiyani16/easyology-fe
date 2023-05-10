import React, { useState } from "react";
import "./customer.scss";
import { Button, Pagination } from "antd";

import CustomerCard from "./customer-card/customer-card";
import AddCustomer from "./add-customer/add-customer";

const Customer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="_customer-wrapper">
      <div className="flex items-center justify-between mt-3">
        <div>
          <h1 className="font-lato  mt-4 text-[2rem]">Customers</h1>
        </div>

        <div>
          {/* <img src={AddPO} alt="Add PO logo" className="h-8" /> */}
          <Button
            className="_bg-primary-color _white-color _hover font-medium mt-4"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Add Customer
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

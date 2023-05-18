import React, { useEffect, useState } from "react";
import "./customers.scss";
import addCustomerIcon from "../../assets/icons/dashboard/add-customer.png";
import { Button, Input, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import CustomerCard from "./customers-card/customer-card";
import AddCustomer from "./add-customers/add-customer";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getCustomers } from "../../store/customers/customers.slice";
import { log } from "console";
import { REQUEST_STATUS } from "../../utils/constants";
import Spinner from "../common/spinner/spinner";

const Customer = () => {
  const { customers, status } = useAppSelector((state) => state.customers);
  const [isApiChange, setIsApiChange] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const searchCustomer = (event: any) => {
    let name = event.target.value?.trim();
    let payload: any = {};
    if (name) {
      payload.page = 1;
      payload.perPage = 8;
      payload.search = name;
      dispatch(getCustomers(payload));
    } else dispatch(getCustomers({}));
  };
  useEffect(() => {
    dispatch(getCustomers({}));
  }, [isApiChange]);
  const handlePagination = (value: any) => {
    console.log("value", value);
  };
  return (
    <div className="_customer-wrapper">
      <div className="flex xs:flex-col sm:flex-row items-center justify-between mt-3">
        <div className="flex items-center gap-4 ">
          <h1 className="font-lato  text-[2rem]">Customers</h1>
          <div>
            <Input
              className="w-44 h-8"
              prefix={<SearchOutlined />}
              placeholder="Search Customer"
              onChange={searchCustomer}
            />
          </div>
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

      {!customers?.customers?.length && status === REQUEST_STATUS.PENDING ? (
        <Spinner />
      ) : (
        <>
          <div className="_cards">
            <CustomerCard customers={customers?.customers} />
          </div>
          {customers?.customers?.length ? (
            <div>
              <Pagination
                onChange={handlePagination}
                className="flex justify-end"
                defaultCurrent={customers?.pagination?.page}
                defaultPageSize={8}
                total={customers?.pagination?.totalCount}
                showSizeChanger={false}
              />
            </div>
          ) : (
            ""
          )}
        </>
      )}
      {isModalOpen && (
        <AddCustomer
          setIsApiChange={setIsApiChange}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default Customer;

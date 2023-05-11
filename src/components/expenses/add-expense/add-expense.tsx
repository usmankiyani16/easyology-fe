import React from "react";
import { useNavigate } from "react-router-dom";
import { backButtonIcon } from "../../../assets/icons";
import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import AddExpenseForm from "./add-expense-form";

const AddExpenses = () => {
  const navigate = useNavigate();
  const searchProduct = (value: any) => {
    console.log(value);
  };
  return (
    <div>
      <div>
        <img
          onClick={() => navigate(-1)}
          className="h-[25px] w-[25px] cursor-pointer"
          src={backButtonIcon}
          alt="back"
        />
      </div>
      <div >
        <div className="flex justify-between xs:flex-col items-center sm:flex-row">
          {" "}
          <h1 className="font-lato text-[2rem]">Expenses</h1>
          <div>
            <Input
              className="w-44 h-8 mt-2"
              prefix={<SearchOutlined />}
              placeholder="Search Customer"
              onChange={(event) => searchProduct(event.target.value)}
            />
          </div>
        </div>
     

      <div>
        <AddExpenseForm />
      </div>
      </div>
    </div>
  );
};

export default AddExpenses;

import React from "react";
import { useNavigate } from "react-router-dom";
import { backButtonIcon } from "../../../assets/icons";
import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import AddExpenseForm from "./add-expense-form";

const AddExpenses = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex items-center gap-2">
        <img
          onClick={() => navigate(-1)}
          className="h-[25px] w-[25px] cursor-pointer"
          src={backButtonIcon}
          alt="back"
        />
        <h1 className="font-lato text-[2rem]">Expenses</h1>
      </div>
      <div>
        <div>
          <AddExpenseForm />
        </div>
      </div>
    </div>
  );
};

export default AddExpenses;

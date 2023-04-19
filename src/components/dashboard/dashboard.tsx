import { AutoComplete, Button, Input } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import "./dashboard.scss";
import { addCustomereIcon, scannerIcon } from "../../assets/icons";
import ItemCard from "./item-card/item-card";
import { useState } from "react";

const Dashboard = () => {
  const [selectCustomer, setSelectCustomer] = useState<any>({})
  const [selectProduct, setSelectProduct] = useState()

  const customers = [
    { _id: '144444', value: 'customer 1' },
    { _id: '13232', value: 'customer 2' },
    { _id: '15555', value: 'customer 3' },
  ];
  const products = [
    { _id: '112222', value: 'product 1' },
    { _id: '122222', value: 'product 2' },
    { _id: '133333', value: 'product 3' },
  ];
  const handleCustomerSelect = (option: any) => {
    setSelectCustomer(option)
  }

  const handleProductSelect = (option: any) => {
    setSelectProduct(option)
  }
  return (
    <div className="_dashboard">
      <div className="flex gap-3 justify-between items-center">
        <h1>Customer name: <span className="font-semibold">{selectCustomer?.value ?? ""}</span></h1>
        <div className="flex items-center gap-3">
          <AutoComplete
            onSelect={(value, option) => handleCustomerSelect(option)}
            options={customers}
            filterOption={(inputValue, option) =>
              option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
          >
            <Input
              className="h-8"
              prefix={<SearchOutlined />}
              placeholder="Search customer"
            />
          </AutoComplete>
          <AutoComplete
            onSelect={(value, option) => handleProductSelect(option)}
            options={products}
            filterOption={(inputValue, option) =>
              option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
          >
            <Input
              className="h-8"
              prefix={<SearchOutlined />}
              placeholder="Search products"
            />
          </AutoComplete>
          <img src={scannerIcon} alt="scanner" />
        </div>
        <div className="flex items-center gap-3">
          <img className="cursor-pointer" src={addCustomereIcon} alt="scanner" />
          <Button style={{ padding: '0px 34px' }} className="bg-white font-semibold h-8">On hold<span className="_primary-color ml-2">{`(2)`}</span></Button>
        </div>

      </div>
      <div className="mt-7">
        <ItemCard />
      </div>
    </div>
  );
};

export default Dashboard;

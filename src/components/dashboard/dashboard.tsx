import { AutoComplete, Button, Input } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import "./dashboard.scss";
import { addCustomereIcon, scannerIcon } from "../../assets/icons";
import ItemCard from "./item-card/item-card";

const Dashboard = () => {
  const options = [
    { value: 'Burns Bay Road' },
    { value: 'Downing Street' },
    { value: 'Wall Street' },
  ];
  const productsOptions = [
    { value: 'Burns Bay Road' },
    { value: 'Downing Street' },
    { value: 'Wall Street' },
  ];
  return (
    <div className="_dashboard">
      <div className="flex gap-3 justify-between items-center">
        <h1 className="font-semibold text-xl">Invoice #45454</h1>
        <div className="flex items-center gap-3">
          <AutoComplete
            options={options}
            filterOption={(inputValue, option) =>
              option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
          >
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search customer"
            />
          </AutoComplete>
          <AutoComplete
            style={{ width: 200 }}
            options={productsOptions}
            filterOption={(inputValue, option) =>
              option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
          >
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search products"
            />
          </AutoComplete>
          <img src={scannerIcon} alt="scanner" />
        </div>
        <div className="flex items-center gap-3">
          <img className="cursor-pointer" src={addCustomereIcon} alt="scanner" />
          <Button className="bg-white font-semibold">On hold<span className="_primary-color ml-2">{`(2)`}</span></Button>
        </div>

      </div>
      <div>
        <ItemCard />
      </div>
    </div>
  );
};

export default Dashboard;

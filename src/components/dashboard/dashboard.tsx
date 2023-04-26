import { AutoComplete, Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./dashboard.scss";
import { addCustomereIcon, scannerIcon } from "../../assets/icons";
import ItemCard from "./item-card/item-card";
import { useState } from "react";
import { laptopImg } from "../../assets/images";
import Operations from "./operations/operations";

const Dashboard = () => {
  const [selectCustomer, setSelectCustomer] = useState<any>({});
  const [selectProduct, setSelectProduct] = useState();
  const [products, setProducts] = useState<any>([
    {
      _id: "0001",
      name: "Laptop Lenovo Series 4",
      image: laptopImg,
      qty: 1,
      maxQty: 23,
      price: 33,
    },
  ]);

  const totalPrice = products.reduce((acc:any, product:any) => {
    return acc + (product.qty * product.price);
  }, 0);


  const customerOptions = [
    { _id: "144444", value: "customer 1" },
    { _id: "13232", value: "customer 2" },
    { _id: "15555", value: "customer 3" },
  ];
  const productOptions = [
    {
      _id: "112222",
      value: "product 1",
      image: laptopImg,
      qty: 1,
      maxQty: 12,
      price: 24,
    },
    {
      _id: "122222",
      value: "product 2",
      image: laptopImg,
      qty: 1,
      maxQty: 23,
      price: 23,
    },
    {
      _id: "133333",
      value: "product 3",
      image: laptopImg,
      qty: 1,
      maxQty: 32,
      price: 34,
    },
  ];
  
  const handleCustomerSelect = (option: any) => {
    console.log("customer", option);
    setSelectCustomer(option);
  };

  const handleProductSelect = (product: any) => {
    console.log("product", product);
    product.name = product?.value;
    delete product.value;
    setProducts((prevProducts: any) => [...prevProducts, product]);
    setSelectProduct(product);
  };
  return (
    <div className="_dashboard">
      <div className="flex gap-3 justify-between items-center">
        <h1>
          Customer name:{" "}
          <span className="font-semibold">{selectCustomer?.value ?? ""}</span>
        </h1>
        <div className="flex items-center gap-3">
          <AutoComplete
            onSelect={(value, option) => handleCustomerSelect(option)}
            options={customerOptions}
            filterOption={(inputValue, option) =>
              option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
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
            options={productOptions}
            filterOption={(inputValue, option) =>
              option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
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
          <img
            className="cursor-pointer"
            src={addCustomereIcon}
            alt="scanner"
          />
          <Button className="bg-white font-semibold h-8 flex items-center justify-center">
            On hold<span className="_primary-color ml-2">({`0`})</span>
          </Button>
        </div>
      </div>
      <div className="mt-7">
        <ItemCard products={products} setProducts={setProducts} />
      </div>
      <Operations totalPrice={totalPrice} />
    </div>
  );
};

export default Dashboard;

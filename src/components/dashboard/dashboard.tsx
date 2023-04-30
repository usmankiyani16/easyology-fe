import { AutoComplete, Button, Form, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./dashboard.scss";
import { addCustomereIcon, scannerIcon } from "../../assets/icons";
import ItemCard from "./item-card/item-card";
import { useState } from "react";
import { laptopImg, noImg } from "../../assets/images";
import Operations from "./operations/operations";
import OnHoldModal from "./on-hold/on-hold";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getProducts } from "../../store/products/products-slice";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [selectCustomer, setSelectCustomer] = useState<any>({});
  const [selectProduct, setSelectProduct] = useState();
  const { products, status } = useAppSelector((state) => state.products);
  const [selectedProducts, setProducts] = useState<any>([
    {
      _id: "0001",
      name: "Laptop Lenovo Series 4",
      image: laptopImg,
      qty: 1,
      maxQty: 23,
      price: 33,
    },
  ]);

  const totalPrice = selectedProducts?.reduce((acc: any, product: any) => {
    return acc + product.qty * product.price;
  }, 0);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const customerOptions = [
    { _id: "144444", value: "customer 1" },
    { _id: "13232", value: "customer 2" },
    { _id: "15555", value: "customer 3" },
  ];
  const temp = products?.products?.slice(0, 3).map((prod: any) => ({
    _id: prod?._id,
    value: prod?.name,
    image: prod?.image ?? noImg,
    qty: 1,
    maxQty: prod?.variants?.stock?.totalQuantity,
    price: prod?.variants?.amount,
    options: prod?.variants?.options,
  }));
  console.log(products, 'aliiiii')
  console.log(temp , 'bulli')

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
  console.log("temp", productOptions, temp);
  const handleCustomerSelect = (option: any) => {
    setSelectCustomer(option);
    form.resetFields();
  };

  const handleProductSelect = (product: any) => {
    product.name = product?.value;
    delete product.value;
    setProducts((prevProducts: any) => [...prevProducts, product]);
    setSelectProduct(product);
    form.resetFields();
  };

  const handleChangeProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
    let queryParam: any = {
      name: event.target.value,
    };
    console.log("value", queryParam);
    dispatch(getProducts(queryParam));
  };

  return (
    <div className="_dashboard">
      <div className="flex gap-3 justify-between items-center">
        <div>
          <h1>
            Customer name:{" "}
            <span className="font-semibold">{selectCustomer?.value ?? ""}</span>
          </h1>
          <h1>
            Phone:{" "}
            <span className="font-semibold">{selectCustomer?.value ?? ""}</span>
          </h1>
          <h1>
            <span className="_primary-color">Customer Type: </span>
            <span className="font-semibold">{selectCustomer?.value ?? ""}</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Form form={form}>
            <AutoComplete
              onSelect={(value, option) => handleCustomerSelect(option)}
              options={customerOptions}
              filterOption={(inputValue, option) =>
                option!.value
                  .toUpperCase()
                  .indexOf(inputValue.toUpperCase()) !== -1
              }
            >
              <Input
                className="h-8"
                prefix={<SearchOutlined />}
                placeholder="Search customer"
                name="customer"
              />
            </AutoComplete>
            <AutoComplete
              onSelect={(value, option) => handleProductSelect(option)}
              options={productOptions}
              filterOption={(inputValue, option) =>
                option!.value
                  .toUpperCase()
                  .indexOf(inputValue.toUpperCase()) !== -1
              }
            >
              <Input
                onChange={handleChangeProduct}
                className="h-8"
                prefix={<SearchOutlined />}
                placeholder="Search products"
                name="product"
              />
            </AutoComplete>
          </Form>
          <img src={scannerIcon} alt="scanner" />
        </div>
        <div className="flex items-center gap-3">
          <img
            className="cursor-pointer"
            src={addCustomereIcon}
            alt="scanner"
          />
          <Button
            onClick={showModal}
            className="bg-white font-semibold h-8 flex items-center justify-center"
          >
            On hold<span className="_primary-color ml-2">({`0`})</span>
          </Button>
        </div>
      </div>
      <div className="mt-7">
        <ItemCard products={selectedProducts} setProducts={setProducts} />
      </div>
      <Operations totalPrice={totalPrice} />
      <OnHoldModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default Dashboard;

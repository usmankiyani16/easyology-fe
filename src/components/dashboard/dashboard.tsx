import { AutoComplete, Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./dashboard.scss";
import { addCustomereIcon, scannerIcon } from "../../assets/icons";
import ItemCard from "./item-card/item-card";
import { useEffect, useState } from "react";
import { noImg } from "../../assets/images";
import Operations from "./operations/operations";
import OnHoldModal from "./on-hold/on-hold";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  addSelectedProducts,
  getProducts,
} from "../../store/products/products-slice";
import {
  getHoldInvoices,
  getInvoiceNumber,
} from "../../store/order/order-slice";
import Loader from "../common/loader/loader";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { invoiceNumber } = useAppSelector((state) => state.order);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectCustomer, setSelectCustomer] = useState<any>({});
  const [selectProduct, setSelectProduct] = useState<any>(null);
  const { products, selectedProducts } = useAppSelector(
    (state) => state.products
  );
  const totalPrice = selectedProducts?.reduce((acc: any, product: any) => {
    return acc + product.qty * product.price;
  }, 0);

  let queryParamInvoices = "";
  useEffect(() => {
    let queryParamProducts = {
      nullProduct: "true",
    };
    dispatch(getInvoiceNumber());
    dispatch(getProducts(queryParamProducts));
    dispatch(getHoldInvoices(queryParamInvoices));
  }, []);
  
  useEffect(() => {
    dispatch(getHoldInvoices(queryParamInvoices));
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const customerOptions = [
    {
      _id: "144444",
      value: "customer 1",
      mob: "0236353535",
      type: "whole seller",
    },
    {
      _id: "13232",
      value: "customer 2",
      mob: "0236353535",
      type: "whole seller",
    },
    {
      _id: "15555",
      value: "customer 3",
      mob: "0236353535",
      type: "whole seller",
    },
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
  const productOptions = [
    {
      _id: "112222",
      value: "product 1",
      image: "",
      qty: 1,
      maxQty: 12,
      price: 24,
    },
    {
      _id: "122222",
      value: "product 2",
      image: "",
      qty: 1,
      maxQty: 23,
      price: 23,
    },
    {
      _id: "133333",
      value: "product 3",
      image: "",
      qty: 1,
      maxQty: 32,
      price: 34,
    },
  ];
  const handleCustomerSelect = (option: any) => {
    setSelectCustomer(option);
  };

  const handleProductSelect = (product: any) => {
    product.name = product?.value;
    delete product.value;
    dispatch(addSelectedProducts(product));
    setSelectProduct(product);
  };

  const handleChangeProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
    let queryParam: any = {
      name: event.target.value,
    };
    dispatch(getProducts(queryParam));
  };

  return (
    <div className="_dashboard">
      <div className="flex gap-3 justify-between ">
        <div>
          <h1 className="font-bold text-lg">Invoice # {invoiceNumber ?? ""}</h1>
          <h1>
            Customer name:{" "}
            <span className="font-semibold">{selectCustomer?.value ?? ""}</span>
          </h1>
          <h1>
            Phone:{" "}
            <span className="font-semibold">{selectCustomer?.mob ?? ""}</span>
          </h1>
          <h1>
            <span className="_primary-color font-semibold">
              Customer Type:{" "}
            </span>
            <span className="font-semibold">{selectCustomer?.type ?? ""}</span>
          </h1>
        </div>
        <div className="flex items-center gap-3 self-start">
          <AutoComplete
            onSelect={(value, option) => handleCustomerSelect(option)}
            options={customerOptions}
            value={""}
            filterOption={(inputValue, option) =>
              option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
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
            value={""}
            filterOption={(inputValue, option) =>
              option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
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
          <img src={scannerIcon} alt="scanner" />
        </div>
        <div className="flex items-center gap-3 self-start">
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
        <ItemCard />
      </div>
      <Operations totalPrice={totalPrice} />
      <OnHoldModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default Dashboard;

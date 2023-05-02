import { AutoComplete, Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./dashboard.scss";
import { addCustomereIcon, scannerIcon } from "../../assets/icons";
import ItemCard from "./item-card/item-card";
import { useEffect, useState } from "react";
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
import VoidInvoice from "./operations/void-invoice/void-invoice";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { invoiceNumber } = useAppSelector((state) => state.order);
  const { holdInvoices } = useAppSelector((state) => state.order);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectCustomer, setSelectCustomer] = useState<any>({});
  const [selectCustomerValue, setSelectCustomerValue] = useState<any>(null);
  const { products, selectedProducts } = useAppSelector(
    (state) => state.products
  );
  const totalPrice = selectedProducts?.reduce((acc: any, product: any) => {
    return acc + product?.quantity * product?.variants?.amount;
  }, 0);

  const searchProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
    let queryParam: any = {};
    let name = event.target.value?.trim();
    setSelectCustomerValue(event.target.value);
    if (name) {
      queryParam = {
        name,
        nullProduct: "true",
        perPage: 3,
      };
      dispatch(getProducts(queryParam));
    } else {
      dispatch(getProducts(queryParam));
    }
  };
  let queryParamInvoices = "";
  useEffect(() => {
    let queryParamProducts = {
      nullProduct: "true",
      perPage: 3,
    };
    dispatch(getInvoiceNumber());
    dispatch(getProducts(queryParamProducts));
    dispatch(getHoldInvoices(queryParamInvoices));
  }, []);

  useEffect(() => {
    dispatch(getHoldInvoices(queryParamInvoices));
  }, [invoiceNumber]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const customerOptions = [
    {
      _id: "9dc55d0012d14689b8a00940",
      value: "customer 1",
      mob: "0236353535",
      type: "whole seller",
    },
    {
      _id: "9dc55d0012d14689b8a00940",
      value: "customer 2",
      mob: "0236353535",
      type: "whole seller",
    },
    {
      _id: "9dc55d0012d14689b8a00940",
      value: "customer 3",
      mob: "0236353535",
      type: "whole seller",
    },
  ];
  let productOptions = products?.products?.slice(0, 3);
  const filteredProductOptions = productOptions?.filter(
    (option: any) =>
      !selectedProducts?.some(
        (selected: any) => selected?.variants?._id === option?.variants?._id
      )
  );
  console.log("selectedProducts", selectedProducts);
  const handleCustomerSelect = (option: any) => {
    setSelectCustomer(option);
  };

  const handleProductSelect = (product: any) => {
    product.name = product?.value;
    delete product.value;
    dispatch(addSelectedProducts(product));
    setSelectCustomerValue(null);
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
            options={filteredProductOptions?.map((option: any) => ({
              ...option,
              quantity: 1,
              value: option?.variants?.options?.color
                ? option?.name + "(" + option?.variants?.options?.color + ")"
                : option?.name,
            }))}
            value={selectCustomerValue}
          >
            <Input
              // value={selectCustomerValue}
              onChange={searchProduct}
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
            On hold
            <span className="_primary-color ml-2">
              ({holdInvoices?.pagination?.totalCount})
            </span>
          </Button>
        </div>
      </div>
      <div className="mt-7">
        <ItemCard />
      </div>
      <Operations
        totalPrice={totalPrice}
        selectCustomer={selectCustomer}
        setSelectCustomer={setSelectCustomer}
      />
      <OnHoldModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      
    </div>
  );
};

export default Dashboard;

import { AutoComplete, Button, Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./dashboard-order.scss";
import { addCustomereIcon, scannerIcon } from "../../../assets/icons";
import ItemCard from "./item-card/item-card";
import { useEffect, useState } from "react";
import Operations from "./operations/operations";
import OnHoldModal from "./on-hold/on-hold";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  addSelectedProducts,
  getProducts,
} from "../../../store/products/products-slice";
import {
  getHoldInvoices,
  getInvoiceNumber,
} from "../../../store/order/order-slice";
import OrderStatus from "./order-status/order-status";

const DashboardOrder: React.FC<any> = ({
  showOrderStatus,
  showDashboardHeader,
  showFinalizeButton
}) => {
  const dispatch = useAppDispatch();
  const { invoiceNumber } = useAppSelector((state) => state.order);
  const { holdInvoices } = useAppSelector((state) => state.order);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const [orderCategory, setOrderCategory] = useState<string>("store");

  const [selectCustomer, setSelectCustomer] = useState<any>({});
  const [selectCustomerValue, setSelectCustomerValue] = useState<any>(null);
  const [formData, setFormData] = useState({});
  const [selectedOption, setSelectedOption] = useState();


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
      name: "customer 1",
      mob: "02363500365",
      type: "retailer",
    },
    {
      _id: "9dc55d0012d14689b8a00940",
      name: "customer 2",
      mob: "02363453933",
      type: "retailer",
    },
    {
      _id: "9dc55d0012d14689b8a00940",
      name: "retailer",
      mob: "0236373737",
      type: "wholeseller",
    },
  ];
  let productOptions = products?.products?.slice(0, 3);
  const filteredProductOptions = productOptions?.filter(
    (option: any) =>
      !selectedProducts?.some(
        (selected: any) => selected?.variants?._id === option?.variants?._id
      )
  );
  const handleCustomerSelect = (option: any) => {
    setSelectCustomer(option);
  };

  const handleProductSelect = (product: any) => {
    product.name = product?.value;
    delete product.value;
    dispatch(addSelectedProducts(product));
    setSelectCustomerValue(null);
  };

  // Handling data of Order Status

  const handleFormChange: any = (newFormData: any) => {
    setFormData(newFormData);
  };

  // Saving Data on Save Button

  const handleSave = () => {
    // Perform save operation with formData
    console.log(formData);
  };

  const handleSelect = (value: any) => {
    setSelectedOption(value);
  };
  return (
    <div className="_dashboard">
      <div className="flex gap-3 justify-between ">
        <div>
          <h1 className="font-bold text-lg">Invoice # {invoiceNumber ?? ""}</h1>

          {showDashboardHeader === true && (
            <div>
              <h1>
                Customer name:{" "}
                <span className="font-semibold capitalize">
                  {selectCustomer?.value ?? ""}
                </span>
              </h1>
              <h1>
                Phone:{" "}
                <span className="font-semibold">
                  {selectCustomer?.mob ?? ""}
                </span>
              </h1>
              <h1>
                <span className="_primary-color font-semibold">
                  Customer Type:{" "}
                </span>
                <span className="font-semibold capitalize">
                  {selectCustomer?.type ?? ""}
                </span>
              </h1>
            </div>
          )}
        </div>
        {showDashboardHeader === true && (
        <div className="flex items-center gap-3 self-start">
          <AutoComplete
            onSelect={(value, option) => handleCustomerSelect(option)}
            options={customerOptions?.map((customer: any) => ({
              ...customer,
              value: customer?.name,
            }))}
            value={""}
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
          )}

        {showOrderStatus && (
          <div>
            <Select
              className="_input_field"
              placeholder="Select Order type"
              onChange={handleSelect}
              style={{ width: "200px" }}
              //   prefix={SearchOutlined}
            >
              <Select.Option value="Order by phone">
                Order by phone
              </Select.Option>
              <Select.Option value="Order in store">
                Order in store
              </Select.Option>
            </Select>
          </div>
        )}

      {showDashboardHeader === true && (
        <div className="flex items-center gap-3 self-start">
          <Button
            disabled={holdInvoices?.pagination?.totalCount === 0}
            onClick={showModal}
            className="font-semibold h-8 flex items-center justify-center _primary-button"
          >
            On hold
            <span className=" ml-2 ">
              ({holdInvoices?.pagination?.totalCount})
            </span>
          </Button>
        </div>
      )}
      
      </div>

      <div className="mt-7">
        <ItemCard />
      </div>

      {showOrderStatus && (
        <>
          {selectedOption === "Order by phone" && (
            <div>
              <OrderStatus onChange={handleFormChange} />
            </div>
          )}
        </>
      )}

      <Operations
        totalPrice={totalPrice}
        selectCustomer={selectCustomer}
        setSelectCustomer={setSelectCustomer}
        onSave={handleSave}
        showOrderStatus={showOrderStatus}
        showFinalizeButton={showFinalizeButton}

      />

      <OnHoldModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default DashboardOrder;

import { AutoComplete, Button, Form, Input, Select } from "antd";
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
  addOrder,
  getHoldInvoices,
  getInvoiceNumber,
} from "../../../store/order/order-slice";
import OrderStatus from "./order-status/order-status";
import ViewOrdersCard from "../../orders/view-orders/view-order-card/card";
import orderDetails from "../../orders/mock-data/view-orders";
import { getCustomers } from "../../../store/customers/customers.slice";

const DashboardOrder: React.FC<any> = ({
  showOrderStatus,
  showDashboardHeader,
  showFinalizeButton,
  showOperations,
  showCards,
  data,
}) => {
  const dispatch = useAppDispatch();


  const [form] = Form.useForm();


  const { invoiceNumber } = useAppSelector((state) => state.order);
  const { holdInvoices } = useAppSelector((state) => state.order);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [productItems, setProductItems] = useState<any>(null);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  // const [orderCategory, setOrderCategory] = useState<string>("store");

  const [selectCustomer, setSelectCustomer] = useState<any>({});
  const [selectCustomerValue, setSelectCustomerValue] = useState<any>(null);
  const [formData, setFormData] = useState<any>(null);
  const [selectedOption, setSelectedOption] = useState();

  const { products, selectedProducts } = useAppSelector(
    (state) => state.products

  );
  const { customers } = useAppSelector((state) => state.customers)




  const { data: localStorageData }: any = JSON.parse(localStorage.getItem("user") || "{}");





  const totalPrice = selectedProducts?.reduce((acc: any, product: any) => {
    return acc + product?.quantity * product?.variants?.purchaseAmount;
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

  const searchCustomer = (event: React.ChangeEvent<HTMLInputElement>) => {
    let queryParam: any = {};
    let name = event.target.value?.trim();
    setSelectCustomerValue(event.target.value);
    if (name) {
      queryParam = {
        name,
        nullProduct: "true",
        perPage: 3,
      };
      dispatch(getCustomers(queryParam));
    } else {
      dispatch(getCustomers(queryParam));
    }
  };
  let queryParamInvoices = "";
  useEffect(() => {
    let queryParamCustomers = {
      nullProduct: "true",
      perPage: 3,
    };

    dispatch(getCustomers(queryParamCustomers));

  }, []);


  const showModal = () => {
    setIsModalOpen(true);
  };

  /*  const customerOptions = [
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
   ]; */
  let productOptions = products?.products?.slice(0, 3);
  const filteredProductOptions = productOptions?.filter(
    (option: any) =>
      !selectedProducts?.some(
        (selected: any) => selected?.variants?._id === option?.variants?._id
      )
  );
  let customerOptions = customers?.customers?.slice(0, 3);

  const handleCustomerSelect = (option: any) => {
    setSelectCustomer(option);
  };

  const handleProductSelect = (product: any) => {
    product.name = product?.value;
    delete product.value;
    dispatch(addSelectedProducts(product));
    setSelectCustomerValue(null);
  };


  // =============================== Handling data of Order Status ===============================

  const handleOrderForm: any = (newFormData: any) => {
    setFormData(newFormData);
    handleSaveOrderData(newFormData);
  };



  // =============================== Saving Data on Save Button ===============================

  const handleSaveOrderData = (newFormData?: any) => {
    // Perform save operation with formData

    const newProductItems = productItems.map((obj: any) => ({
      productId: obj._id,
      variantId: obj.variants._id,
      stockId: obj.variants.stock._id,
      quantity: obj.quantity
    }));


    const postOrderPayload = {
      storeId: localStorageData?.storeId,
      userId: localStorageData?._id,
      customerId: selectCustomer?._id,
      orderCategory: "store",
      orderStatus: newFormData?.customerType,
      ...(newFormData?.customerType === "Pickup From Store" && { timeSlot: newFormData?.time }),
      ...(newFormData?.customerType !== "Pickup From Store" && {
        shippingDetails: {
          address: newFormData?.address,
          ...(newFormData?.city && { city: newFormData?.city }),
          ...(newFormData?.state && { state: newFormData?.state }),
          ...(newFormData?.zipCode && { zipCode: newFormData?.zipCode }),
        },
        paymentStatus: "Unpaid",
        paymentDetails,
        products: newProductItems,

      })
    }


    console.log("order payload in dashboard  =========>", postOrderPayload);

    dispatch(addOrder(postOrderPayload));


  };

  const handleSelect = (value: any) => {
    setSelectedOption(value);
  };





  return (
    <div className="_dashboard">
      <div className="flex gap-3 justify-between ">
        <div>
          <h1 className="font-bold text-lg">Invoice # {invoiceNumber ?? ""}</h1>
        </div>

        {showDashboardHeader === true && (
          <div className="flex items-center gap-3 self-start">
            <AutoComplete
              onSelect={(value, option) => handleCustomerSelect(option)}
              options={customerOptions?.map((customer: any) => ({
                ...customer,
                value: customer?.firstName + ' ' + customer?.lastName,
              }))}
              value={""}
            >
              <Input
                className="h-8"
                prefix={<SearchOutlined />}
                placeholder="Search customer"
                name="customer"
                onChange={searchCustomer}
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

      {/* {showOrderStatus && ( */}

      {showDashboardHeader === true && (
        <div className="mt-4">
          <div className="flex gap-8">
            <h1>
              Customer name:{" "}
              <span className="font-semibold capitalize">
                {selectCustomer?.value ?? ""}
              </span>
            </h1>
            {showOrderStatus && (
              <h1>
                Order Type:{" "}
                <span className="font-semibold capitalize">
                  {selectedOption ?? ""}
                </span>
              </h1>
            )}
          </div>

          <h1>
            Phone:{" "}
            <span className="font-semibold">{selectCustomer?.phoneNumber ?? ""}</span>
          </h1>
          <h1>
            <span className="_primary-color font-semibold">
              Customer Type:{" "}
            </span>
            <span className="font-semibold capitalize">
              {selectCustomer?.role ?? ""}
            </span>
          </h1>
        </div>
      )}

      {!showCards && (
        <div className="mt-7">
          <ItemCard productItems={(items: any) => setProductItems(items)} />
        </div>
      )}

      {showCards && (
        <div className="mt-7">
          <ViewOrdersCard orderDetails={orderDetails} showScroll={true} data={data} />
        </div>
      )}

      {showOrderStatus && (
        <>
          {selectedOption && selectedProducts?.length ? (
            <div>
              <OrderStatus handleOrderForm={handleOrderForm} form={form} />
            </div>
          ) : (
            ""
          )}
        </>
      )}

      <Operations
        totalPrice={totalPrice}
        selectCustomer={selectCustomer}
        setSelectCustomer={setSelectCustomer}
        onSave={handleSaveOrderData}
        showOrderStatus={showOrderStatus}
        showFinalizeButton={showFinalizeButton}
        data={data}
        form={form}
        handlePaymentDetails={(data: any) => setPaymentDetails(data)}
      />

      <OnHoldModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default DashboardOrder;

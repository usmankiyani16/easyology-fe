import { Col, Input, InputNumber, Row } from "antd";
import "./customers-detail.scss";


interface customersDetail{
  customerData: any
}


const CustomersDetail: React.FC<customersDetail> = ({customerData}) => {
  return (
    <div className="_customer-details-wrap">
      <div className="flex flex-col gap-4 ml-1 mt-8">
        <div className="w-[450px]   flex justify-between xs:flex-col sm:flex-row">
          <label className="xs:ml-2 sm:ml-0">Customer Name</label>

          <Input
            className="mx-2 w-64 h-[40px] _white-background"
            min={1}
            type="string"
            // disabled
            value={`${customerData?.firstName} ${customerData?.lastName} `}

    
          />
        </div>

        <div className="w-[450px]   flex justify-between xs:flex-col sm:flex-row">
          <label className="xs:ml-2 sm:ml-0">Store Name</label>

          <Input
            className="mx-2 w-64 h-[40px]  _white-background"
            min={1}
            type="string"
            // disabled
            value={customerData?.storeName}

            // max={item?.variants?.stock?.totalQuantity}
            // value={item?.quantity}
            // onChange={(value) => handleChange(index, value)}
          />
        </div>

        <div className="w-[450px]  flex justify-between xs:flex-col sm:flex-row">
          <label className="xs:ml-2 sm:ml-0">Phone Number</label>

          <Input
            className="mx-2 w-64 h-[35px] _white-background"
            min={1}
            type="string"
            // disabled
            value={customerData?.phoneNumber}

            // max={item?.variants?.stock?.totalQuantity}
            // value={item?.quantity}
            // onChange={(value) => handleChange(index, value)}
          />
        </div>

        <div className="w-[450px] flex justify-between xs:flex-col sm:flex-row">
          <label className="xs:ml-2 sm:ml-0">Outstanding Balance</label>

          <Input
            className="mx-2 w-64 h-[40px] _white-background"
            min={1}
            type="string"
            // disabled
            prefix="$"
            value={customerData?.totalRemainingBalance}

            // max={item?.variants?.stock?.totalQuantity}
            // value={item?.quantity}
            // onChange={(value) => handleChange(index, value)}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomersDetail;

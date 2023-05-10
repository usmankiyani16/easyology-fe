import { Col, Input, InputNumber, Row } from "antd";
import "./customers-detail.scss";

const CustomersDetail = () => {
  return (
    <div className="_customer-details-wrap">
      <div className="flex flex-col gap-8 ml-1 mt-8">
        <div className="w-[400px]  flex justify-between xs:flex-col sm:flex-row">
          <label className="xs:ml-2 sm:ml-0">Customer Name</label>

          <Input
            className="mx-2 w-48 h-[30px] font-semibold _white-background"
            min={1}
            type="string"
            disabled
            value="Ali Raza"

            // max={item?.variants?.stock?.totalQuantity}
            // value={item?.quantity}
            // onChange={(value) => handleChange(index, value)}
          />
        </div>

        <div className="w-[400px]  flex justify-between xs:flex-col sm:flex-row">
          <label className="xs:ml-2 sm:ml-0">Store Name</label>

          <Input
            className="mx-2 w-48 h-[30px] font-semibold _white-background"
            min={1}
            type="string"
            disabled
            value="Mart Store"

            // max={item?.variants?.stock?.totalQuantity}
            // value={item?.quantity}
            // onChange={(value) => handleChange(index, value)}
          />
        </div>

        <div className="w-[400px]  flex justify-between xs:flex-col sm:flex-row">
          <label className="xs:ml-2 sm:ml-0">Phone Number</label>

          <Input
            className="mx-2 w-48 h-[30px] font-semibold _white-background"
            min={1}
            type="string"
            disabled
            value="+92347595821"

            // max={item?.variants?.stock?.totalQuantity}
            // value={item?.quantity}
            // onChange={(value) => handleChange(index, value)}
          />
        </div>

        <div className="w-[400px]  flex justify-between xs:flex-col sm:flex-row">
          <label className="xs:ml-2 sm:ml-0">Outstanding Balance</label>

          <Input
            className="mx-2 w-48 h-[30px] font-semibold _white-background"
            min={1}
            type="string"
            disabled
            // prefix="$"
            value="$1499.00"

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

import cart from "../../../../assets/images/dashboard/Purchase-online.png";
import { Button, Card, InputNumber, Pagination } from "antd";

interface ViewOrders {
  orderDetails: any;
  showScroll: any;
  data: any;
}
const ViewOrdersCard: React.FC<ViewOrders> = ({
  orderDetails,
  showScroll,
  data,
}) => {
  return (
    <div>
      <div
        className={`${
          showScroll && "h-[250px] overflow-auto _custom-scrollbar"
        }`}
      >
        <div className="w-full flex justify-between">
          <label className="text-xl font-semibold  w-2/4"></label>
          <label className="text-xl font-semibold flex justify-center w-1/4">
            Qty
          </label>
          <label className="text-xl font-semibold flex  w-1/4 justify-center pr-2">
            Price
          </label>
          <label className="text-xl font-semibold flex  w-1/4 _primary-color">
            Total
          </label>
        </div>
        <div className="">
          {data?.products?.map((product: any, index: number) => (
            <div className="p-2 _bg-white-color rounded w-full my-2 flex justify-between shadow-md">
              <div className=" w-2/4">
                <div className="flex flex-col">
                  {/* <p className="_grey-color">{item?._id}</p> */}

                  <span className="ml-2">
                    Product Seriol No:{" "}
                    <span className="_primary-color">{product?.productId}</span>
                  </span>
                  <div className="flex items-center gap-3 ">
                    <img
                      className="w-20 h-16 rounded object-cover	"
                      // src={item?.image ? imageBaseUrl + item?.image : noImg}
                      src={cart}
                      alt="img"
                    />
                    <h1 className="font-semibold text-sm">{product?.name}</h1>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-1/4  justify-center items-center mt-2 ">
                <div className="_grey-color text-center">
                  x{product?.quantity}
                </div>
              </div>
              <div className="_price flex flex-col w-1/4 justify-center items-center mt-2  ">
                <span className="">$ {product?.purchaseAmount}</span>
              </div>
              <div className=" flex justify-between items-center w-1/4 mt-2">
                <div>
                  {/* <p className="_grey-color">$ 103.00</p> */}
                  <span className=" font-semibold _primary-color">
                    $ {data?.totalAmount}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewOrdersCard;

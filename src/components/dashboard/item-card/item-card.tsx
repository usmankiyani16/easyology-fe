import React, { Dispatch, SetStateAction, useState } from "react";
import "./item-card.scss";
import { DeleteFilled } from "@ant-design/icons";
import { Button, InputNumber } from "antd";
import { deleteIcon } from "../../../assets/images";
interface ItemCardProps {
  products: any[];
  setProducts: Dispatch<SetStateAction<any[]>>;
}
const ItemCard: React.FC<ItemCardProps> = ({ products, setProducts }) => {
  const handleDelete = (productId: string) => {
    const updatedProducts = products.filter(
      (product: { _id: string }) => product._id !== productId
    );
    setProducts(updatedProducts);
  };

  // const [number, setNumber] = useState<number>(1);

  const handleChange = (index: number, value: any) => {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts[index] = {
        ...updatedProducts[index],
        qty: value,
      };
      return updatedProducts;
    });
  };

  const handleIncrement = (index: number) => {
    if (products[index]?.qty < products[index].maxQty) {
      setProducts((prevProducts) => {
        const updatedProducts = [...prevProducts];
        updatedProducts[index] = {
          ...updatedProducts[index],
          qty: updatedProducts[index].qty + 1,
        };
        return updatedProducts;
      });
    }
  };
  const handleDecrement = (index: number) => {
    if (products[index]?.qty > 1) {
      setProducts((prevProducts) => {
        const updatedProducts = [...prevProducts];
        updatedProducts[index] = {
          ...updatedProducts[index],
          qty: updatedProducts[index].qty - 1,
        };
        return updatedProducts;
      });
    }
  };

  return (
    <div>
      <div className="w-full flex justify-between">
        <label className="text-xl font-semibold  w-2/4">Items</label>
        <label className="text-xl font-semibold flex justify-center w-1/4">
          Qty
        </label>
        <label className="text-xl font-semibold flex  w-1/4">Price</label>
      </div>
      <div className="h-[202px] overflow-auto _custom-scrollbar">
        {products?.map((item, index) => (
          <div
            key={index}
            className="w-full my-2 flex justify-between shadow-md hover:shadow-xl"
          >
            <div className=" w-2/4">
              <div className="flex flex-col">
                {/* <p className="_grey-color">{item?._id}</p> */}
                <div className="flex items-center gap-3 ">
                  <img
                    className="w-20 h-16 rounded "
                    src={item?.image}
                    alt="img"
                  />
                  <h1 className="font-semibold text-sm">{item?.name}</h1>
                </div>
              </div>
            </div>
            <div className=" flex justify-center items-center w-1/4">
              <Button
                className="flex items-center justify-center _primary-color rounded px-4 h-[30px] text-xl"
                onClick={() => handleDecrement(index)}
              >
                -
              </Button>
              <InputNumber
                className="mx-2 "
                min={1}
                type="number"
                max={item?.maxQty | 1}
                value={item?.qty}
                onChange={(value) => handleChange(index, value)}
              />
              <Button
                className="flex items-center justify-center _primary-color rounded px-4 h-[30px] text-lg"
                onClick={() => handleIncrement(index)}
              >
                +
              </Button>
              
            </div>
            <div className=" flex justify-between items-center w-1/4">
              <div>
                <p className="_grey-color">$ 103.00</p>
                <p className="shadow px-1 rounded">
                  $ {item?.qty * item?.price}
                </p>
              </div>
              <div
                className="flex items-center mr-3 cursor-pointer p-1"
                onClick={() => handleDelete(item?._id)}
              >
                <img src={deleteIcon} alt="delete" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemCard;

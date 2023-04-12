import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getProducts } from "../../store/products/products-slice";

const History = () => {
  const { products } = useAppSelector((state) => state.products)
  const dispatch = useAppDispatch()
  console.log('products', products)

  useEffect(() => {
    dispatch(getProducts())
  }, [])
  return (
    <div className="">
      {products?.map((data: any) => (
        <div key={data?._id} className="flex">
          <h1 className=""><span className="font-semibold">categories: </span>
            <span className="text-blue-600">{data?.name}</span>
          </h1>
          {data?.sub_category?.map((sub: any) => (
            <div key={sub?._id}>
              <br />
              <h1><span className="font-semibold">sub_categories: </span>
                <span className="text-green-600">{sub?.name}</span></h1>
              {sub?.products?.map((prod: any) => (
                <div key={prod?._id}>
                  <h1><span className="font-semibold">products: </span>
                    <span className="text-rose-600	">{prod?.name}</span></h1>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>);
};

export default History;

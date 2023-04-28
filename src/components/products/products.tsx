import { Input, Pagination, Select } from "antd";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  getCatogaries,
  getSubCatogaries,
} from "../../store/catogaries/catogaries-slice";
import { capitalize } from "../../utils/functions/functions";
import { SearchOutlined } from "@ant-design/icons";
import CardComponent from "../products/card/card";
import { mobileAccessoriesData } from "../products/tabs/tabs-mock-data";
import { getProducts } from "../../store/products/products-slice";
import { REQUEST_STATUS } from "../../utils/constants";
import Spinner from "../common/spinner/spinner";

const Products = () => {
  const dispatch = useAppDispatch();
  const { catogaries, subCategories } = useAppSelector(
    (state) => state.catogaries
  );
  const { products, status } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(getCatogaries());
    dispatch(getProducts());
  }, []);

  return (
    <div>
      <h1 className="font-semibold text-lg">Products</h1>
      <div className="flex justify-between mt-3">
        <div className="flex gap-3">
          <div className="flex flex-col gap-1">
            {/* <label>Category: </label> */}
            <Select
              className="w-44 h-8"
              placeholder="Select Category"
              onChange={(value: any) => dispatch(getSubCatogaries(value))}
            >
              <Select.Option value="">All</Select.Option>
              {catogaries?.map((catogary: any, index: number) => (
                <Select.Option key={catogary?._id} value={catogary?._id}>
                  {capitalize(catogary?.name)}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            {/* <label>Sub category: </label> */}
            <Select className="w-44 h-8" placeholder="Select sub category">
              <Select.Option value="">All</Select.Option>
              {subCategories?.sub_category?.map((data: any) => (
                <Select.Option key={data?._id} value={data?._id}>
                  {data?.name}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="self-end">
          <Input
            className="w-44 h-8"
            prefix={<SearchOutlined />}
            placeholder="Search..."
          />
        </div>
      </div>
      {/* products */}
      {status === REQUEST_STATUS.PENDING ? (
        <Spinner />
      ) : (
        <div className="my-6 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 sm:gap-x-24 ">
          {products?.map((item: any, index: number) => (
            <CardComponent key={index} item={item} />
          ))}
        </div>
      )}
      <Pagination className="flex justify-end" defaultCurrent={1} total={50} />
    </div>
  );
};

export default Products;

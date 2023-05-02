import { Form, Input, Pagination, Select } from "antd";
import { useEffect } from "react";
import "./products.scss";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  getCatogaries,
  getSubCatogaries,
  setSubCategory,
} from "../../store/catogaries/catogaries-slice";
import { capitalize } from "../../utils/functions/functions";
import { SearchOutlined } from "@ant-design/icons";
import CardComponent from "../products/card/card";
import { getProducts } from "../../store/products/products-slice";
import { REQUEST_STATUS } from "../../utils/constants";
import Spinner from "../common/spinner/spinner";
import { Empty } from "antd";

const Products = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { catogaries, subCategories } = useAppSelector(
    (state) => state.catogaries
  );
  const { products, status } = useAppSelector((state) => state.products);
  const categoryChange = (value: string) => {
    form.resetFields(["subCategory"]);
    let queryParam: any = {};
    if (value) {
      queryParam = {
        categoryId: value,
      };
      dispatch(getSubCatogaries(value));
      dispatch(getProducts(queryParam));
    } else {
      dispatch(getProducts(queryParam));
      dispatch(setSubCategory());
    }
  };
  const subCategoryChange = (value: string) => {
    let queryParam: any = {};
    if (value) {
      queryParam = {
        subCategoryId: value,
      };
      dispatch(getProducts(queryParam));
    }
  };
  const searchProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
    let queryParam: any = {};
    let name = event.target.value?.trim();
    if (name) {
      queryParam = {
        name,
      };
      dispatch(getProducts(queryParam));
    } else {
      dispatch(getProducts(queryParam));
    }
  };
  const handlePagination = async (value: Number) => {
    let queryParam: any = {};
    if (value) {
      queryParam = {
        page: value,
      };
      dispatch(getProducts(queryParam));
    }
  };
  let payload = "";
  useEffect(() => {
    dispatch(getCatogaries());
    dispatch(getProducts(payload));
  }, []);

  return (
    <div className="_products_wrap">
      <h1 className="font-semibold text-lg">Products</h1>
      <div className="flex justify-between mt-1">
        <Form form={form} className="_form">
          <div className="flex gap-3">
            <div className="flex flex-col gap-1">
              {/* <label>Category: </label> */}
              <Select
                className="w-44 h-8"
                placeholder="Select Category"
                onChange={categoryChange}
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
              <Form.Item name="subCategory" className="w-44 h-8 ">
                <Select
                  onChange={subCategoryChange}
                  placeholder="Select sub category"
                >
                  {subCategories?.map((data: any) => (
                    <Select.Option key={data?._id} value={data?._id}>
                      {capitalize(data?.name ?? "")}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>
        </Form>
        <div className="self-end">
          <Input
            className="w-44 h-8"
            prefix={<SearchOutlined />}
            placeholder="Search..."
            onChange={searchProduct}
          />
        </div>
      </div>
      {/* products */}
      {!products?.products?.length && status === REQUEST_STATUS.PENDING ? (
        <div className="mt-3">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col justify-between min-h-screen">
          {!products?.products?.length ? (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="No product available"
            />
          ) : (
            ""
          )}
          <div className="my-6 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 sm:gap-x-24 ">
            {products?.products?.map((item: any, index: number) => (
              <CardComponent key={index} item={item} />
            ))}
          </div>
          {products?.products?.length ? (
            <Pagination
              onChange={handlePagination}
              className="flex justify-end"
              defaultCurrent={1}
              defaultPageSize={8}
              total={products?.pagination?.totalCount}
              showSizeChanger={false}
            />
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default Products;

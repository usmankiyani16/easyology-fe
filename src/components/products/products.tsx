import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getProducts } from "../../store/products/products-slice";
import CommonTab from './tabs/common-tab';
import './products.scss'

const { TabPane } = Tabs;


const Products = () => {
  const { products } = useAppSelector((state) => state.products)
  const dispatch = useAppDispatch()
  console.log('products', products)

  useEffect(() => {
    dispatch(getProducts())
  }, [])
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);
  const [activeSubcategory, setActiveSubcategory] = useState<string | undefined>(undefined);


  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setActiveSubcategory(undefined);
  };

  const handleSubcategoryChange = (subcategory: string) => {
    setActiveSubcategory(subcategory);
  };

  return (
    <Tabs className='_products' activeKey={activeCategory} onChange={handleCategoryChange}>
      {products?.map((category: any) => (
        <TabPane tab={category?.name} key={category?._id}>
          <Tabs activeKey={activeSubcategory} onChange={handleSubcategoryChange}>
            {category?.sub_category?.map((subcategory: any) => (
              <TabPane className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 sm:gap-x-24' tab={subcategory?.name} key={subcategory?._id}>
                {subcategory?.products?.map((product: any) => (
                  <div key={product?._id}>
                    <CommonTab data={product} />
                  </div>
                ))}
              </TabPane>
            ))}
          </Tabs>
        </TabPane>
      ))}
    </Tabs>
  );
};

export default Products;

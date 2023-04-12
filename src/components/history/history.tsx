// import React, { useEffect } from "react";


// const History = () => {
//   const { products } = useAppSelector((state) => state.products)
//   const dispatch = useAppDispatch()
//   console.log('products', products)

//   useEffect(() => {
//     dispatch(getProducts())
//   }, [])
//   return (
//     <div className="">
//       {products?.map((data: any) => (
//         <div key={data?._id} className="flex">
//           <h1 className=""><span className="font-semibold">categories: </span>
//             <span className="text-blue-600">{data?.name}</span>
//           </h1>
//           {data?.sub_category?.map((sub: any) => (
//             <div key={sub?._id}>
//               <br />
//               <h1><span className="font-semibold">sub_categories: </span>
//                 <span className="text-green-600">{sub?.name}</span></h1>
//               {sub?.products?.map((prod: any) => (
//                 <div key={prod?._id}>
//                   <h1><span className="font-semibold">products: </span>
//                     <span className="text-rose-600	">{prod?.name}</span></h1>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>);
// };

// export default History;

// import ProductsTabs from "./tabs/tabs";
// import "./products.scss";

// const Products = () => {
//   return (
//     <div className="_dashboard_wrap">
//       <ProductsTabs />
//     </div>
//   );
// };

// export default Products;
import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getProducts } from "../../store/products/products-slice";
import CommonTab from '../dashboard/tabs/common-tab';

const { TabPane } = Tabs;

type Category = {
  name: string;
  subcategories: Subcategory[];
};

type Subcategory = {
  name: string;
  products: string[];
};

const categories: Category[] = [
  {
    name: 'Category 1',
    subcategories: [
      {
        name: 'Subcategory 1.1',
        products: ['Product 1.1.1', 'Product 1.1.2', 'Product 1.1.3'],
      },
      {
        name: 'Subcategory 1.2',
        products: ['Product 1.2.1', 'Product 1.2.2', 'Product 1.2.3'],
      },
    ],
  },
  {
    name: 'Category 2',
    subcategories: [
      {
        name: 'Subcategory 2.1',
        products: ['Product 2.1.1', 'Product 2.1.2', 'Product 2.1.3'],
      },
      {
        name: 'Subcategory 2.2',
        products: ['Product 2.2.1', 'Product 2.2.2', 'Product 2.2.3'],
      },
    ],
  },
];

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
    <Tabs activeKey={activeCategory} onChange={handleCategoryChange}>
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

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
import React, { useState } from 'react';
import { Tabs } from 'antd';

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
      {categories.map((category) => (
        <TabPane tab={category.name} key={category.name}>
          <Tabs activeKey={activeSubcategory} onChange={handleSubcategoryChange}>
            {category.subcategories.map((subcategory) => (
              <TabPane tab={subcategory.name} key={subcategory.name}>
                {subcategory.products.map((product) => (
                  <div key={product}>{product}</div>
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

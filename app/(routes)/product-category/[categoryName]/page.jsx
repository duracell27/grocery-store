import GlobalApi from "@/app/_utils/GlobalApi";
import React from "react";
import TopCategoryList from "../_components/TopCategoryList";
import ProductList from "@/app/_components/ProductList";

const ProductCategory = async ({ params }) => {
  const categoryName = params.categoryName;

  const productList = await GlobalApi.getProductsByCategory(categoryName);

  const categoryList = await GlobalApi.getCategoryList();
  return (
    <div>
      <h2 className="p-4 bg-primary text-white font-bold text-3xl text-center">
        {categoryName}
      </h2>
      <TopCategoryList
        categoryList={categoryList}
        categoryName={categoryName}
      />
      <ProductList productList={productList} />
    </div>
  );
};

export default ProductCategory;

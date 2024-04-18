import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoryList = ({ categoryList }) => {
  return (
    <div className="mt-5 px-16">
      <h2 className="text-green-600 font-bold text-2xl">Shop by category</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-5 mt-2">
        {categoryList.map((category, index) => (
          <Link href={`/product-category/${category.attributes.name}`} className="flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-green-100" key={index}>
            <Image
              src={
                process.env.NEXT_PUBLIC_BASE_URL +
                category?.attributes?.icon?.data[0]?.attributes?.url
              }
            alt='categoryImg'
            width={50}
            height={50}
            className="group-hover:scale-125 transition-all ease-out "
            />
            <h2 className="text-green-800">{category.attributes.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;

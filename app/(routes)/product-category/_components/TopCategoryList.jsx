
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const TopCategoryList = ({categoryList, categoryName}) => {
  return (
    <div className="flex gap-5 mt-2 overflow-auto mx-7 md:mx-20 justify-center">
        {categoryList.map((category, index) => (
          <Link href={`/product-category/${category.attributes.name}`} className={`flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-green-200 w-[150px] min-w-[100px] ${categoryName === category.attributes.name && 'bg-primary'}`} key={index}>
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
            <h2 className={`text-green-800 ${categoryName === category.attributes.name && 'text-white'}`}>{category.attributes.name}</h2>
          </Link>
        ))}
      </div>
  )
}

export default TopCategoryList
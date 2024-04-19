import Image from "next/image";
import React from "react";

const MyOrderItem = ({ order }) => {
  return (
    <>
      <div className="gap-2 grid grid-cols-5 mt-3 items-center">
        <Image
          src={
            process.env.NEXT_PUBLIC_BASE_URL +
            order.product.data.attributes.images.data[0].attributes.url
          }
          alt="irder item"
          width={80}
          height={80}
          className="bg-gray-100 p-6 rounded-md border"
        />
        <div className="col-span-2">
          <h2>{order.product.data.attributes.name}</h2>
          <h2>Item price: {order.product.data.attributes.mrp}</h2>
        </div>
        <h2 className="">Quantity: {order.quantity}</h2>
        <h2 className="">Price: {order.price}</h2>
      </div>
      <hr className="mt-3"/>
    </>
  );
};

export default MyOrderItem;

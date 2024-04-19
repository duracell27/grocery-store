'use client'
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const CartItemList = ({ cartItemList,onDeleteItem }) => {
    
  return (
    <div>
      <div className="h-[80%] overflow-auto">
        {cartItemList.map((cart, index) => (
          <div className="flex justify-between items-center p-2 mb-5" key={index}>
            <div className="flex gap-6 items-center">
              <Image
                src={process.env.NEXT_PUBLIC_BASE_URL + cart.image}
                width={70}
                height={70}
                alt="cartImg"
                className="border p-2"
              />
              <div className="">
                <h2 className="font-bold">{cart.name}</h2>
                <h2>Quantity: {cart.quantity}</h2>
                <h2 className="text-lg font-bold">Amount: ${cart.amount}</h2>
              </div>
            </div>
              <TrashIcon className="cursor-pointer bg-white hover:bg-red-400 p-2 rounded-full w-9 h-9 hover:text-white" onClick={()=>onDeleteItem(cart.id)}/>
          </div>
        ))}
      </div>
      


    </div>
  );
};

export default CartItemList;

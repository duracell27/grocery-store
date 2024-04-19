"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import moment from "moment";
import MyOrderItem from "./_components/MyOrderItem";

function MyOrder() {
  const router = useRouter();

  const [orderList, setOrderList] = useState([]);

  const jwt =
    typeof window !== "undefined"
      ? window.sessionStorage.getItem("jwt")
      : false;
  let userId;
  if (jwt) {
    userId =
      typeof window !== "undefined"
        ? JSON.parse(window.sessionStorage.getItem("user")).id
        : false;
  }

  const getMyOrder = async () => {
    const orderList_ = await GlobalApi.getOrders(userId, jwt);
    console.log("orderList", orderList_);
    setOrderList(orderList_);
  };

  useEffect(() => {
    if (!jwt) {
      router.push("/sign-in");
    }
    getMyOrder();
  }, []);

  return (
    <div>
      <h2 className="p-3 bg-primary tetx-xl font-bold text-center text-white">
        My Orders
      </h2>
      <div className="py-8 mx-7 md:mx-20">
        <h2 className="text-3xl font-bold text-primary">Order History</h2>
        <div className="">
          {orderList.map((item, index) => (
            <Collapsible key={index}>
              <CollapsibleTrigger className="w-full my-4">
                <div className="border p-2 bg-slate-100 text-left flex justify-evenly">
                  <h2>
                    <span className="font-bold mr-2">Order date: </span> {moment(item?.createdAt).format("DD/MM/YYYY")}
                  </h2>
                  <h2><span className="font-bold mr-2">Total amount:</span> {item?.totalOrderAmount}</h2>
                  <h2><span className="font-bold mr-2">Status:</span> PENDING </h2>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {item.orderItemList.map((order, index_)=>(
                    <MyOrderItem key={index_} order={order}/>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyOrder;

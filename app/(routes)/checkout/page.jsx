"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Checkout = () => {
  const [userId, setUserId] = useState();
  const [jwt, setJwt] = useState();
  const [totalCartNumber, setTotalCartNumber] = useState(0);
  const [cartItemList, setCartItemList] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");

  const router = useRouter();

  const getCartItems = async () => {
    const cartItemList_ = await GlobalApi.getCartItems(userId, jwt);

    setTotalCartNumber(cartItemList_?.length);
    setCartItemList(cartItemList_);
  };

  const calculateTotalAmount = () => {
    const totalAmount = subtotal * 1.09 + 15;
    return totalAmount.toFixed(2);
  };

  const onPayment = () => {
    const payload={
        data: {
            username: userName,
            email: email,
            phone: phone,
            zip: zip,
            address: address,
            totalOrderAmount: calculateTotalAmount(),
            userId: userId,
            paymentId: '1234',
            orderItemList: cartItemList
        }
    }

    GlobalApi.createOrder(payload, jwt).then((res)=>{
        console.log('order',res)
        toast('Order created')
        cartItemList.forEach((item, index)=>{
            GlobalApi.deleteCartItem(item.id, jwt)
        })
        router.replace('/order-confirmation')
    },(e)=>{
        console.log(e)
    })
  }

  useEffect(() => {
    let total = 0;
    cartItemList.forEach((item) => {
      total += item.amount * item.quantity;
    });
    setSubtotal(total);
  }, [cartItemList]);

  useEffect(() => {
    setJwt(sessionStorage.getItem("jwt"));
    if (jwt) {
      setUserId(JSON.parse(sessionStorage.getItem("user")).id);
    }
    if (jwt) {
      getCartItems();
    }
  }, []);

  return (
    <div>
      <h2 className="p-3 bg-primary text-xl font-bold text-center text-white">
        Checkout
      </h2>
      <div className="p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8">
        <div className="md:col-span-2 mx-20">
          <h2 className="font-bold text-3xl ">Billing Details</h2>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              placeholder="Name"
            />
            <Input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
            />
          </div>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              placeholder="Phone"
            />
            <Input
              onChange={(e) => {
                setZip(e.target.value);
              }}
              placeholder="Zip"
            />
          </div>
          <div className="mt-3">
            <Input
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              placeholder="Address"
            />
          </div>
        </div>
        <div className="mx-10 border">
          <h2 className="p-3 bg-gray-200 font-bold text-center">
            Total Cart ({totalCartNumber})
          </h2>
          <div className="p-4 flex flex-col justify-between gap-4">
            <h2 className="font-bold flex justify-between">
              Subtotal: <span>${subtotal}</span>
            </h2>
            <hr />
            <h2 className="flex justify-between">
              Delivery: <span>$15</span>
            </h2>
            <h2 className="flex justify-between">
              Tax (9%): <span>${(subtotal * 0.09).toFixed(2)}</span>
            </h2>
            <hr />
            <h2 className="font-bold flex justify-between">
              Total: <span>${calculateTotalAmount()}</span>
            </h2>
            <Button disabled={!userName||!email||!phone||!zip||!address} onClick={onPayment}>
              Payment <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

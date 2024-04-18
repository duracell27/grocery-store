"use client";
import { Button } from "@/components/ui/button";
import { LoaderCircle, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import { toast } from "sonner";
import { UpdateCartContext } from "../_context/UpdateCartContext";

const ProductItemDetail = ({ product }) => {
  const [productTotalPrice, setProductTotalPrice] = useState(
    product.attributes.sellingPrice
      ? product.attributes.sellingPrice
      : product.attributes.mrp
  );
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);

  const router = useRouter();

  let jwt;
  let user;

  if (typeof window !== "undefined") {
    jwt = sessionStorage.getItem("jwt");
    user = JSON.parse(sessionStorage.getItem("user"));
  }

  const addToCart = () => {
    setIsLoading(true);
    if (!jwt) {
      router.push("/sign-in");
      setIsLoading(false);
      return;
    }

    const data = {
      data: {
        quantity: quantity,
        amount: quantity + productTotalPrice,
        products: product.id,
        users_permissions_users: user.id,
        userId: user.id,
      },
    };

    GlobalApi.addToCart(data, jwt).then(
      (resp) => {
        console.log(resp);
        toast("Add to cart successfully");
        setUpdateCart(!updateCart);
        setIsLoading(false);
      },
      (e) => {
        console.log(e);
        toast(e?.response?.data?.error?.message);
        setIsLoading(false);
      }
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black">
      <Image
        src={
          process.env.NEXT_PUBLIC_BASE_URL +
          product?.attributes?.images?.data[0]?.attributes?.url
        }
        alt={product?.attributes?.name}
        width={300}
        height={300}
        className="bg-slate-200 p-5 h-[320px] w-[300px] object-contain rounded-lg"
      />
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold ">{product.attributes.name}</h2>
        <h2 className="text-sm font-bold text-gray-500">
          {product.attributes.description}
        </h2>
        <div className="flex justify-start items-center gap-3">
          {product.attributes.sellingPrice && (
            <h2 className="font-bold text-3xl ">
              ${product.attributes.sellingPrice}
            </h2>
          )}
          <h2
            className={`font-bold text-3xl ${
              product.attributes.sellingPrice && "line-through text-gray-500"
            }`}
          >
            ${product.attributes.mrp}
          </h2>
        </div>
        <h2 className="font-medium text-lg">
          Quantity ({product.attributes.itemQuantityType})
        </h2>
        <div className="flex flex-col items-baseline gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 border flex gap-10 items-center px-5">
              <button
                disabled={quantity < 2}
                onClick={() => setQuantity(quantity - 1)}
              >
                -
              </button>
              <h2>{quantity}</h2>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <h2 className="font-bold text-2xl">
              {" "}
              = ${quantity * productTotalPrice}
            </h2>
          </div>
          <Button
            disabled={isLoading}
            className="flex gap-3"
            onClick={addToCart}
          >
            {isLoading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <ShoppingBasket />
            )}
            Add to cart
          </Button>
        </div>
        <h2>
          <span className="font-bold">Category:</span>{" "}
          {product.attributes.categories.data[0].attributes.name}
        </h2>
      </div>
    </div>
  );
};

export default ProductItemDetail;

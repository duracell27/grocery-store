import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductItemDetail from "./ProductItemDetail";

const ProductItem = ({ product }) => {
  return (
    <div className="p-2 md:p-6 flex flex-col items-center justify-center gap-3 border rounded-lg hover:scale-110 hover:shadow-lg transition-all ease-out">
      <Image
        src={
          process.env.NEXT_PUBLIC_BASE_URL +
          product?.attributes?.images?.data[0]?.attributes?.url
        }
        alt={product?.attributes?.name}
        width={200}
        height={200}
        className="h-[200px] max-h-[200px] w-[auto]"
      />
      <h2 className="font-bold text-lg">{product.attributes.name}</h2>
      <div className="flex justify-center items-center gap-3">
        {product.attributes.sellingPrice && (
          <h2 className="font-bold ">${product.attributes.sellingPrice}</h2>
        )}
        <h2
          className={`font-bold ${
            product.attributes.sellingPrice && "line-through text-gray-500"
          }`}
        >
          ${product.attributes.mrp}
        </h2>
      </div>

      <Dialog>
        <DialogTrigger>
          
            <div
              className="text-primary hover:text-white hover:bg-primary border border-gray-200 py-2 px-4 rounded-lg"
            >
              Add to cart
            </div>
          
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <ProductItemDetail product={product} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductItem;

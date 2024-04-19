"use client";
import { Button } from "@/components/ui/button";
import {
  CircleUserIcon,
  LayoutGrid,
  Search,
  ShoppingBasket,
} from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GlobalApi from "../_utils/GlobalApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UpdateCartContext } from "../_context/UpdateCartContext";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CartItemList from "./CartItemList";
import { toast } from "sonner";

const Header = () => {
  const [categoriesList, setCategoriesList] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState();
  const [cartItemList, setCartItemList] = useState([]);
  const [totalCartNumber, setTotalCartNumber] = useState(0);

  const [userId, setUserId] = useState();
  const [jwt, setJwt] = useState();

  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);

  const router = useRouter();

  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    let total = 0;
    cartItemList.forEach((item) => {
      total += item.amount * item.quantity;
    });
    setSubtotal(total);
  }, [cartItemList]);

  const getCartItems = async () => {
    const cartItemList_ = await GlobalApi.getCartItems(userId, jwt);
    console.log(cartItemList_);
    setTotalCartNumber(cartItemList_?.length);
    setCartItemList(cartItemList_);
  };

  const getCategoryList = () => {
    GlobalApi.getCategory().then((response) => {
      setCategoriesList(response.data.data);
    });
  };

  const onSignOut = () => {
    sessionStorage.clear();
    router.push("/");
  };

  const onDeleteItem = (id) => {
    GlobalApi.deleteCartItem(id, jwt).then((response) => {
      toast("Item deleted successfully");

      getCartItems();
    });
  };

  useEffect(() => {
    setIsLogin(sessionStorage.getItem("jwt") ? true : false);
    if (isLogin) {
      setUserName(JSON.parse(sessionStorage.getItem("user")).username);
      setUserId(JSON.parse(sessionStorage.getItem("user")).id);
    }
    setJwt(sessionStorage.getItem("jwt"));
    // console.log('username',userName)
    getCategoryList();
  }, [isLogin]);

  useEffect(() => {
    if (jwt && userId) {
      getCartItems();
    }
  }, [jwt, userId, updateCart]);
  return (
    <div className="p-5 shadow-sm flex justify-between">
      <div className="flex items-center gap-8">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={150} height={100} />
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="outline-none">
            <h2 className="md:flex hidden gap-2 items-center border rounded-full p-2 px-10 bg-slate-200">
              <LayoutGrid className="h-5 w-5" /> Category
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Browse category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categoriesList.map((category, index) => (
              <Link
                key={index}
                href={`/product-category/${category.attributes.name}`}
              >
                <DropdownMenuItem className="flex gap-4 items-center cursor-pointer">
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_BASE_URL +
                      category?.attributes?.icon?.data[0]?.attributes?.url
                    }
                    alt="icon"
                    width={30}
                    height={30}
                    unoptimized={true}
                  />
                  <h2 className="text-lg">{category?.attributes?.name}</h2>
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="md:flex gap-3 items-center border rounded-full p-2 px-5 hidden">
          <Search />
          <input type="text" placeholder="Search" className="outline-none" />
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <Sheet>
          <SheetTrigger>
            <h2 className="flex gap-2 items-center text-lg">
              <ShoppingBasket className="h-7 w-7" />{" "}
              <span className="bg-primary text-white px-2 rounded-full">
                {totalCartNumber}
              </span>
            </h2>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="bg-primary text-white font-bold text-lg p-2">
                My Cart
              </SheetTitle>
              <SheetDescription>
                <CartItemList
                  cartItemList={cartItemList}
                  onDeleteItem={onDeleteItem}
                />
              </SheetDescription>
            </SheetHeader>
            <SheetClose asChild>
              <div className="absolute w-[90%] bottom-6 flex flex-col">
                <h2 className="text-lg font-bold flex justify-between mb-2">
                  Subtotal: <span>${subtotal}</span>
                </h2>
                <Button
                  onClick={() => router.push(jwt ? "/checkout" : "/sign-in")}
                >
                  Check out
                </Button>
              </div>
            </SheetClose>
          </SheetContent>
        </Sheet>

        {!isLogin ? (
          <Link href={"/sign-in"}>
            <Button>Login</Button>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <div className="bg-green-100 text-primary p-2 flex gap-2 font-bold items-center rounded-full">
                <CircleUserIcon className="h-10 w-10" /> {userName}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <Link href={"/my-order"}>
                <DropdownMenuItem>My orders</DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={onSignOut}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Header;

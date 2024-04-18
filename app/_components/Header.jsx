"use client";
import { Button } from "@/components/ui/button";
import { CircleUserIcon, LayoutGrid, Search, ShoppingBag, ShoppingBasket } from "lucide-react";
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

const Header = () => {
  const [categoriesList, setCategoriesList] = useState([]);
  const [isLogin, setIsLogin] = useState(false)
  const [userName, setUserName] = useState()

  const [userId, setUserId] = useState()
  const [jwt, setJwt] = useState()

  const {updateCart, setUpdateCart} = useContext(UpdateCartContext)

  const [totalCartNumber, setTotalCartNumber] = useState(0)

  
  const router = useRouter();

  const getCartItems = async () =>{
    const cartItemList = await GlobalApi.getCartItems(userId, jwt)
    // console.log(cartItemList)
    setTotalCartNumber(cartItemList?.length)
  }
  

  const getCategoryList = () => {
    GlobalApi.getCategory().then((response) => {
      setCategoriesList(response.data.data);
    });
  };

  const onSignOut = () => {
    sessionStorage.clear();
    router.push("/");
  };

  useEffect(() => {
    setIsLogin(sessionStorage.getItem("jwt")?true:false)
    setUserName(JSON.parse(sessionStorage.getItem("user")).username)
    setJwt(sessionStorage.getItem("jwt"))
    setUserId(JSON.parse(sessionStorage.getItem("user")).id)
    // console.log('username',userName)
    getCategoryList();
  }, []);


  useEffect(()=>{
    if(jwt && userId){
      getCartItems()
    }
  },[jwt,userId, updateCart])
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
        <h2 className="flex gap-2 items-center text-lg">
          <ShoppingBasket className="h-7 w-7" /> <span className="bg-primary text-white px-2 rounded-full">{totalCartNumber}</span>
        </h2>
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
              <DropdownMenuItem>My orders</DropdownMenuItem>
              <DropdownMenuItem onClick={onSignOut}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Header;

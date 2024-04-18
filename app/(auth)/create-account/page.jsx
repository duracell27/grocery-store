"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false)

  const router = useRouter()

  const onCreateAccount = () => {
    setLoader(true);
    GlobalApi.registerUser(username, email, password).then(
      (resp) => {
        sessionStorage.setItem("user", JSON.stringify(resp.data.user));
        sessionStorage.setItem("jwt", resp.data.jwt);
        toast('Account created successfully')
        router.push("/");
        setLoader(false);
      },
      (e) => {
        toast(e?.response?.data?.error?.message);
        setLoader(false);
      }
    );
  };

  useEffect(() => {
    const jwt = sessionStorage.getItem("jwt");
    if (jwt) {
      router.push("/");
    }else{
        
    }
  }, []);

  return (
    <div className="flex items-baseline justify-center my-20 ">
      <div className="flex flex-col items-center justify-center p-10 bg-slate-100 border border-gray-200 rounded-md">
        <Image src={"/logo.png"} alt="logo" width={200} height={200} />
        <h2 className="font-bold text-3xl mt-4">Create an Account</h2>
        <h2 className="text-gray-500">
          Enter your Email and Password to Create an Account
        </h2>
        <div className="flex flex-col gap-5 mt-7">
          <Input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            disabled={!(username && email && password)}
            onClick={onCreateAccount}
          >
            {loader ?<LoaderIcon className='animate-spin'/> : 'Create an Account'} 
          </Button>
          <p>
            Already have an account?{" "}
            <Link href={"/sign-in"} className="text-blue-500">
              Click here to Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;

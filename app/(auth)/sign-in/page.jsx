"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const router = useRouter();

  const onSignIn = () => {
    setLoader(true);
    GlobalApi.signIn(email, password).then(
      (resp) => {
        sessionStorage.setItem("user", JSON.stringify(resp.data.user));
        sessionStorage.setItem("jwt", resp.data.jwt);
        toast("Sign In Success");
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
    } else {
      router.push("/sign-in");
    }
  }, []);
  return (
    <div className="flex items-baseline justify-center my-20 ">
      <div className="flex flex-col items-center justify-center p-10 bg-slate-100 border border-gray-200 rounded-md">
        <Image src={"/logo.png"} alt="logo" width={200} height={200} />
        <h2 className="font-bold text-3xl mt-4">Sign In</h2>
        <h2 className="text-gray-500">
          Enter your Email and Password to Sign In
        </h2>
        <div className="flex flex-col gap-5 mt-7">
          <Input
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button disabled={!(email && password)} onClick={onSignIn}>
            {loader ? <LoaderIcon className="animate-spin" /> : "Sign In"}
          </Button>
          <p>
            Not registred yet?{" "}
            <Link href={"/create-account"} className="text-blue-500">
              Click here to Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

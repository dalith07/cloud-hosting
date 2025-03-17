/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import { DOMAIN } from "@/lib/constants";
import ButtonSpinner from "@/components/ButtonSpinner";

const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const fromSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    // test@gmail.com
    // 12345678
    // video 20 17:50
    const resolveAfter3Sec = new Promise((resolve) =>
      setTimeout(resolve, 3000)
    );
    if (email === "") return toast.error("Email is required");
    if (password === "") return toast.error("Password is required");
    if (email && !password)
      return toast.promise(resolveAfter3Sec, {
        pending: "Promise is pending",
        success: "Promise resolved 👌",
      });

    try {
      setLoading(true);
      // await axios.post(`${DOMAIN}/api/users/login`, { email, password });
      await axios.post(`${DOMAIN}/api/users/login`, { email, password });
      console.log("🔍 Sending login request:", { email, password });
      router.replace("/");
      setLoading(false);
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log("❌ Login failed:", error);
      setLoading(false);
    }
  };

  return (
    <form className="relative flex flex-col" onSubmit={fromSubmitHandler}>
      <input
        className="mb-4 border-gray-400 rounded p-3 text-xl"
        type="email"
        placeholder="Enter Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="mb-4 border rounded p-3 text-xl"
        type={showPassword ? "text" : "password"}
        placeholder="Enter Your Passowrd"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <span
        className="absolute text-2xl right-4 bottom-16 cursor-pointer"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {/* <IoEyeSharp className="text-2xl" />
          <FaEyeSlash className="text-2xl" /> */}
        {showPassword ? (
          <FaEyeSlash className="text-2xl" />
        ) : (
          <IoEyeSharp className="text-2xl" />
        )}
      </span>
      <Button disabled={loading} type="submit">
        {loading ? <ButtonSpinner /> : <span>Login</span>}
      </Button>
    </form>
  );
};

export default LoginForm;

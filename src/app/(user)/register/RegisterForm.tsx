"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const fromSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "") return toast.error("Username is required");
    if (email === "") return toast.error("Email is required");
    if (password === "") return toast.error("Password is required");

    if (username && email && password) return toast.success("Success");

    // test@gmail.com
    // 12345678

    console.log({ email, password });
  };

  return (
    <div>
      <form
        action=""
        className="relative flex flex-col"
        onSubmit={fromSubmitHandler}
      >
        <input
          className="mb-4 border-gray-400 rounded p-3 text-xl"
          type="text"
          placeholder="Enter Your Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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

        <Button type="submit">Register</Button>
      </form>
    </div>
  );
};

export default RegisterForm;

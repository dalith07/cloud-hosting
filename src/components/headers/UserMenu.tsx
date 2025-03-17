"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaUserGear } from "react-icons/fa6";
import LogoutButton from "./LogoutButton";

interface test {
  userName: string;
}
const UserMenu = ({ userName }: test) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Clickable Div */}
      <div
        className="flex items-center justify-center flex-row gap-2 cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)} // Toggle on click
      >
        <Image
          src={"/email.jpg"}
          alt="image login"
          width={50}
          height={50}
          className="rounded-full hover:animate-pulse"
        />
      </div>

      {/* Toggle Div */}
      {isOpen && (
        <div
          className={`absolute top-14 right-0 border-2 border-gray-400
              rounded-tr-xl p-8 bg-blue-950 transition-all duration-500
              ease-in-out transform`}
        >
          <div className="flex gap-2 items-center mb-4">
            <Image
              src={"/email.jpg"}
              alt="image login"
              width={50}
              height={50}
              className="rounded-full cursor-pointer"
            />
            <div className="flex flex-col gap-1">
              <strong className="text-white md:text-xl capitalize">
                {userName}
              </strong>
              <strong className="text-white md:text-md">email@gmail.com</strong>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button className="rounded-none rounded-tr-2xl p-8">
              Manage account <FaUserGear />
            </Button>
            <LogoutButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

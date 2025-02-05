"use client";

import { TiTick } from "react-icons/ti";
import { Button } from "../ui/button";
import { ToastContainer, toast } from "react-toastify";

const WebHostingPlan = () => {
  const notify = () => {
    toast.success("Success!", { theme: "colored" });
  };

  return (
    <div
      className="felw flex-col items-center justify-center w-3/4 rounded p-4
        bg-gray-200 mb-7 md:w-2/4 lg:w-1/4"
    >
      <h3 className="text-3xl font-bold text-purple-900">Premium</h3>
      <strong className="text-2xl font-bold text-gray-900 my-5">
        $4.99/mo
      </strong>
      <span
        className="bg-red-200 text-red-900 rounded-full px-2 py-1 
      font-semibold"
      >
        10% OFF
      </span>

      <div className="mt-6">
        <h5 className="text-2xl font-semibold text-purple-700">Top Features</h5>

        <div className="flex gap-1 items-center  mb-1 ps-3">
          <TiTick className="text-green-700 text-[1.5rem]" /> 100 Website
        </div>
        <div className="flex  gap-1 items-center  mb-1 ps-3">
          <TiTick className="text-green-700 text-[1.5rem]" /> 100 GB SSD Storage
        </div>
        <div className="flex  gap-1 items-center  mb-1 ps-3">
          <TiTick className="text-green-700 text-[1.5rem]" /> Weekly Backups
        </div>
        <div className="flex  gap-1 items-center  mb-1 ps-3">
          <TiTick className="text-green-700 text-[1.5rem]" /> Unlimited
          Bandwidth
        </div>
        <div className="flex  gap-1 items-center  mb-1 ps-3">
          <TiTick className="text-green-700 text-[1.5rem]" /> Free SLL
        </div>
        <div className="flex  gap-1 items-center  mb-1 ps-3">
          <TiTick className="text-green-700 text-[1.5rem]" /> Free Email
        </div>
      </div>

      <div className="flex items-center justify-center mt-4">
        <Button onClick={notify} className="hover:bg-green-500 px-6">
          BUY NOW
        </Button>

        <ToastContainer className=" flex-none" />
      </div>
    </div>
  );
};

export default WebHostingPlan;

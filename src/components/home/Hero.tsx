"use client";

import Image from "next/image";
import { TiTick } from "react-icons/ti";
import React from "react";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Hero = () => {
  return (
    <section
      className="h-screen flex items-center justify-between text-gray-800 px-7 
    flex-wrap"
    >
      <div className="">
        <h1 className="text-4xl font-bold text-black">Cloud Hosting</h1>
        <p className="text-[21px]">
          The best web hosting solution for your online success
        </p>

        <div className="p-1 mt-4">
          <span
            className="flex items-center text-xl font-semibold mb-1
            text-gray-400"
          >
            <TiTick className="text-3xl text-green-500" />
            Website Maintenance
          </span>
          <span
            className="flex items-center text-xl font-semibold mb-1
            text-gray-400"
          >
            <TiTick className="text-3xl text-green-500" />
            Secure Hosting
          </span>
          <span
            className="flex items-center text-xl font-semibold mb-1
            text-gray-400"
          >
            <TiTick className="text-3xl text-green-500" />
            Easy To Use Control Panel
          </span>
        </div>
      </div>

      <div>
        <Image
          src={"/cloud-hosting1.png"}
          alt="hero images"
          width={500}
          height={500}
          priority
        />

        {/* <DotLottieReact
          src="https://lottie.host/6905b6e6-7ad9-48d0-9fd7-5a8ae84ce29f/014NnwFhRt.lottie"
          loop
          autoplay
          className="w-full h-full"
        /> */}
      </div>
    </section>
  );
};

export default Hero;

"use client";

import React, { useEffect, useState } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const [time, setTime] = useState({
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
    seconds: new Date().getSeconds(),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime({
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
        seconds: new Date().getSeconds(),
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div
      className="flex items-center justify-center text-white
        bg-gray-700 h-[50px]"
      //   style={{ height: "50px" }}
    >
      <p className="text-sm text-muted-foreground">
        &copy;<span>{currentYear}</span> All Right Reserved By Kira
      </p>

      <div className="absolute top-16 right-0 bg-blue-500 p-4 rounded-md">
        <p className="text-md text-gray-200 font-semibold">
          <span>{time.hours.toString().padStart(2, "0")}</span>:
          <span>{time.minutes.toString().padStart(2, "0")}</span>:
          <span>{time.seconds.toString().padStart(2, "0")}</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;

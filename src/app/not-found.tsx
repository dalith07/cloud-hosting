import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="fix-height flex justify-center items-center flex-col">
      <h1 className="text-7xl text-blue-700 font-bold animate-pulse">404</h1>
      <p className="text-gray-500 text-3xl mt-2 mb-5">Page Not Found</p>

      <Button>
        <Link href="/" className="text-xl">
          Back Home
        </Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;

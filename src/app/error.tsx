"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

const error = ({ error, reset }: ErrorPageProps) => {
  return (
    <div className="fix-height pt-7 text-center">
      <div className="text-3xl text-red-600 font-semibold">
        Somthing Went Wrong
      </div>
      <h2 className="text-gray-700 my-3 text-xl">
        Error Message: {error.message}
      </h2>
      <Button onClick={() => reset()} variant="outline" className="">
        Try Again
      </Button>
      <Button className="mt-6">
        <Link href="/" className="text-xl to-blue-600 block ">
          Go To Home Page
        </Link>
      </Button>
    </div>
  );
};

export default error;

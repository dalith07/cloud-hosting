"use client";

import { Dancing_Script } from "next/font/google";
import AddArticleForm from "./AddArticleForm";
import { cn } from "@/lib/utils";

const DancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "600"],
});

function page() {
  return (
    <div className="fix-height flex items-center justify-center px-5 lg:px-20">
      <div className="shadow p-4 bg-purple-200 rounded w-full">
        <h2
          className={cn(
            "text-xl lg:text-2xl text-green-700 font-semibold mb-4",
            DancingScript.className
          )}
        >
          Add New Articles
        </h2>
        <AddArticleForm />
      </div>
    </div>
  );
}

export default page;

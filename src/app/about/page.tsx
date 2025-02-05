import { cn } from "@/lib/utils";
import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
});

const page = () => {
  return (
    <div className={cn("fix-height container m-auto", dancingScript.className)}>
      <h1 className="text-xl font-bold text-gray-800 p-5">About This Page</h1>
      <p>The best web hosting solution for you online success</p>
    </div>
  );
};

export default page;

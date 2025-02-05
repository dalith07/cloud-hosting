"use client";

import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import { Noto_Kufi_Arabic } from "next/font/google";

const kufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["300", "500"],
});

function page() {
  const notify = () => toast.success("success");
  return (
    <div>
      Admin Page
      <p className={kufiArabic.className}>أهلا بالجميع</p>
      <Button onClick={notify}>click button</Button>
      <ToastContainer />
    </div>
  );
}

export default page;

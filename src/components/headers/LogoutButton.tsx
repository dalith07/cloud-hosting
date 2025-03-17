"use client";
import axios from "axios";
import { DOMAIN } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { FaUserXmark } from "react-icons/fa6";

const LogoutButton = () => {
  const router = useRouter();
  const logoutHandler = async () => {
    try {
      await axios.get(`${DOMAIN}/api/users/logout`);
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.warning("Something went wrong");
      console.log(error);
    }
  };

  return (
    <Button onClick={logoutHandler} className="rounded-none rounded-tr-2xl p-8">
      Sign out <FaUserXmark />
    </Button>
  );
};

export default LogoutButton;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import { DOMAIN } from "@/lib/constants";

interface UpdateCommentModalProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  text: string;
  commentId: number;
}

const UpdateCommentModal = ({
  setOpen,
  text,
  commentId,
}: UpdateCommentModalProps) => {
  const [updateText, setUpdateText] = useState(text);
  const router = useRouter();

  const handlerFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (updateText === "") return toast.info("Please write something");
    try {
      await axios.put(`${DOMAIN}/api/comments/${commentId}`, {
        text: updateText,
      });
      console.log("✅✅✅✅", commentId);
      router.refresh();
      setUpdateText("");
      setOpen(false);
      return toast.success("updated success");
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-10 bg-black bg-opacity-80 flex items-center justify-center">
      <div className="w-11/12 lg:w-2/4 bg-white rounded-lg p-3">
        <div className="flex justify-end items-start mb-5">
          <IoMdCloseCircleOutline
            className="text-red-500 cursor-pointer text-3xl 
          hover:animate-pulse"
            onClick={() => setOpen(false)}
          />
        </div>
        <form onSubmit={handlerFormSubmit}>
          <input
            type="text"
            placeholder="Edit Comment..."
            className="text-xl rounded-lg p-2 w-full bg-white mb-2"
            value={updateText}
            onChange={(e) => setUpdateText(e.target.value)}
          />
          <Button type="submit" className="w-full">
            Edit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCommentModal;

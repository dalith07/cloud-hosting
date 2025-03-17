/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { DOMAIN } from "@/lib/constants";

interface AddCommentFormProps {
  articleId: number;
}

const AddCommentForm = ({ articleId }: AddCommentFormProps) => {
  const router = useRouter();
  const [text, setText] = useState("");

  // console.log("😒😒😒", articleId);
  const fromSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text === "") toast.error("Please write something");
    try {
      await axios.post(`${DOMAIN}/api/comments`, { text, articleId });
      router.refresh();
      setText("");
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };
  // console.log({ text });

  return (
    <div>
      <form action="" onSubmit={fromSubmitHandler}>
        <input
          className="rounded-lg text-xl p-2 w-full bg-gray-100 focus:shadow-md"
          type="text"
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button type="submit">Comment</Button>
      </form>
    </div>
  );
};

export default AddCommentForm;

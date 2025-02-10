"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../ui/button";

const AddCommentForm = () => {
  const [text, setText] = useState("");

  const fromSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (text === "") toast.error("Please write somthing");

    console.log({ text });
  };

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

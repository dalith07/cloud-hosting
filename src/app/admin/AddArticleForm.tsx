"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "react-toastify";

const AddArticleForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fromSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (title === "") return toast.error("Title is required");
    if (description === "") return toast.error("Description is required");

    if (title && description) return toast.success("Success");
    // test@gmail.com
    // 12345678
  };

  return (
    <div>
      <form
        action=""
        className="relative flex flex-col"
        onSubmit={fromSubmitHandler}
      >
        <input
          className="mb-4 border-gray-400 rounded p-3 text-xl"
          type="text"
          placeholder="Enter Your Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="mb-4 p-2 lg:text-xl rounded resize-none"
          rows={5}
          placeholder="Enter Your Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <Button type="submit">Add</Button>
      </form>
    </div>
  );
};

export default AddArticleForm;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { DOMAIN } from "@/lib/constants";
import { Article } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface EditArticleFormProps {
  article: Article;
}

const EditArticleForm = ({ article }: EditArticleFormProps) => {
  const router = useRouter();
  const [title, setTitle] = useState(article.title);
  const [description, setDescription] = useState(article.description);

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title === "") return toast.error("Title is required");
    if (description === "") return toast.error("Description is required");
    // next js working Better than react js
    try {
      await axios.put(`${DOMAIN}/api/articles/${article.id}`, {
        title,
        description,
      });
      setTitle("");
      setDescription("");
      toast.success("Article Updated");
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };

  return (
    <div>
      <form className="relative flex flex-col" onSubmit={formSubmitHandler}>
        <input
          className="mb-4 border-gray-400 rounded p-3 text-xl"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="mb-4 p-2 lg:text-xl rounded resize-none"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <Button type="submit">Edit</Button>
      </form>
    </div>
  );
};

export default EditArticleForm;

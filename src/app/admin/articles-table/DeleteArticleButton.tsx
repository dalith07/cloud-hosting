"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DOMAIN } from "@/lib/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, Zoom } from "react-toastify";
interface DeleteArticleButtonProps {
  articleId: number;
}
const DeleteArticleButton = ({ articleId }: DeleteArticleButtonProps) => {
  const router = useRouter();
  const deleteArticleHandler = async () => {
    try {
      if (confirm("You want delete this article, are you sure?")) {
        await axios.delete(`${DOMAIN}/api/articles/${articleId}`);
        router.refresh();
        toast.success("article deleted");
      } else {
        toast.info("Cancel Article Deleted", {
          transition: Zoom,
        });
      }
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };
  return <div onClick={deleteArticleHandler}>Deleted</div>;
};

export default DeleteArticleButton;

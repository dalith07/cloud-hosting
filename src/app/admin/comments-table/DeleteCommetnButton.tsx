"use client";
import { Button } from "@/components/ui/button";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DOMAIN } from "@/lib/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, Zoom } from "react-toastify";
interface DeleteArticleButtonProps {
  commentId: number;
}
const DeleteCommentButton = ({ commentId }: DeleteArticleButtonProps) => {
  const router = useRouter();
  const deleteCommentHandler = async () => {
    try {
      if (confirm("You want delete this comment, are you sure?")) {
        await axios.delete(`${DOMAIN}/api/comments/${commentId}`);
        router.refresh();
        toast.success("comment deleted");
      } else {
        toast.info("Cancel Comment Deleted", {
          transition: Zoom,
        });
      }
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };
  return (
    <div onClick={deleteCommentHandler}>
      <Button variant="destructive">Deleted</Button>
    </div>
  );
};

export default DeleteCommentButton;

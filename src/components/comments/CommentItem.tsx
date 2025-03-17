/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { CommentWithUser } from "@/lib/utils";
import { FaEdit, FaTrash } from "react-icons/fa";
import UpdateCommentModal from "./UpdateCommentModal";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { DOMAIN } from "@/lib/constants";
import { useRouter } from "next/navigation";

interface CommentItemProps {
  comment: CommentWithUser;
  userId: number | undefined; // userId yaani id mtaa user (id l email)
  commentId: number;
}

const CommentItem = ({ comment, userId, commentId }: CommentItemProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Delete comment function
  const commentDeleteHandle = async () => {
    try {
      if (confirm("You Want Delete This Comment, Are You Sure? ❌")) {
        await axios.delete(`${DOMAIN}/api/comments/${commentId}`);
        router.refresh();
        toast.success("Comment deleted successfully");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      console.error(error);
    }
  };

  return (
    <div
      className="mb-5 rounded-lg p-3 bg-gray-200 border-2
     border-gray-300 "
    >
      <div className="flex items-center justify-between mb-2">
        <strong className="text-gray-800 uppercase">
          {comment.user.username}
        </strong>
        <span className="bg-yellow-700 p-2 rounded-lg text-white">
          {new Date(comment.createdAt).toDateString()}
        </span>
      </div>

      <p className="text-gray-800 mb-2">{comment.text}</p>
      {userId && userId === comment.userId && (
        <div className="flex justify-end items-center">
          <FaEdit
            className="text-green-600 text-xl cursor-pointer me-3 animate-bounce"
            onClick={() => setOpen(true)} // on click the icon open updated comment
          />
          <FaTrash
            className="text-red-600 text-xl cursor-pointer animate-bounce"
            onClick={commentDeleteHandle} // Call delete function on click the icon
          />
        </div>
      )}
      {open && (
        <UpdateCommentModal
          setOpen={setOpen}
          text={comment.text}
          commentId={comment.id}
        />
      )}
    </div>
  );
};

export default CommentItem;

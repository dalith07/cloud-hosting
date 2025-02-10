/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const CommentItem = () => {
  const [data, setData] = useState({
    day: new Date().getDay(),
    month: new Date().getMonth(),
    fullyear: new Date().getFullYear(),
  });

  return (
    <div className="mb-5 rounded-lg p-3 bg-gray-200 border-2 border-gray-300">
      <div className="flex items-center justify-between mb-2">
        <strong className="text-gray-800 uppercase">Kira</strong>
        <span className="bg-yellow-700 px-1 rounded-lg text-white ml-1">
          <span>{data.day}</span>/<span>{data.month}</span>/
          <span>{data.fullyear}</span>
        </span>
      </div>
      <p className="text-green-800 mb-2">Thanks for this articles</p>
      <div className="flex justify-center items-center">
        <FaEdit className="text-green-600 text-xl cursor-pointer me-3" />
        <FaTrash className="text-red-600 text-xl cursor-pointer" />
      </div>
    </div>
  );
};

export default CommentItem;

import React from "react";
const pages = [1, 2, 3, 4, 5];

const Pagination = () => {
  return (
    <div className="flex items-center justify-center gap-4 mt-2 mb-10">
      <div
        className="border border-b-gray-700 text-gray-700 py-1
        px-3 font-bold text-xl cursor-pointer hover:bg-green-200 transition"
      >
        Prev
      </div>
      {pages.map((page) => (
        <div
          key={page}
          className="border border-b-gray-700 text-gray-700 py-1
        px-3 font-bold text-xl cursor-pointer hover:bg-gray-200 transition"
        >
          {page}
        </div>
      ))}
      <div
        className="border border-b-gray-700 text-gray-700 py-1
        px-3 font-bold text-xl cursor-pointer hover:bg-green-200 transition"
      >
        Next
      </div>
    </div>
  );
};

export default Pagination;

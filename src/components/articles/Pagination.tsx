import Link from "next/link";
import React from "react";
// const pages = [1, 2, 3, 4, 5];
interface PaginationProps {
  pages: number;
  pageNumber: number;
  route: string;
}

const Pagination = ({ pages, pageNumber, route }: PaginationProps) => {
  const pagesArray: number[] = [];
  for (let i = 1; i <= pages; i++) pagesArray.push(i); // 3 => [1,2,3]

  const prev = pageNumber - 1;
  const next = pageNumber + 1;

  return (
    <div className="flex items-center justify-center gap-4 mt-2 mb-10">
      {/* itha ken pageNumber !== 1 yatba3li link w ithan ken = 1 w a9ll return null */}
      {pageNumber !== 1 && (
        <Link
          href={`${route}?pageNumber=${prev}`}
          className="border border-b-gray-700 text-gray-700 py-1
        px-3 font-bold text-xl cursor-pointer hover:bg-green-100 transition"
        >
          Next
        </Link>
      )}
      <div className="flex items-center justify-center gap-0.5">
        {pagesArray.map((page) => (
          <Link
            href={`${route}?pageNumber=${page}`}
            className={`${
              pageNumber === page ? "bg-green-400" : ""
            } border rounded-3xl border-gray-200 text-gray-700 py-1 px-3 font-bold text-xl cursor-pointer hover:bg-gray-200 transition`}
            key={page}
          >
            {page}
          </Link>
        ))}
      </div>

      {/* itha ken pages ekhir wahd ex 4 w mfamech 5 twali el link null yaani next tetnaha */}
      {pageNumber !== pages && (
        <Link
          href={`${route}?pageNumber=${next}`}
          className="border border-b-gray-700 text-gray-700 py-1
        px-3 font-bold text-xl cursor-pointer hover:bg-green-100 transition"
        >
          Next
        </Link>
      )}
    </div>
  );
};

export default Pagination;

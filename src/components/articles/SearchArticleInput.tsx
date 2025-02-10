"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchArticleInput = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  const fromSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({ searchText });
    router.push(`/articles/search?searchText=${searchText}`);
  };

  return (
    <div>
      <form
        action=""
        className="my-5 w-full md:w-2/3 m-auto"
        onSubmit={fromSubmitHandler}
      >
        <input
          className="w-full p-3 rounded text-xl border-none text-gray-900 "
          type="search"
          placeholder="Search For Articles"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </form>
    </div>
  );
};

export default SearchArticleInput;

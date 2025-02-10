import React from "react";

interface SearchArticlesPageProps {
  searchParams?: { searchText?: string };
}

function page({ searchParams }: SearchArticlesPageProps) {
  return (
    <section className="fix-height container m-auto px-5">
      <h1 className="text-2xl font-bold">
        Search Text Is:{searchParams?.searchText}
      </h1>
    </section>
  );
}

export default page;

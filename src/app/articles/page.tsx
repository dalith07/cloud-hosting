import ArticlesItems from "@/components/articles/ArticleItem";
import Pagination from "@/components/articles/Pagination";
import SearchArticleInput from "@/components/articles/SearchArticleInput";
import { Article } from "@/lib/utils";
import type { Metadata } from "next";

import React from "react";

const ArticlesPage = async () => {
  // delay 3 secondes
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    // next: { revalidate: 50 }, // baad 50 secondes yaweed yamel caching lel api
  });

  const articles: Article[] = await response.json();

  if (!response.ok) {
    throw new Error("Faild to fetch articles ❌");
  }

  return (
    <section className="container m-auto px-5">
      <SearchArticleInput />
      <div className="flex items-center justify-center flex-wrap gap-7">
        {articles.slice(0, 6).map((item) => (
          <ArticlesItems article={item} key={item.id} />
        ))}
      </div>
      <Pagination />
    </section>
  );
};

export default ArticlesPage;

export const metadata: Metadata = {
  title: "Articles Page",
  description: "Articles About Programing",
  icons: {
    icon: "/Half n Half E90😈.jpg",
    shortcut: "/custom-pwa-icon.png",
  },
};

import ArticlesItems from "@/components/articles/ArticlesItems";
import { Article } from "@/lib/utils";

import React from "react";

const ErrorPage = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 50 }, // baad 50 secondes yaweed yamel caching lel api
  });

  const articles: Article[] = await response.json();

  if (!response.ok) {
    throw new Error("Faild to fetch articles ❌");
  }

  return (
    <section className="container m-auto px-5">
      <div className="flex items-center justify-center flex-wrap gap-7">
        {articles.map((item) => (
          <ArticlesItems article={item} key={item.id} />
        ))}
      </div>
    </section>
  );
};

export default ErrorPage;

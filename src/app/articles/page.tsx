import { getArticles } from "@/apiCalls/articleApiCall";
import ArticlesItems from "@/components/articles/ArticleItem";
import Pagination from "@/components/articles/Pagination";
import SearchArticleInput from "@/components/articles/SearchArticleInput";
import { ARTICLE_PER_PAGE } from "@/lib/constants";
import prisma from "@/lib/db";
import { Article } from "@prisma/client";
import type { Metadata } from "next";
// interface ArticlePageProps {
//   searchParams: { pageNumber?: string };
// }

interface ArticlePageProps {
  searchParams: Promise<{
    pageNumber: string;
    searchText?: string;
  }>;
}

const ArticlesPage = async ({ searchParams }: ArticlePageProps) => {
  const params = await searchParams;
  const pageNumber = params.pageNumber ?? "1";

  const articles: Article[] = await getArticles(pageNumber);
  const count: number = await prisma.article.count();

  const pages = Math.ceil(count / ARTICLE_PER_PAGE);

  return (
    <section className="container m-auto px-5">
      <SearchArticleInput />
      <div className="block md:hidden">
        <Pagination
          pages={pages}
          pageNumber={parseInt(pageNumber)}
          route="/articles"
        />
      </div>
      <div className="flex items-center justify-center flex-wrap gap-7">
        {articles.map((item) => (
          <ArticlesItems article={item} key={item.id} />
        ))}
      </div>
      <Pagination
        pages={pages}
        pageNumber={parseInt(pageNumber)}
        route="/articles"
      />
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

import { DOMAIN } from "@/lib/constants";
import { SingleArticle } from "@/lib/utils";
import { Article } from "@prisma/client";

// Get Articles Based on pageNumber
export async function getArticles(
  pageNumber: string | undefined
): Promise<Article[]> {
  const response = await fetch(
    `${DOMAIN}/api/articles?pageNumber=${pageNumber}`,
    {
      cache: "no-store",
    }
  );

  // Check response status first
  if (!response.ok) {
    throw new Error("Faild to fetch articles ❌");
  }

  // Only return data if successful
  const articles = await response.json();
  return articles;
}

// Get Articles Count
export async function getArticlesCount(): Promise<number> {
  const response = await fetch(`${DOMAIN}/api/articles/count`, {
    cache: "no-store",
  });

  // Check response status first
  if (!response.ok) {
    throw new Error("Faild to get articles count ❌");
  }

  // Only return data if successful
  const { count } = (await response.json()) as { count: number };
  return count;
}

// Get Articles Based on searchText
export async function getArticlesBasedOnSearch(
  searchText: string
): Promise<Article[]> {
  const response = await fetch(
    `${DOMAIN}/api/articles/search?searchText=${searchText}`
  );

  // Check response status first
  if (!response.ok) {
    throw new Error("Faild to fetch articles ❌");
  }

  // Only return data if successful
  return response.json();
}

// Get single article by id
export async function getSingleArticle(
  articleId: string
): Promise<SingleArticle> {
  const response = await fetch(`${DOMAIN}/api/articles/${articleId}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch article");
  }

  return await response.json();
}

import { Article, Comment, User as PrismaUser } from "@prisma/client";

export function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

// export type Article = {
//   id: number;
//   userId: number;
//   title: string;
//   body: string;
// };
export type User = PrismaUser;
// type Person = { name: string; age: number };
// type Studuent = { studuent: number };
// type x = Person & Studuent;
export type CommentWithUser = Comment & { user: User };

export type SingleArticle = Article & { comments: CommentWithUser[] };

export type JWTPayload = {
  id: number;
  isAdmin: boolean;
  username: string;
};

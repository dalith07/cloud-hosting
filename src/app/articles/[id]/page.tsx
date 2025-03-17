import { getSingleArticle } from "@/apiCalls/articleApiCall";
import AddCommentForm from "@/components/comments/AddCommentForm";
import CommentItem from "@/components/comments/CommentItem";
import { SingleArticle } from "@/lib/utils";
import { verifyTokenFroPage } from "@/lib/verifyToken";
import { cookies } from "next/headers";

interface SingleArticlePageProps {
  params: Promise<{ id: string }>;
}

const SingleArticlePage = async ({ params }: SingleArticlePageProps) => {
  const token = (await cookies()).get("jwtToken")?.value || "";
  const payload = verifyTokenFroPage(token);

  await new Promise((resolve) => setTimeout(resolve, 5000));

  const article: SingleArticle = await getSingleArticle((await params).id);

  return (
    <section className="fix-height container m-auto w-full px-5 pt-8 md:w-3/4">
      <div className="bg-gray-200 p-7 rounded-lg mb-7">
        <h1 className="text-xl font-bold text-gray-700 mb-2">
          {article.title}
        </h1>
        <div className="text-gray-400">
          {new Date(article.createdAt).toDateString()}
        </div>
        <p className="text-gray-800 text-xl mt-5">{article.description}</p>
      </div>
      <div>
        {payload ? (
          <AddCommentForm articleId={article.id} />
        ) : (
          <p className="md:text-xl font-semibold text-blue-600">
            to write a comment you should log in first
          </p>
        )}
      </div>
      <h4 className="text-2xl text-gray-800 ps-1 font-semibold mb-2 mt-7">
        Comments
      </h4>
      {article.comments ? (
        <>
          {article.comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              userId={payload?.id}
              commentId={comment.id}
            />
          ))}
        </>
      ) : (
        <span className="text-xl font-semibold text-red-600 animate-pulse">
          Articles Nothing
        </span>
      )}
    </section>
  );
};

export default SingleArticlePage;

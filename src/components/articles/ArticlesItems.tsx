import { Article } from "@/lib/utils";
import Link from "next/link";

interface ArticlesItemsProps {
  article: Article;
}

const ArticlesItems = ({ article }: ArticlesItemsProps) => {
  return (
    <div
      key={article.id}
      className="p-5 rounded-lg my-1 shadow-lg 
          border-2 border-gray-400 hover:cursor-pointer hover:bg-slate-200 w-full 
          md:w-2/5 lg:w-1/4"
    >
      <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
        {article.title}
      </h3>
      <p className="my-2 text-xl text-gray-700 p-1 line-clamp-1 ">
        {article.body}
      </p>
      <Link
        href={`/articles/${article.id}`}
        className="text-xl bg-purple-700 hover:bg-purple-800 w-full
              block text-center p-1 text-white rounded-lg"
      >
        Read More
      </Link>
    </div>
  );
};

export default ArticlesItems;

// import { getArticles, getArticlesCount } from "@/apiCalls/articleApiCall";
// import Pagination from "@/components/articles/Pagination";
// import { Button } from "@/components/ui/button";
// import { ARTICLE_PER_PAGE } from "@/lib/constants";
// import { verifyTokenFroPage } from "@/lib/verifyToken";
// import { Article } from "@prisma/client";
// import { cookies } from "next/headers";
// import Link from "next/link";
// import { redirect } from "next/navigation";
// import { AiFillEdit } from "react-icons/ai";
// import { RiDeleteBin6Fill } from "react-icons/ri";
// import DeleteArticleButton from "./DeleteArticleButton";

// interface AdminArticlesTableProps {
//   searchParams: { pageNumber: string };
// }

// const AdminArticlesTable = async ({
//   searchParams,
// }: AdminArticlesTableProps) => {
//   const token = (await cookies()).get("jwtToken")?.value;
//   if (!token) redirect("/");

//   const payload = verifyTokenFroPage(token);
//   if (payload?.isAdmin === false) redirect("/");
//   // const { pageNumber } = searchParams;
//   const pageNumber = searchParams.pageNumber || "1";
//   // console.log("hhhhhhhhh", pageNumber);

//   const articles: Article[] = await getArticles(pageNumber);
//   const count: number = await getArticlesCount();

//   // 18 / 6 + = 3 PAGES, 24 / 6 = 4 PAGES, 12 / 6 = 2 PAGES
//   const pages = Math.ceil(count / ARTICLE_PER_PAGE); // ex 25 / 6 = 4.1 kk lazem nhothomf math.ceil(..) bech yatini integer

//   return (
//     <section className="p-5">
//       <h1 className="mb-7 text-2xl font-semibold text-gray-700">Articles</h1>
//       <table className="table w-full text-left">
//         <thead className="border-t-2 border-b-2 border-gray-500 lg:text-xl">
//           <tr>
//             <th className="p-1 lg:p-2">Title</th>
//             <th className="hidden lg:inline-block">Created At</th>
//             <th>Actions</th>
//             <th className="hidden lg:inline-block"></th>
//           </tr>
//         </thead>
//         <tbody>
//           {articles.map((articles) => (
//             <tr key={articles.id} className="border-b border-t border-gray-300">
//               <td className="p-3 text-gray-700">{articles.title}</td>
//               <td className="hidden lg:inline-block text-gray-700 font-normal p-3">
//                 {new Date(articles.createdAt).toDateString()}
//               </td>
//               <td className="p-3">
//                 <Button className="mr-2">
//                   <Link
//                     href={`/admin/articles-table/edit/${articles.id}`}
//                     className="flex items-center gap-2"
//                   >
//                     Edit
//                     <AiFillEdit className="transition-transform duration-800 animate-bounce" />
//                   </Link>
//                 </Button>

//                 <Button
//                   variant="destructive"
//                   className="flex items-center gap-2"
//                 >
//                   <DeleteArticleButton articleId={articles.id} />
//                   <RiDeleteBin6Fill className="transition-transform duration-800 animate-bounce" />
//                 </Button>
//               </td>
//               <td className="hidden lg:block">
//                 <Button className="text-white mt-3">
//                   <Link href={`/articles/${articles.id}`}>Read More</Link>
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <Pagination
//         pageNumber={parseInt(pageNumber)}
//         pages={pages}
//         route="/admin/articles-table"
//       />
//     </section>
//   );
// };

// export default AdminArticlesTable;

import { getArticles } from "@/apiCalls/articleApiCall";
import Pagination from "@/components/articles/Pagination";
import { Button } from "@/components/ui/button";
import { ARTICLE_PER_PAGE } from "@/lib/constants";
import { verifyTokenFroPage } from "@/lib/verifyToken";
import { Article } from "@prisma/client";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";
import DeleteArticleButton from "./DeleteArticleButton";
import prisma from "@/lib/db";

interface AdminArticlesTableProps {
  searchParams: Promise<{
    pageNumber: string | undefined;
  }>;
}

const AdminArticlesTable = async ({
  searchParams,
}: AdminArticlesTableProps) => {
  const token = (await cookies()).get("jwtToken")?.value;

  if (!token) {
    return redirect("/");
  }

  const payload = verifyTokenFroPage(token);
  if (payload?.isAdmin === false) {
    return redirect("/");
  }

  const { pageNumber } = await searchParams;
  const currentPage = parseInt(pageNumber || "1", 10);

  const articles: Article[] = await getArticles(currentPage.toString());
  const count: number = await prisma.article.count();
  const totalPages = Math.ceil(count / ARTICLE_PER_PAGE);

  return (
    <section className="p-5">
      <h1 className="mb-7 text-2xl font-semibold text-gray-700">Articles</h1>
      <table className="table w-full text-left">
        <thead className="border-t-2 border-b-2 border-gray-500 lg:text-xl">
          <tr>
            <th className="p-1 lg:p-2">Title</th>
            <th className="hidden lg:inline-block">Created At</th>
            <th>Actions</th>
            <th className="hidden lg:inline-block"></th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id} className="border-b border-t border-gray-300">
              <td className="p-3 text-gray-700">{article.title}</td>
              <td className="hidden lg:inline-block text-gray-700 font-normal p-3">
                {new Date(article.createdAt).toDateString()}
              </td>
              <td className="p-3">
                <Button className="mr-2">
                  <Link
                    href={`/admin/articles-table/edit/${article.id}`}
                    className="flex items-center gap-2"
                  >
                    Edit
                    <AiFillEdit className="transition-transform duration-800 animate-bounce" />
                  </Link>
                </Button>

                <Button
                  variant="destructive"
                  className="flex items-center gap-2"
                >
                  <DeleteArticleButton articleId={article.id} />
                  <RiDeleteBin6Fill className="transition-transform duration-800 animate-bounce" />
                </Button>
              </td>
              <td className="hidden lg:block">
                <Button className="text-white mt-3">
                  <Link href={`/articles/${article.id}`}>Read More</Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        pageNumber={currentPage}
        pages={totalPages}
        route="/admin/articles-table"
      />
    </section>
  );
};

export default AdminArticlesTable;

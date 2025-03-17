// "use lient ";
// import { getArticlesBasedOnSearch } from "@/apiCalls/articleApiCall";
// import ArticleItem from "@/components/articles/ArticleItem";
// import { Button } from "@/components/ui/button";

// import { Article } from "@prisma/client";
// import Link from "next/link";
// interface SearchArticlesPageProps {
//   searchParams: { searchText: string };
// }

// async function page({ searchParams: { searchText } }: SearchArticlesPageProps) {
//   const articles: Article[] = await getArticlesBasedOnSearch(searchText);

//   return (
//     <section className="fix-height container m-auto px-5">
//       {articles.length === 0 ? (
//         <div className="flex items-center justify-center h-[100vh]">
//           <div
//             className="bg-indigo-900 p-4 w-2/4 text-center text-white
//           rounded-xl border-2 border-gray-500 shadow-lg"
//           >
//             <h2 className="text-2xl font-semibold p-5">
//               Articles Based On
//               <span className="text-red-500 mx-3 block animate-pulse">
//                 {searchText}
//               </span>
//               Not Found
//             </h2>
//           </div>
//         </div>
//       ) : (
//         <>
//           <h1 className="text-2xl font-bold mb-2 mt-7 text-gray-800">
//             Articles based on
//             <span className="mx-2 text-red-500 text-2xl font-bold border-double	border-b-4 border-green-500">
//               {searchText}
//             </span>
//             <Link href="/articles?pageNumber=1">
//               <Button>Back</Button>
//             </Link>
//           </h1>

//           <div className="flex items-center justify-center flex-wrap gap-7">
//             {articles.map((item) => (
//               <ArticleItem key={item.id} article={item} />
//             ))}
//           </div>
//         </>
//       )}
//     </section>
//   );
// }

// export default page;

// // "use client"; // This makes it a client component
// // import React from "react";
// // import { useSearchParams } from "next/navigation";

// // function Page() {
// //   const searchParams = useSearchParams();
// //   const searchText = searchParams.get("searchText");

// //   return (
// //     <section className="fix-height container m-auto px-5">
// //       <h1 className="text-2xl font-bold">
// //         Search Text Is: {searchText ?? "No Search Text"}
// //       </h1>
// //     </section>
// //   );
// // }

// // export default Page;

"use client";
import { getArticlesBasedOnSearch } from "@/apiCalls/articleApiCall";
import ArticleItem from "@/components/articles/ArticleItem";
import { Button } from "@/components/ui/button";
import { Article } from "@prisma/client";
import Link from "next/link";

interface SearchArticlesPageProps {
  searchParams: Promise<{ searchText?: string }>;
}

async function page({ searchParams }: SearchArticlesPageProps) {
  const params = await searchParams;
  const searchText = params.searchText ?? "";

  const articles: Article[] = await getArticlesBasedOnSearch(searchText);

  return (
    <section className="fix-height container m-auto px-5">
      {articles.length === 0 ? (
        <div className="flex items-center justify-center h-[100vh]">
          <div className="bg-indigo-900 p-4 w-2/4 text-center text-white rounded-xl border-2 border-gray-500 shadow-lg">
            <h2 className="text-2xl font-semibold p-5">
              Articles Based On
              <span className="text-red-500 mx-3 block animate-pulse">
                {searchText}
              </span>
              Not Found
            </h2>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-2 mt-7 text-gray-800">
            Articles based on
            <span className="mx-2 text-red-500 text-2xl font-bold border-double border-b-4 border-green-500">
              {searchText}
            </span>
            <Link href="/articles?pageNumber=1">
              <Button>Back</Button>
            </Link>
          </h1>

          <div className="flex items-center justify-center flex-wrap gap-7">
            {articles.map((item) => (
              <ArticleItem key={item.id} article={item} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default page;

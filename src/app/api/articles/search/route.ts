/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

/**
 *
 * @method GET
 * @route  ~/api/articles/search?searchText=value
 * @desc   Get Articles By Search Text
 * @access public
 */

export async function GET(request: NextRequest) {
  try {
    const searchText = request.nextUrl.searchParams.get("searchText");
    let articles;
    if (searchText) {
      articles = await prisma.article.findMany({
        where: {
          title: {
            startsWith: searchText, // yatini kol title eli fih value l mech notlbo alih ena
            mode: "insensitive", // 7ases yaani yatini title itha ken minuscule OR majuscule
          },
        },
      });
    } else {
      articles = await prisma.article.findMany({ take: 6 });
    }

    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

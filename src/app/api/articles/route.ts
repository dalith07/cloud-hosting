/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { Article } from "@prisma/client";
import prisma from "@/lib/db";
import { verifyToken } from "@/lib/verifyToken";
import { CreateArticleDto } from "@/lib/dtos";
import { createArtcilesSchema } from "@/lib/validationShemas";
import { ARTICLE_PER_PAGE } from "@/lib/constants";

/**
 *  @method  GET
 *  @route   ~/api/articles
 *  @desc    Get Articles By Page Number
 *  @access  public
 */
export async function GET(request: NextRequest) {
  try {
    const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1"; // now 2

    const articles = await prisma.article.findMany({
      skip: ARTICLE_PER_PAGE * (parseInt(pageNumber) - 1), // 1 -> 6
      take: ARTICLE_PER_PAGE, // take yaani jibli 6 article
      // skip: 6, // yaani otreek 6 lowela
      // take: 6, // yaani jibli 6 article eli baad 6 lwelaa
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

/**
 *  @method  POST
 *  @route   ~/api/articles
 *  @desc    Create New Article
 *  @access  private (only admin can create article)
 */
export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: "only admin, access denied" },
        { status: 403 }
      );
    }

    const body = (await request.json()) as CreateArticleDto;

    const validation = createArtcilesSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const newArticle: Article = await prisma.article.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

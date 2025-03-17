/* eslint-disable @typescript-eslint/no-unused-vars */
import { UpdateArticleDto } from "@/lib/dtos";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifyToken } from "@/lib/verifyToken";

// interface Props {
//   params: { id: string };
// }

interface Props {
  params: Promise<{ id: string }>; // ✅ Ensure `params` is a Promise
}

// (:id) no9atiin 9bal id yaani dynamic route

/**
 * @method  GET
 * @route   ~/api/articles/:id
 * @desc    Get Single Article By Id
 * @access  public
 */

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const article = await prisma.article.findUnique({
      // where: { id: parseInt(params.id) },
      where: { id: parseInt((await params).id) },
      include: {
        // comments: true, // yaani jibli single article maa kol comment
        comments: {
          include: {
            // yjibli user w men user yatini ken username w email
            user: {
              select: { username: true, email: true },
            },
          },
          orderBy: {
            // fi default asc w asc yaani yatini el 9dom hata lin yousel l ajded wahda
            createdAt: "desc", //yatini men jdid lel 9dim
          },
        },
      },
    });

    if (!article) {
      return NextResponse.json(
        { message: "article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

// (:id) no9atiin 9bal id yaani dynamic route
/**
 *
 * @method PUT
 * @route  ~/api/:id
 * @desc   Update Article
 * @access private (only admin can update article)
 */

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const user = verifyToken(request);
    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: "only admin, access denied" },
        { status: 403 }
      );
    }
    const article = await prisma.article.findUnique({
      // findFirst yjib single object nestamlo findFirst w9tali y3od adna zoz nafes l id or title
      // findUnique yjib single object nestamlo findUnique w9tali y3od adna id
      where: { id: parseInt((await params).id) },
    });
    if (!article) {
      return NextResponse.json(
        { message: "article not found" },
        { status: 404 }
      );
    }

    const body = (await request.json()) as UpdateArticleDto;
    const updatedArticle = await prisma.article.update({
      where: { id: parseInt((await params).id) },
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(updatedArticle, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

// (:id) no9atiin 9bal id yaani dynamic route
/**
 *
 * @method DELETE
 * @route  ~/api/:id
 * @desc   DELETE Article
 * @access private (only admin can delete article)
 */

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const user = verifyToken(request);
    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: "only admin, access denied" },
        { status: 403 }
      );
    }
    const article = await prisma.article.findUnique({
      where: { id: parseInt((await params).id) },
      include: {
        comments: true,
      },
    });

    if (!article) {
      return NextResponse.json(
        { message: "article not found" },
        { status: 404 }
      );
    }

    // deleting the article
    await prisma.article.delete({
      where: { id: parseInt((await params).id) },
    });

    // @Todo - deleting the comments that belong to this article
    const commentIds: number[] = article?.comments.map((comment) => comment.id);
    await prisma.comment.deleteMany({
      where: { id: { in: commentIds } },
    });

    return NextResponse.json({ message: "article deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

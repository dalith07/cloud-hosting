/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";
import { verifyToken } from "@/lib/verifyToken";
import { CreateCommentDto } from "@/lib/dtos";
import { createCommentSchema } from "@/lib/validationShemas";

/**
 * @method POST
 * @route  ~/api/comments
 * @desc   Create New Comment
 * @access private (Only logged in user)
 */

export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { message: "only logged in user, access denied" },
        { status: 401 }
      );
    }

    const body = (await request.json()) as CreateCommentDto;

    const validtion = createCommentSchema.safeParse(body);
    if (!validtion.success) {
      return NextResponse.json(
        { message: validtion.error.errors[0].message },
        { status: 400 }
      );
    }

    const newComment = await prisma.comment.create({
      data: {
        text: body.text,
        articleId: body.articleId,
        userId: user.id,
      },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @method GET
 * @route  ~/api/comments
 * @desc   Get ALL Comments
 * @access private (Only Admin)
 */

export async function GET(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: "only admin, access denied" },
        { status: 403 }
      );
    }

    const comments = await prisma.comment.findMany();

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

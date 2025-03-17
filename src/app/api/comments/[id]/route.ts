/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from "@/lib/db";
import { UpdateCommentDto } from "@/lib/dtos";
import { verifyToken } from "@/lib/verifyToken";
import { NextResponse, NextRequest } from "next/server";

// interface Props {
//   params: { id: string };
// }

interface Props {
  params: Promise<{ id: string }>; // ✅ Ensure `params` is a Promise
}

/**
 * @method PUT
 * @route  ~/api/comments/:id
 * @desc   Update Comment
 * @access private (Only owner od the comment)
 */

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt((await params).id) },
    });

    if (!comment) {
      return NextResponse.json(
        { message: "comment not found" },
        { status: 404 }
      );
    }

    const user = verifyToken(request);
    if (user === null || user.id !== comment.userId) {
      return NextResponse.json(
        { message: "you are not allowed, access denied" },
        { status: 403 }
      );
    }

    const body = (await request.json()) as UpdateCommentDto;

    const updateComment = await prisma.comment.update({
      where: { id: parseInt((await params).id) },
      data: {
        text: body.text,
      },
    });

    return NextResponse.json(updateComment, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @method DELETE
 * @route  ~/api/comments/:id
 * @desc   Delete Comment
 * @access private (Only admin OR owner od the comment)
 */
export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt((await params).id) },
    });

    if (!comment) {
      return NextResponse.json(
        { message: "comment not found" },
        { status: 404 }
      );
    }

    const user = verifyToken(request);
    if (user === null) {
      return NextResponse.json(
        { message: "no token provided, access denied" },
        { status: 401 }
      );
    }

    if (user.isAdmin || user.id === comment.userId) {
      await prisma.comment.delete({
        where: { id: parseInt((await params).id) },
      });
      return NextResponse.json({ message: "comment deleted" }, { status: 200 });
    }

    return NextResponse.json(
      { message: "you are not allowed, access denied" },
      { status: 403 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

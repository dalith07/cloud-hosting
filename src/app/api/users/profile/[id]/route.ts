/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";
import { verifyToken } from "@/lib/verifyToken";
import { UpdateUserDto } from "@/lib/dtos";
import bcrypt from "bcryptjs";
import { updateUserSchema } from "@/lib/validationShemas";

// interface Props {
//   params: { id: string };
// }

interface Props {
  params: Promise<{ id: string }>; // ✅ Ensure `params` is a Promise
}

// Authorization yaani user ynajem yamel delete lel compte mtaaou laken mynjmech yamel delete l compte user okhir

/**
 *
 * @method DELETE
 * @route  ~/api/users/profile/:id
 * @desc   Delete Profile
 * @access private (only user himself can delete his account)
 */

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt((await params).id) },
      include: { comments: true },
    });
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 400 });
    }

    // deleting the user
    const userFromToken = verifyToken(request);
    if (userFromToken !== null && userFromToken.id === user.id) {
      await prisma.user.delete({
        where: { id: parseInt((await params).id) },
      });

      // deleting the comment that belong to this user
      const commentIds: number[] = user?.comments.map((coment) => coment.id);
      await prisma.comment.deleteMany({ where: { id: { in: commentIds } } });

      return NextResponse.json(
        { message: "your profile (account) has been deleted" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "only user himslef can delete his profile, fo forbidden" },
      { status: 403 } // forbidden
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error sorry" },
      { status: 500 }
    );
  }
}

// GET
/**
 *
 * @method GET
 * @route  ~/api/users/profile/:id
 * @desc   Get Profile By id
 * @access private (only user himself can get his account/profile)
 */

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt((await params).id) },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        isAdmin: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });
    }

    const userFromToken = verifyToken(request);

    if (userFromToken !== null && userFromToken.id !== user.id) {
      return NextResponse.json(
        { message: "your are not allowed, access denied" },
        { status: 403 }
      );
    }

    console.log(user);
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error sorry" },
      { status: 500 }
    );
  }
}

// PUT
/**
 *
 * @method PUT
 * @route  ~/api/users/profile/:id
 * @desc   Update Profile By id
 * @access private (only user himself can update his account/profile)
 */

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt((await params).id) },
    });

    if (!user) {
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });
    }

    const userFromToken = verifyToken(request);
    if (userFromToken !== null && userFromToken.id !== user.id) {
      return NextResponse.json(
        { message: "your are not allowed, access denied" },
        { status: 403 }
      );
    }

    const body = (await request.json()) as UpdateUserDto;
    const validtion = updateUserSchema.safeParse(body);
    if (!validtion.success) {
      return NextResponse.json(
        { message: validtion.error.errors[0].message },
        { status: 400 }
      );
    }

    if (body.password) {
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt((await params).id) },
      data: {
        username: body.username,
        email: body.email,
        passowrd: body.password,
      },

      // The first method
      // select: {
      //   email: true,
      //   username: true,
      //   isAdmin: true,
      //   createdAt: true,
      // },
    });

    // The second method
    const { updatedAt, createdAt, ...other } = updatedUser; // yatini lkol ilaa passowrd

    return NextResponse.json({ ...other }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error sorry" },
      { status: 500 }
    );
  }
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";
import { verifyToken } from "@/lib/verifyToken";

/**
 *
 * @method GET
 * @route  ~/api/users/profile
 * @desc   Get Tout Profile
 * @access private (only user himself can get his account/profile)
 */

export async function GET(request: NextRequest) {
  try {
    // const user = await prisma.user.findUnique({
    //   where: { id: parseInt(params.id) },
    //   select: {
    //     id: true,
    //     email: true,
    //     username: true,
    //     createdAt: true,
    //     isAdmin: true,
    //   },
    // });
    const user = verifyToken(request);
    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: "only admin, access denied" },
        { status: 403 }
      );
    }

    const users = await prisma.user.findMany();

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error sorry" },
      { status: 500 }
    );
  }
}

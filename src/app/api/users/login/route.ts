/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from "@/lib/db";
import { LoginUserDto } from "@/lib/dtos";
import { loginSchema } from "@/lib/validationShemas";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { setCookie } from "@/lib/generateToken";

/**
 *
 * @method POST // yasn3 انشاء
 * @route  ~/api/users/login
 * @desc   Login User [(log In) (Sign In) (تسجيل الدخول)]
 * @access public
 */

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LoginUserDto;
    const validtion = loginSchema.safeParse(body);
    if (!validtion.success) {
      return NextResponse.json(
        { message: validtion.error.errors[0].message },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (!user) {
      return NextResponse.json(
        { message: "invalid email or password" },
        { status: 400 }
      );
    }

    const isPasswordMatch = await bcrypt.compare(body.password, user.passowrd);
    // console.log("👍👍👍👍", isPasswordMatch);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: "invalid email or password" },
        { status: 400 }
      );
    }

    const cookie = setCookie({
      id: user.id,
      isAdmin: user.isAdmin,

      username: user.username,
    });

    return NextResponse.json(
      { message: "Authenticated" },
      { status: 200, headers: { "Set-Cookie": cookie } }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error sorry 🙁" },
      { status: 500 }
    );
  }
}

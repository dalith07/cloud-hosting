/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from "@/lib/db";
import { RegisterUserDto } from "@/lib/dtos";
import { registerSchema } from "@/lib/validationShemas";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { setCookie } from "@/lib/generateToken";

/**
 *
 * @method POST // yasn3 انشاء
 * @route  ~/api/users/register
 * @desc   Create New User [(regisetr) (sign up) (انشاء حساب)]
 * @access public
 */

export async function POST(request: NextRequest) {
  try {
    // Stage 1 => Na5tho bayaneet
    const body = (await request.json()) as RegisterUserDto;
    // console.log("✅ stage 1");

    // Stage 2 => namlo validtion ala bayanet
    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    //  console.log("✅✅ stage 2");

    // Stage 3 => no5tho l user haseeb email
    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });
    //  console.log("✅✅✅ stage 3");

    // Stage 4 => itha ken email mwjoud 9bal return 500
    if (user) {
      return NextResponse.json(
        { message: "This user already registered" },
        { status: 400 }
      );
    }
    // console.log("✅✅✅✅ stage 4");

    // namlo tachfirr lel password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    // Stage 5 => itha ken user null w moch amel email men 9bal namlo create newUser fi db
    const newUser = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        passowrd: hashedPassword,
      },
      select: {
        username: true,
        id: true,
        isAdmin: true,
      },
    });

    // @Todo -> generate JWT Token
    const cookie = setCookie({
      id: newUser.id,
      isAdmin: newUser.isAdmin,
      username: newUser.username,
    });

    // console.log("✅✅✅✅✅ stage 5");
    return NextResponse.json(
      { ...newUser, message: "Registered & Authenticated" },
      {
        status: 201,
        headers: { "Set-Cookie": cookie },
      }
    );
  } catch (error) {
    console.log("❌❌❌❌ stage 6666");
    return NextResponse.json(
      { message: "internal server error sorry" },
      { status: 500 }
    );
  }
}

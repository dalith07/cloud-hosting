/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

// interface Props {
//   params: { id: string };
// }

interface Props {
  params: Promise<{ id: string }>; // ✅ Ensure `params` is a Promise
}

/**
 *
 * @method GET
 * @route  ~/api/user/count
 * @desc   Get User Count
 * @access public
 */

export async function GET(request: NextRequest, { params }: Props) {
  try {
    // const user = await prisma.user.findUnique({
    //   where: { id: parseInt(params.id) },
    // });

    // if (user === null || user.isAdmin === false) {
    //   return NextResponse.json(
    //     { message: "only admin, access denied" },
    //     { status: 403 }
    //   );
    // }

    const count = await prisma.user.count();
    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

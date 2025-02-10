/* eslint-disable @typescript-eslint/no-unused-vars */
import { articles } from "@/lib/data";
import { CreateArticleDto } from "@/lib/dtos";
import { Article } from "@/lib/utils";
import { createArtcilesSchema } from "@/lib/validationShemas";
import { NextRequest, NextResponse } from "next/server";

/**
 *
 * @method GET
 * @route  ~/api
 * @desc   Get All Articles
 * @access public
 */

export function GET(request: NextRequest) {
  return NextResponse.json(articles, { status: 200 });
}

/**
 *
 * @method POST
 * @route  ~/api
 * @desc   Create New Artcile
 * @access public
 */

// yatini el body el mwjoud fel request
export async function POST(request: NextRequest) {
  // creating a schema for strings

  const body = (await request.json()) as CreateArticleDto;

  const validation = createArtcilesSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { message: validation.error.errors[0].message },
      { status: 400 }
    );
  }

  const newArtcile: Article = {
    id: articles.length + 1,
    userId: 200,
    title: body.title,
    body: body.body,
  };
  console.log(body);

  articles.push(newArtcile);
  return NextResponse.json(newArtcile, { status: 201 });
}

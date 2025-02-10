import { articles } from "@/lib/data";
import { UpdateArticleDto } from "@/lib/dtos";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

// (:id) no9atiin 9bal id yaani dynamic route
/**
 *
 * @method GET
 * @route  ~/api/:id
 * @desc   Get Single Article By Id
 * @access public
 */

export function GET(request: NextRequest, { params }: Props) {
  const article = articles.find((a) => a.id === parseInt(params.id));
  if (!article) {
    return NextResponse.json({ message: "article not found" }, { status: 404 });
  }

  return NextResponse.json(article, { status: 200 });
}

// (:id) no9atiin 9bal id yaani dynamic route
/**
 *
 * @method PUT
 * @route  ~/api/:id
 * @desc   Update Article
 * @access public
 */

export async function PUT(request: NextRequest, { params }: Props) {
  const article = articles.find((a) => a.id === parseInt(params.id));
  if (!article) {
    return NextResponse.json({ message: "article not found" }, { status: 404 });
  }

  const body = (await request.json()) as UpdateArticleDto;
  console.log(body);

  return NextResponse.json({ message: "article updated" }, { status: 200 });
}

// (:id) no9atiin 9bal id yaani dynamic route
/**
 *
 * @method DELETE
 * @route  ~/api/:id
 * @desc   DELETE Article
 * @access public
 */

export async function DELETE(request: NextRequest, { params }: Props) {
  const article = articles.find((a) => a.id === parseInt(params.id));
  if (!article) {
    return NextResponse.json({ message: "article not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "article deleted" }, { status: 200 });
}

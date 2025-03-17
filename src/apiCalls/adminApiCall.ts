import { DOMAIN } from "@/lib/constants";
import { Comment } from "@prisma/client";

// Get All Comments
export async function getAllComments(token: string): Promise<Comment[]> {
  const response = await fetch(`${DOMAIN}/api/comments`, {
    headers: {
      cookie: `jwtToken=${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Filed to fetch comments");
  }

  return response.json();
}

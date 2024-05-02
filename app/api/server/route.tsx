import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const queryData = request.nextUrl.searchParams.get("pId");
  // queryData is "hello" for /api/search?query=hello
  //const filePath = `path/to/../../blogdata/${queryData}.json`;

  return new Response("The link returned from the server is: " + queryData);
}

import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const queryDataPId = request.nextUrl.searchParams.get("pId");

  const resData = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${queryDataPId}&key=${process.env.API_KEY}`
  );
  const resJson = await resData.json();
  console.log(resJson);
  return new Response("The link returned from the server is: " + queryDataPId);
}

"use client";

import { ChangeEvent, useState } from "react";
export default function Home() {
  const [url, setUrl] = useState("");
  const [resp, setResp] = useState("");
  const enteringLink = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };
  const linkCheck = async () => {
    console.log(url);

    //Extracting the pId from the link
    const regex = /(?:list=)(.*)/;
    const match = url.match(regex);
    if (match) {
      const playlistId = match[1];

      try {
        const response = await fetch(
          `http://localhost:3000/api/server?pId=${playlistId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            //body: JSON.stringify(data),
          }
        );
        if (response.ok) {
          const responseBody = await response.text();
          setResp(responseBody);
          console.log("Response:", responseBody);
        } else {
          console.error(
            "Failed to submit the PlaylistId:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error submitting the PlaylistId:", error);
      }
    } else {
      console.error("Playlist ID not found in the URL");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <span className="text-xl font-serif text-red-500 font-bold">insYT</span>
      <span>{resp}</span>
      <div className="flex my-2">
        <input
          onChange={enteringLink}
          name="pin"
          className="w-1/2 text-gray-700 bg-gray-200 border border-gray-300 rounded-l py-2 px-4 focus:outline-none"
          type="text"
          placeholder="Enter link here.."
        />
        <button
          onClick={linkCheck}
          className="flex-shrink-0 md:ml-1 bg-red-400 text-white py-2 px-3 focus:outline-none hover:bg-red-600 rounded-r-md"
        >
          Check Details
        </button>
      </div>
    </main>
  );
}

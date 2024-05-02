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
      console.log("Extracted playlist ID:", playlistId);

      //------------------------------------
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
          console.error("Failed to submit form data:", response.statusText);
        }
      } catch (error) {
        console.error("Error submitting form data:", error);
      }
    } else {
      console.error("Playlist ID not found in the URL");
    }
  };

  https: return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      insYT
      <span>{resp}</span>
      <div className="flex my-2">
        <input
          onChange={enteringLink}
          name="pin"
          className="w-1/2 bg-gray-200 border border-gray-300 rounded-l py-2 px-4 focus:outline-none"
          type="text"
          placeholder="Enter link here.."
        />
        <button
          onClick={linkCheck}
          className="flex-shrink-0 md:ml-4 bg-red-400 text-white py-2 px-3 focus:outline-none hover:bg-red-600 rounded-md"
        >
          Check Details
        </button>
      </div>
    </main>
  );
}

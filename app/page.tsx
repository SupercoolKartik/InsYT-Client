"use client";

import { useState, ChangeEvent, useEffect, FormEvent } from "react";
export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [url, setUrl] = useState("");
  //const [dur, setDur] = useState("");
  const [responseData, setResponseData] = useState<ResponseData | null>(null);

  useEffect(() => {
    //setDur("");
  }, []);

  // Define a type/interface for the response data
  interface ResponseData {
    playlist_name: string;
    playlist_size: number;
    playlist_length: number;
  }
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
  const enteringLink = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };
  const linkCheck = async (event: FormEvent) => {
    event.preventDefault();

    //Extracting the pId from the link
    const regex = /(?:list=)(.*)/;
    const match = url.match(regex);
    if (match) {
      const playlistId = match[1];

      try {
        const response = await fetch(
          `${server_url}/getdetails?pId=${playlistId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.ok) {
          const responseBody = await response.json();
          setResponseData(responseBody);
          console.log("Response:", responseBody);
          // if (responseData?.playlist_length) {
          //   const formatedDuration = formatTime(responseData?.playlist_length);
          //   //setDur(formatedDuration);
          // }
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
    setUrl("");
  };

  //FUNCTION TO FORMAT THE DURATION
  const formatTime = (seconds: number, speed: number) => {
    // Calculate hours, minutes, and seconds
    const adjustedSec = seconds / speed;
    let hours = Math.floor(adjustedSec / 3600);
    let minutes = Math.floor((adjustedSec % 3600) / 60);
    let remainingSeconds = adjustedSec % 60;

    // Initialize an empty array to store the time components
    let timeComponents = [];

    // Add hours, minutes, and seconds to the array if they are not zero
    if (hours > 0) {
      timeComponents.push(hours < 10 ? `0${hours}h ` : `${hours}h `);
    }
    if (minutes > 0 || hours > 0) {
      timeComponents.push(minutes < 10 ? `0${minutes}m ` : `${minutes}m `);
    }
    timeComponents.push(
      remainingSeconds < 10
        ? `0${remainingSeconds.toFixed(0)}s `
        : `${remainingSeconds.toFixed(0)}s `
    );

    return timeComponents;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <span className="text-xl font-serif text-red-500 font-bold">insYT</span>
      <span>{responseData?.playlist_name}</span>
      <span>{responseData?.playlist_size}</span>
      {/* <span>
        {dur}
      </span> */}
      <span>
        {responseData?.playlist_length &&
          formatTime(responseData.playlist_length, 1)}
      </span>
      <span>
        {responseData?.playlist_length &&
          formatTime(responseData.playlist_length, 1.25)}
      </span>
      <span>
        {responseData?.playlist_length &&
          formatTime(responseData.playlist_length, 1.5)}
      </span>
      <span>
        {responseData?.playlist_length &&
          formatTime(responseData.playlist_length, 1.75)}
      </span>
      <span>
        {responseData?.playlist_length &&
          formatTime(responseData.playlist_length, 2)}
      </span>
      <form onSubmit={linkCheck} className="flex my-2">
        <input
          onChange={enteringLink}
          value={url}
          name="pin"
          className="w-1/2 text-gray-700 bg-gray-200 border border-gray-300 rounded-l py-2 px-4 focus:outline-none"
          type="text"
          placeholder="Enter link here.."
        />
        <button
          type="submit"
          className="flex-shrink-0 md:ml-1 bg-red-400 text-white py-2 px-3 focus:outline-none hover:bg-red-600 rounded-r-md"
        >
          Check Details
        </button>
      </form>
    </main>
  );
}

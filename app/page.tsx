"use client";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
export default function Home() {
  const [link, setLink] = useState("");
  const enteringLink = (e: ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };
  const linkCheck = () => {
    console.log(link);
  };

  https: return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      insYT
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

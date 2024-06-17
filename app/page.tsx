"use client";

import { useState } from "react";

import Navbar from "@/components/navbar";

import Footer from "@/components/footer";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
export default function Home() {
  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const [content, setContent] = useState("instructions");
  // Define a type/interface for the response data
  interface ResponseData {
    playlist_name: string;
    playlist_size: number;
    playlist_length: number;
  }

  const formSchema = z.object({
    urlField: z.string().min(2),
  });

  // Defining input form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      urlField: "",
    },
  });

  // Defining submit handler for input form.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setContent("loading");
    const url = values.urlField;
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
          setContent("insights");
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
    // setUrl("");
  }

  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;

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
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex flex-col justify-center items-center overflow-auto text-md md:text-lg mx-5">
        {content === "instructions" && (
          <span className="font-bold text-green-900">
            Enter a playlist link, playlist ID or even a video link from the
            playlist
          </span>
        )}
        {content === "loading" && (
          <span className="font-bold text-green-800">Loading...</span>
        )}
        {content === "insights" && (
          <div className="flex flex-col">
            <span>
              {" "}
              {responseData && `Title: ${responseData?.playlist_name}`}
            </span>
            <span>
              No of items:
              {responseData && ` ${responseData?.playlist_size}`}
            </span>
            <span>
              The playlist is{" "}
              <span className="text-red-600">
                {responseData?.playlist_length &&
                  formatTime(responseData.playlist_length, 1)}
              </span>{" "}
              long
            </span>

            {responseData?.playlist_length && (
              <ul className="mt-5">
                <li>The time it will gonna take you to watch</li>
                <li>
                  At normal speed :{" "}
                  {formatTime(responseData.playlist_length, 1)}
                </li>
                <li>
                  At 1.25x : {formatTime(responseData.playlist_length, 1.25)}
                </li>
                <li>
                  At 1.50x : {formatTime(responseData.playlist_length, 1.5)}
                </li>
                <li>
                  At 1.75x : {formatTime(responseData.playlist_length, 1.75)}
                </li>
                <li>At 2x : {formatTime(responseData.playlist_length, 2)}</li>
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Form + Footer */}
      <div className="form-footer w-full sticky bottom-0 flex flex-col justify-center items-center pt-2 space-y-3 bg-gray-100 dark:bg-gray-900">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              onSubmit(data);
              form.reset(); // Resets the form input data after submission
            })}
            className="flex mx-7 sm:mx-10 md:mx-12"
          >
            <FormField
              control={form.control}
              name="urlField"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Find length of any YouTube playlist:</FormLabel>
                  <div className="flex">
                    <FormControl>
                      <Input
                        className="h-8 sm:h-9 text-xs sm:text-sm md:text-normal focus-visible:ring-red-700 rounded-r-none"
                        placeholder="www.youtube.com/playlist?list=example123..."
                        {...field}
                      />
                    </FormControl>
                    <Button
                      className=""
                      variant="insyt"
                      size="insyt"
                      type="submit"
                    >
                      Analyze
                    </Button>
                  </div>

                  <FormDescription className="text-xs sm:md">
                    You can enter a playlist link, playlist ID or even a video
                    link from the playlist! This only works with playlists with
                    up to 50 videos as of now.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <Footer />
      </div>
    </main>
  );
}

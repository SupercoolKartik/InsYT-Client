"use client";

import { useState, ChangeEvent, useEffect, FormEvent } from "react";

import Navbar from "@/components/ui/navbar";

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
  const [inputValue, setInputValue] = useState("");
  //const [url, setUrl] = useState("");
  //const [dur, setDur] = useState("");
  const [responseData, setResponseData] = useState<ResponseData | null>(null);

  const formSchema = z.object({
    urlField: z.string().min(2),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      urlField: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const url = values.urlField;
    console.log(url);
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
    // setUrl("");
  }

  // useEffect(() => {
  //   //setDur("");
  // }, []);

  // Define a type/interface for the response data
  interface ResponseData {
    playlist_name: string;
    playlist_size: number;
    playlist_length: number;
  }
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
  // const enteringLink = (e: ChangeEvent<HTMLInputElement>) => {
  //   setUrl(e.target.value);
  // };

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
    <main className="flex min-h-screen flex-col items-center justify-between py-24 px-6">
      <Navbar />
      <span> {responseData && `Title: ${responseData?.playlist_name}`}</span>
      <span>
        {responseData && `No of items: ${responseData?.playlist_size}`}
      </span>
      {/* <span>
        {dur}
      </span> */}
      <ul>
        <li>
          {responseData?.playlist_length &&
            formatTime(responseData.playlist_length, 1)}
        </li>
        <li>
          {responseData?.playlist_length &&
            formatTime(responseData.playlist_length, 1.25)}
        </li>
        <li>
          {responseData?.playlist_length &&
            formatTime(responseData.playlist_length, 1.5)}
        </li>
        <li>
          {responseData?.playlist_length &&
            formatTime(responseData.playlist_length, 1.75)}
        </li>
        <li>
          {responseData?.playlist_length &&
            formatTime(responseData.playlist_length, 2)}
        </li>
      </ul>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            onSubmit(data);
            form.reset(); // Reset the form after submission
          })}
          className="flex"
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
                      placeholder="www.youtube.com/playlist?list=example123..."
                      {...field}
                    />
                  </FormControl>
                  <Button type="submit">Analyze</Button>
                </div>

                <FormDescription>
                  You can enter a playlist link, playlist ID or even a video
                  link from the playlist! This only works with playlists with
                  upto 50 videos as of now.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </main>
  );
}

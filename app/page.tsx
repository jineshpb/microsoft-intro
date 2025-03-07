"use client";
import { useEffect, useState } from "react";
import { CircleSlash, MoveLeft, Radio } from "lucide-react";
import RoomScene from "./components/RoomScene";
import Link from "next/link";

export default function Home() {
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const checkStreamStatus = async () => {
      try {
        const response = await fetch("/api/update-stream");
        const data = await response.json();
        setIsLive(!!data.embedUrl);
      } catch (error) {
        console.error("Failed to check stream status:", error);
        setIsLive(false);
      }
    };

    checkStreamStatus();
    const interval = setInterval(checkStreamStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[100dvh]">
      <main className="w-full h-full">
        <div className="absolute flex items-center top-0 left-0 z-10 py-2 px-6 font-jetbrains w-full bg-gradient-to-b from-gray-900 to-transparent justify-between">
          <div className="flex items-center gap-2">
            <Link href="https://jineshb.me">
              <MoveLeft className="w-6 h-6" />
            </Link>
            jineshb.me
          </div>

          {!isLive ? (
            <>
              <div className="flex items-center gap-2 p-4 justify-center">
                <CircleSlash className="animate-pulse text-red-700" />
                Not live
              </div>
            </>
          ) : (
            <div>
              <div className="flex items-center gap-1 p-4 ">
                <Radio className="animate-pulse text-green-700" />
                Live
              </div>
              <div className="absolute flex items-center bottom-0 left-0 z-10 py-2 px-6 font-jetbrains w-full  justify-between text-xs">
                You are watching live from Bangalore.
              </div>
            </div>
          )}
        </div>

        <RoomScene />
      </main>
    </div>
  );
}

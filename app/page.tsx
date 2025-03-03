
import {  CircleSlash, MoveLeft, Radio } from "lucide-react";
import RoomScene from "./components/RoomScene";

export default function Home() {
  return (
    <div className="w-full h-screen">
      <main className="w-full h-full">

        <div className="absolute flex items-center top-0 left-0 z-10 py-2 px-6 font-jetbrains w-full bg-gradient-to-b from-gray-900 to-transparent justify-between">
          <div className="flex items-center gap-2">

          <MoveLeft className="w-6 h-6" />
          jineshb.me
          </div>
        

            {!process.env.NEXT_PUBLIC_YOUTUBE_STREAM_KEY ? (
                  <div className="flex items-center gap-2 p-4 justify-center">
                     <CircleSlash className="animate-pulse text-red-700" /> 
          Not live 
          </div>
            ):(
              <div className="flex items-center gap-1 p-4 items-center">
              <Radio className="animate-pulse text-green-700" /> 
   Live 
   </div>
            )}

         
        </div>

        <RoomScene />

        <div className="absolute flex items-center bottom-0 left-0 z-10 py-2 px-6 font-jetbrains w-full bg-gradient-to-t from-gray-900 to-transparent justify-between">
          You are watching a live stream from Bangalore.
        </div>
      </main>
    </div>
  );
}

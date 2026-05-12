"use client";

import Image from "next/image";
import { playXpClickSound, unlockXpAudio } from "../utils/xpAudio";

type XpLoginScreenProps = {
  onBeginSignIn: () => void;
};

const LOGIN_USER_NAME = "Jinesh";

export const XpLoginScreen = ({ onBeginSignIn }: XpLoginScreenProps) => {
  const handleBeginSignIn = () => {
    unlockXpAudio();
    onBeginSignIn();
  };

  const handleUserKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    handleBeginSignIn();
  };

  const handlePointerDown = () => {
    unlockXpAudio();
    playXpClickSound();
  };

  return (
    <div
      className="flex h-dvh w-full flex-col overflow-hidden bg-[#00309c] font-[Tahoma,Arial,sans-serif] text-white"
      onPointerDown={handlePointerDown}
      onWheel={handleBeginSignIn}
    >
      <div className="min-h-0 flex-1" />

      <div className="h-[450px] items-center flex bg-[radial-gradient(circle_at_18%_8%,#8db2f2_0%,#5b8fdc_34%,#4a7fce_62%,#3b75c8_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] relative">
        <div className="h-1 absolute top-0 left-0 w-full bg-gradient-to-r from-transparent via-white to-transparent" />
        <div className="h-1 absolute bottom-0 left-0 w-full bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
        <div className="mx-auto flex  w-full max-w-[1024px]">
          <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-5 px-8 text-center sm:px-12">
            <Image
              src="/windows-xp-logo.png"
              alt="Microsoft Windows XP"
              width={210}
              height={68}
              className="h-auto w-[210px]"
              priority
            />
            <p className="text-[14px] font-normal tracking-[0.01em] text-white">
              To begin, click your user name
            </p>
          </div>

          <div
            aria-hidden="true"
            className="w-[2px] bg-gradient-to-b from-transparent via-white to-transparent"
          />
          <div className="flex w-[42%] min-w-[260px] items-center justify-center px-8 sm:px-12">
            <button
              type="button"
              aria-label={`Sign in as ${LOGIN_USER_NAME}`}
              onClick={handleBeginSignIn}
              onKeyDown={handleUserKeyDown}
              className="group flex items-start gap-4 rounded-sm border-0 bg-transparent px-3 py-2 text-left text-white transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <div className="overflow-hidden rounded-sm border border-white/80 bg-[#d9e6fb] p-0.5 shadow-[0_1px_2px_rgba(0,0,0,0.45)] transition group-hover:border-white group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.65)]">
                <Image
                  src="/xp/profile-pic.jpg"
                  alt=""
                  width={96}
                  height={96}
                  className="size-24 object-cover"
                  priority
                />
              </div>
              <span className="text-[15px] font-normal">{LOGIN_USER_NAME}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-end">
        <div className="flex items-end justify-between gap-6 text-[11px] leading-4 px-6 pb-4 pt-6">
          <button
            type="button"
            aria-label="Turn off computer"
            className="flex items-center gap-2 border-0 bg-transparent p-0 text-white"
          >
            <Image
              src="/xp-icons/Power.png"
              alt="shutdown"
              width={16}
              height={16}
            />

            <span>Turn off computer</span>
          </button>
          <p className="max-w-[360px] text-right text-white/90">
            After you log on, you can add or change accounts. Just go to Control
            Panel and click User Accounts.
          </p>
        </div>
      </div>
    </div>
  );
};

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { playXpSound, unlockXpAudio } from "../utils/xpAudio";
import { WindowsXpDesktop } from "./WindowsXpDesktop";
import { XpLoginScreen } from "./XpLoginScreen";

const MONITOR_FOCUS_LOCKED_MESSAGE = "monitor-focus-locked";
const SIGN_IN_DELAY_MS = 900;

export const XpSession = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const signInTimerRef = useRef<number | null>(null);
  const hasStartedSignInRef = useRef(false);

  const clearSignInTimer = useCallback(() => {
    if (signInTimerRef.current === null) {
      return;
    }

    window.clearTimeout(signInTimerRef.current);
    signInTimerRef.current = null;
  }, []);

  const beginSignIn = useCallback(() => {
    if (hasStartedSignInRef.current || isLoggedIn) {
      return;
    }

    hasStartedSignInRef.current = true;
    signInTimerRef.current = window.setTimeout(() => {
      setIsLoggedIn(true);
      signInTimerRef.current = null;
    }, SIGN_IN_DELAY_MS);
  }, [isLoggedIn]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type !== MONITOR_FOCUS_LOCKED_MESSAGE) {
        return;
      }

      beginSignIn();
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
      clearSignInTimer();
    };
  }, [beginSignIn, clearSignInTimer]);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    void playXpSound("startup", { once: true });
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <XpLoginScreen onBeginSignIn={beginSignIn} />;
  }

  return <WindowsXpDesktop />;
};

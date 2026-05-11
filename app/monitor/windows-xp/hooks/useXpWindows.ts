"use client";

import { useCallback, useState } from "react";
import {
  DEFAULT_OPEN_WINDOWS,
  XP_WINDOW_DEFINITIONS,
} from "../content/windows";
import type { OpenXpWindowOptions, XpOpenWindow, XpWindowId } from "../types";

const createOpenWindow = (
  id: XpWindowId,
  zIndex: number,
  options?: OpenXpWindowOptions,
): XpOpenWindow => ({
  ...XP_WINDOW_DEFINITIONS[id],
  title: options?.title ?? XP_WINDOW_DEFINITIONS[id].title,
  zIndex,
  viewerPhoto: options?.viewerPhoto,
});

export const useXpWindows = () => {
  const [openWindows, setOpenWindows] = useState<XpOpenWindow[]>(() =>
    DEFAULT_OPEN_WINDOWS.map((id, index) => createOpenWindow(id, index + 1)),
  );
  const [, setTopZIndex] = useState(DEFAULT_OPEN_WINDOWS.length + 1);

  const focusWindow = useCallback((id: XpWindowId) => {
    setTopZIndex((currentZIndex) => {
      const nextZIndex = currentZIndex + 1;
      setOpenWindows((currentWindows) =>
        currentWindows.map((windowItem) =>
          windowItem.id === id
            ? { ...windowItem, zIndex: nextZIndex }
            : windowItem,
        ),
      );
      return nextZIndex;
    });
  }, []);

  const openWindow = useCallback(
    (id: XpWindowId, options?: OpenXpWindowOptions) => {
      setTopZIndex((currentZIndex) => {
        const nextZIndex = currentZIndex + 1;

        setOpenWindows((currentWindows) => {
          const existingWindow = currentWindows.find(
            (windowItem) => windowItem.id === id,
          );

          if (existingWindow) {
            const viewerPhoto = options?.viewerPhoto;

            if (id === "album-viewer" && viewerPhoto) {
              return currentWindows.map((windowItem) =>
                windowItem.id === id
                  ? {
                      ...windowItem,
                      zIndex: nextZIndex,
                      viewerPhoto,
                      title:
                        options?.title ??
                        `${viewerPhoto.filename} - Windows Picture and Fax Viewer`,
                    }
                  : windowItem,
              );
            }

            return currentWindows.map((windowItem) =>
              windowItem.id === id
                ? { ...windowItem, zIndex: nextZIndex }
                : windowItem,
            );
          }

          return [
            ...currentWindows,
            createOpenWindow(id, nextZIndex, options),
          ];
        });

        return nextZIndex;
      });
    },
    [],
  );

  const closeWindow = useCallback((id: XpWindowId) => {
    setOpenWindows((currentWindows) =>
      currentWindows.filter((windowItem) => windowItem.id !== id),
    );
  }, []);

  const moveWindow = useCallback((id: XpWindowId, x: number, y: number) => {
    setOpenWindows((currentWindows) =>
      currentWindows.map((windowItem) =>
        windowItem.id === id ? { ...windowItem, x, y } : windowItem,
      ),
    );
  }, []);

  return {
    openWindows,
    openWindow,
    closeWindow,
    focusWindow,
    moveWindow,
  };
};

"use client";

import { useCallback, useState } from "react";
import {
  DEFAULT_OPEN_WINDOWS,
  XP_WINDOW_DEFINITIONS,
} from "../content/windows";
import type { OpenXpWindowOptions, XpOpenWindow, XpWindowId } from "../types";
import {
  clampWindowToBounds,
  ensurePinnedTopWindow,
  layoutDefaultOpenWindows,
  PINNED_TOP_WINDOW_ID,
} from "../utils/windowLayout";

const createOpenWindow = (
  id: XpWindowId,
  zIndex: number,
  options?: OpenXpWindowOptions,
): XpOpenWindow => ({
  ...XP_WINDOW_DEFINITIONS[id],
  title: options?.title ?? XP_WINDOW_DEFINITIONS[id].title,
  zIndex,
  viewerPhoto: options?.viewerPhoto,
  careerStint: options?.careerStint,
});

const getInitialZIndex = (id: XpWindowId, index: number) => {
  if (id === PINNED_TOP_WINDOW_ID) {
    return DEFAULT_OPEN_WINDOWS.length + 1;
  }

  return index + 1;
};

export const useXpWindows = () => {
  const [openWindows, setOpenWindows] = useState<XpOpenWindow[]>(() =>
    DEFAULT_OPEN_WINDOWS.map((id, index) =>
      createOpenWindow(id, getInitialZIndex(id, index)),
    ),
  );
  const [, setTopZIndex] = useState(DEFAULT_OPEN_WINDOWS.length + 2);

  const updateOpenWindows = useCallback(
    (updater: (currentWindows: XpOpenWindow[]) => XpOpenWindow[]) => {
      setOpenWindows((currentWindows) =>
        ensurePinnedTopWindow(updater(currentWindows)),
      );
    },
    [],
  );

  const focusWindow = useCallback(
    (id: XpWindowId) => {
      setTopZIndex((currentZIndex) => {
        const nextZIndex = currentZIndex + 1;

        updateOpenWindows((currentWindows) =>
          currentWindows.map((windowItem) =>
            windowItem.id === id
              ? { ...windowItem, zIndex: nextZIndex }
              : windowItem,
          ),
        );

        return nextZIndex + 1;
      });
    },
    [updateOpenWindows],
  );

  const openWindow = useCallback(
    (id: XpWindowId, options?: OpenXpWindowOptions) => {
      setTopZIndex((currentZIndex) => {
        const nextZIndex = currentZIndex + 1;

        updateOpenWindows((currentWindows) => {
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

            const careerStint = options?.careerStint;

            if (id === "career-stint" && careerStint) {
              return currentWindows.map((windowItem) =>
                windowItem.id === id
                  ? {
                      ...windowItem,
                      zIndex: nextZIndex,
                      careerStint,
                      title:
                        options?.title ??
                        `${careerStint.label} - ${careerStint.volumeName}`,
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

        return nextZIndex + 1;
      });
    },
    [updateOpenWindows],
  );

  const closeWindow = useCallback((id: XpWindowId) => {
    setOpenWindows((currentWindows) =>
      currentWindows.filter((windowItem) => windowItem.id !== id),
    );
  }, []);

  const moveWindow = useCallback(
    (id: XpWindowId, x: number, y: number, bounds?: { width: number; height: number }) => {
      updateOpenWindows((currentWindows) =>
        currentWindows.map((windowItem) => {
          if (windowItem.id !== id) {
            return windowItem;
          }

          const nextWindow = { ...windowItem, x, y };

          if (!bounds) {
            return nextWindow;
          }

          return clampWindowToBounds(nextWindow, bounds);
        }),
      );
    },
    [updateOpenWindows],
  );

  const relayoutForViewport = useCallback(
    (width: number, height: number) => {
      if (width <= 0 || height <= 0) {
        return;
      }

      setOpenWindows((currentWindows) =>
        ensurePinnedTopWindow(
          layoutDefaultOpenWindows(currentWindows, { width, height }),
        ),
      );
    },
    [],
  );

  return {
    openWindows,
    openWindow,
    closeWindow,
    focusWindow,
    moveWindow,
    relayoutForViewport,
  };
};

import type { XpOpenWindow, XpWindowId } from "../types";

export const PINNED_TOP_WINDOW_ID: XpWindowId = "aboutme-pdf";

const DESKTOP_MARGIN = 16;
const ABOUT_ME_OFFSET_X = 48;
const ABOUT_ME_OFFSET_Y = 48;

export type DesktopBounds = {
  width: number;
  height: number;
};

export const clampWindowToBounds = (
  windowItem: XpOpenWindow,
  bounds: DesktopBounds,
): XpOpenWindow => {
  const maxX = Math.max(0, bounds.width - windowItem.width);
  const maxY = Math.max(0, bounds.height - windowItem.height);

  return {
    ...windowItem,
    x: Math.min(Math.max(0, windowItem.x), maxX),
    y: Math.min(Math.max(0, windowItem.y), maxY),
  };
};

export const layoutDefaultOpenWindows = (
  windows: XpOpenWindow[],
  bounds: DesktopBounds,
): XpOpenWindow[] => {
  const layoutPositions = new Map<XpWindowId, { x: number; y: number }>();

  const aboutMeWindow = windows.find(
    (windowItem) => windowItem.id === "aboutme-pdf",
  );

  if (aboutMeWindow) {
    const positionedAboutMe = clampWindowToBounds(
      {
        ...aboutMeWindow,
        x: ABOUT_ME_OFFSET_X,
        y: ABOUT_ME_OFFSET_Y,
      },
      bounds,
    );

    layoutPositions.set("aboutme-pdf", {
      x: positionedAboutMe.x,
      y: positionedAboutMe.y,
    });
  }

  const browserWindow = windows.find(
    (windowItem) => windowItem.id === "internet-explorer",
  );

  if (browserWindow) {
    const positionedBrowser = clampWindowToBounds(
      {
        ...browserWindow,
        x: bounds.width - browserWindow.width - DESKTOP_MARGIN,
        y: DESKTOP_MARGIN,
      },
      bounds,
    );

    layoutPositions.set("internet-explorer", {
      x: positionedBrowser.x,
      y: positionedBrowser.y,
    });
  }

  return windows.map((windowItem) => {
    const layoutPosition = layoutPositions.get(windowItem.id);

    if (layoutPosition) {
      return {
        ...windowItem,
        ...layoutPosition,
      };
    }

    return clampWindowToBounds(windowItem, bounds);
  });
};

export const ensurePinnedTopWindow = (
  windows: XpOpenWindow[],
): XpOpenWindow[] => {
  const pinnedWindow = windows.find(
    (windowItem) => windowItem.id === PINNED_TOP_WINDOW_ID,
  );

  if (!pinnedWindow) {
    return windows;
  }

  const highestOtherZIndex = windows
    .filter((windowItem) => windowItem.id !== PINNED_TOP_WINDOW_ID)
    .reduce((maxZIndex, windowItem) => Math.max(maxZIndex, windowItem.zIndex), 0);

  const nextPinnedZIndex = highestOtherZIndex + 1;

  if (pinnedWindow.zIndex >= nextPinnedZIndex) {
    return windows;
  }

  return windows.map((windowItem) =>
    windowItem.id === PINNED_TOP_WINDOW_ID
      ? { ...windowItem, zIndex: nextPinnedZIndex }
      : windowItem,
  );
};

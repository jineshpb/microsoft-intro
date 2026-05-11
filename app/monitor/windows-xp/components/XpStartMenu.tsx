import {
  XP_COLORS,
  XP_START_MENU_LEFT,
  XP_START_MENU_RIGHT,
} from "../constants";

import Image from "next/image";

type XpStartMenuProps = {
  isOpen: boolean;
};

export const XpStartMenu = ({ isOpen }: XpStartMenuProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <aside
      aria-label="Start menu"
      className="absolute bottom-12 left-0 z-40 w-[380px] overflow-hidden rounded-t-md border border-[#0a5ec7] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
    >
      <div
        className="flex items-center gap-3 px-4 py-3 text-white relative"
        style={{
          backgroundImage: `linear-gradient(to bottom, ${XP_COLORS.startMenuHeaderDark}, ${XP_COLORS.startMenuHeader})`,
        }}
      >
        <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-b from-white to-transparent opacity-50"></div>
        <Image
          src="/xp/profile-pic.jpg"
          alt="User"
          width={38}
          height={38}
          className="rounded-sm  border-white/80 border-2"
        />
        <div>
          <p className="text-sm font-bold">Jinesh</p>
          <p className="text-xs text-white/90">Windows XP Professional</p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-80"></div>
      </div>

      <div className="grid grid-cols-[1.15fr_0.85fr]">
        <div className="border-r border-[#9ec4ef] bg-white py-2">
          {XP_START_MENU_LEFT.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 px-3 py-1.5 text-[12px] text-slate-900"
            >
              <Image
                src={item.icon}
                alt=""
                width={20}
                height={20}
                aria-hidden="true"
              />
              <span>{item.label}</span>
            </div>
          ))}
          <div className="mt-1 border-t border-[#9ec4ef] px-3 py-2 text-[12px] font-semibold text-[#0b77e3]">
            All Programs
          </div>
        </div>

        <div
          className="py-2"
          style={{ backgroundColor: XP_COLORS.startMenuRight }}
        >
          {XP_START_MENU_RIGHT.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 px-3 py-1.5 text-[12px] text-slate-900"
            >
              <Image
                src={item.icon}
                alt=""
                width={20}
                height={20}
                aria-hidden="true"
              />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="flex items-center justify-end gap-3 px-3 py-2 text-[12px] text-white border-t border-[#234b7f]"
        style={{
          backgroundImage: `linear-gradient(to bottom, ${XP_COLORS.startMenuFooter}, ${XP_COLORS.startMenuFooterDark})`,
        }}
      >
        <div className="flex items-center gap-2">Log Off</div>
        <Image
          src="/xp-icons/Logout.png"
          alt="Log Off"
          width={32}
          height={32}
        />
        <Image src="/xp-icons/Power.png" alt="Log Off" width={32} height={32} />

        <span className="flex items-center gap-2">Turn Off Computer</span>
      </div>
    </aside>
  );
};

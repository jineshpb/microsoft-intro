"use client";

import Image from "next/image";
import { XpWindowChrome } from "../XpExplorerChrome";
import { CAREER_DRIVES, type XpCareerStint } from "../../content/career";

type MyComputerWindowContentProps = {
  onOpenStint: (stint: XpCareerStint) => void;
};

export const MyComputerWindowContent = ({
  onOpenStint,
}: MyComputerWindowContentProps) => {
  const handleOpenStint = (stint: XpCareerStint) => {
    onOpenStint(stint);
  };

  const handleStintKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    stint: XpCareerStint,
  ) => {
    if (event.key !== "Enter") {
      return;
    }

    handleOpenStint(stint);
  };

  return (
    <XpWindowChrome bodyClassName="min-h-0 flex-1 overflow-y-auto bg-white p-3">
      <h3 className="mb-2 text-[11px] font-semibold text-slate-800">
        My career so far
      </h3>
      <div className="space-y-1">
        {CAREER_DRIVES.map((stint) => (
          <button
            key={stint.id}
            type="button"
            aria-label={`Open ${stint.label}`}
            onClick={() => handleOpenStint(stint)}
            onKeyDown={(event) => handleStintKeyDown(event, stint)}
            className="group flex w-full items-center gap-3 rounded-sm border-0 bg-transparent p-1 text-left hover:bg-[#316ac5]"
          >
            <Image
              src="/xp-icons/Local Disk.png"
              alt=""
              width={48}
              height={48}
              aria-hidden="true"
            />
            <div className="min-w-0">
              <p className="text-[12px] font-semibold text-slate-900 group-hover:text-white">
                {stint.label}
              </p>
              <p className="truncate text-[11px] text-slate-600 group-hover:text-white">
                {stint.volumeName}
              </p>
            </div>
          </button>
        ))}
      </div>
    </XpWindowChrome>
  );
};

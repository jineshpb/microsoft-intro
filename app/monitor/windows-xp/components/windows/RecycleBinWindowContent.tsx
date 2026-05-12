import Image from "next/image";
import { RECYCLE_BIN_ITEMS } from "../../content/recycleBin";
import { XpWindowChrome } from "../XpExplorerChrome";

export const RecycleBinWindowContent = () => {
  return (
    <XpWindowChrome
      addressPath="Recycle Bin"
      showNavBar={false}
      bodyClassName="min-h-0 flex-1 overflow-y-auto bg-white p-3"
    >
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
        {RECYCLE_BIN_ITEMS.map((item) => (
          <div
            key={item.id}
            aria-label={`${item.label} (deleted)`}
            className="flex flex-col items-center gap-1 p-1 text-center"
          >
            <div className="flex h-20 w-20 items-center justify-center">
              <Image
                src={item.icon}
                alt=""
                width={40}
                height={40}
                aria-hidden="true"
              />
            </div>
            <span className="max-w-[88px] truncate text-[11px] text-slate-500 line-through">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </XpWindowChrome>
  );
};

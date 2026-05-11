"use client";

import type { XpCareerStint } from "../../content/career";
import { XpWindowChrome } from "../XpExplorerChrome";

type CareerStintWindowContentProps = {
  stint?: XpCareerStint;
};

export const CareerStintWindowContent = ({
  stint,
}: CareerStintWindowContentProps) => {
  if (!stint) {
    return (
      <div className="flex h-full items-center justify-center bg-white p-4 text-center text-[12px] text-slate-700">
        Select a hard drive from My Computer to view details.
      </div>
    );
  }

  return (
    <XpWindowChrome
      isBackDisabled={false}
      bodyClassName="min-h-0 flex-1 overflow-y-auto bg-white p-4"
    >
      <div className="border border-[#7f9db9] bg-[#ece9d8] p-3 text-[12px] text-slate-800">
        <p className="font-semibold">{stint.title}</p>
        <p className="mt-1 text-[11px] text-slate-600">{stint.period}</p>
        <p className="mt-3 leading-5">{stint.summary}</p>
      </div>
    </XpWindowChrome>
  );
};

const CASEY_NEISTAT_NOTE =
  "Casey Neistat has always been an inspiration to me.";

export const XpAssistantNote = () => {
  return (
    <aside
      aria-label="Assistant note"
      className="relative mx-2 mt-2 rounded-sm border border-black bg-[#ffffe1] px-3 py-2 shadow-[1px_1px_0_#fff_inset] before:absolute before:-top-2 before:left-5 before:h-0 before:w-0 before:border-x-8 before:border-b-8 before:border-x-transparent before:border-b-black after:absolute after:-top-[7px] after:left-5 after:h-0 after:w-0 after:border-x-8 after:border-b-8 after:border-x-transparent after:border-b-[#ffffe1]"
    >
      <p className="font-[Tahoma,Arial,sans-serif] text-[11px] leading-4 text-black">
        {CASEY_NEISTAT_NOTE}
      </p>
    </aside>
  );
};

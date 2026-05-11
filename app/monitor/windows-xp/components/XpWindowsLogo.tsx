type XpWindowsLogoProps = {
  className?: string;
};

export const XpWindowsLogo = ({ className }: XpWindowsLogoProps) => {
  return (
    <span
      aria-hidden="true"
      className={`grid h-5 w-5 grid-cols-2 grid-rows-2 gap-px ${className ?? ""}`}
    >
      <span className="bg-[#f25022]" />
      <span className="bg-[#7fba00]" />
      <span className="bg-[#00a4ef]" />
      <span className="bg-[#ffb900]" />
    </span>
  );
};

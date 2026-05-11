import { ABOUT_ME_PARAGRAPHS } from "../../content/profile";

export const AboutMeWindowContent = () => {
  return (
    <div className="h-full overflow-y-auto bg-white p-3 text-[12px] leading-5 text-black">
      {ABOUT_ME_PARAGRAPHS.map((paragraph) => (
        <p key={paragraph} className="mb-3">
          {paragraph}
        </p>
      ))}
    </div>
  );
};

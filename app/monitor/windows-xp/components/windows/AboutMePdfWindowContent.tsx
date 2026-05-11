import Image from "next/image";
import { ABOUT_ME_PDF_INTRO } from "../../content/intro";

const READER_MENU_ITEMS = [
  "File",
  "Edit",
  "View",
  "Document",
  "Tools",
  "Window",
  "Help",
] as const;

export const AboutMePdfWindowContent = () => {
  return (
    <div className="flex h-full flex-col bg-[#808080]">
      <div className="flex items-center gap-3 border-b border-[#aca899] bg-[#ece9d8] px-2 py-0.5 text-[11px] text-slate-900">
        {READER_MENU_ITEMS.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <article className="mx-auto max-w-[440px] bg-[#f4f1e8] px-8 py-10 shadow-[0_2px_10px_rgba(0,0,0,0.28)]">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#6f675d]">
            {ABOUT_ME_PDF_INTRO.subtitle}
          </p>
          <h1 className="mt-2 font-[Georgia,Times_New_Roman,serif] text-[30px] leading-none text-[#1f1b16]">
            {ABOUT_ME_PDF_INTRO.name}
          </h1>
          <div className="my-5 h-px bg-[#c8c0b3]" />

          <div className="grid grid-cols-[132px_1fr] gap-4">
            <figure>
              <div className="overflow-hidden border border-[#8f8578] bg-[#e8e2d6] p-1 shadow-[inset_0_0_0_1px_#fff]">
                <Image
                  src={ABOUT_ME_PDF_INTRO.photoSrc}
                  alt={ABOUT_ME_PDF_INTRO.name}
                  width={120}
                  height={150}
                  className="h-[150px] w-[120px] object-cover"
                  priority
                />
              </div>
              <figcaption className="mt-2 text-[9px] leading-4 text-[#6f675d]">
                {ABOUT_ME_PDF_INTRO.photoCaption}
              </figcaption>
            </figure>

            <div>
              <p className="font-[Georgia,Times_New_Roman,serif] text-[15px] italic leading-6 text-[#2f2a24]">
                {ABOUT_ME_PDF_INTRO.headline}
              </p>
              <ul className="mt-4 space-y-1 text-[10px] uppercase tracking-[0.18em] text-[#5f574d]">
                {ABOUT_ME_PDF_INTRO.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 space-y-4 border-t border-[#c8c0b3] pt-5 font-[Tahoma,Arial,sans-serif] text-[12px] leading-6 text-[#2f2a24]">
            {ABOUT_ME_PDF_INTRO.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
};

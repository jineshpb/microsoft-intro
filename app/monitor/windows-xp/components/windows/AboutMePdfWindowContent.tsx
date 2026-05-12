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
      <div className="flex items-center gap-3   bg-[#ece9d8] px-2 py-0.5 text-[11px] text-slate-900">
        {READER_MENU_ITEMS.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <article className="mx-auto max-w-[490px] flow-root bg-[#f4f1e8] px-10 py-14 shadow-[0_2px_10px_rgba(0,0,0,0.28)]">
          <figure className="float-left m-0 mb-3 mr-4 size-32 [shape-outside:circle(50%)] [shape-margin:0.5rem]">
            <div className="size-full overflow-hidden rounded-full border border-[#8f8578] bg-[#e8e2d6] p-1 shadow-[inset_0_0_0_1px_#fff]">
              <Image
                src={ABOUT_ME_PDF_INTRO.photoSrc}
                alt="Jinesh Bhaskaran"
                width={120}
                height={120}
                className="size-full rounded-full object-cover"
                priority
              />
            </div>
          </figure>

          <p className="font-[Georgia,Times_New_Roman,serif] text-[20px] italic leading-6 text-[#2f2a24]">
            {ABOUT_ME_PDF_INTRO.headline}
          </p>

          <div className="space-y-4 pt-2 font-[Georgia,Times_New_Roman,serif] text-[16px] leading-6 text-[#2f2a24]">
            {ABOUT_ME_PDF_INTRO.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="flex justify-end w-full">
            <Image src="/sign.png" alt="sign" width={150} height={180} />
          </div>
        </article>
      </div>
    </div>
  );
};

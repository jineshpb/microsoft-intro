import { XP_NOTEPAD_MENU_ITEMS } from "../../constants";
import { ABOUT_ME_PARAGRAPHS } from "../../content/profile";
import { XpWindowChrome } from "../XpExplorerChrome";

export const AboutMeWindowContent = () => {
  return (
    <XpWindowChrome
      menuItems={XP_NOTEPAD_MENU_ITEMS}
      showNavBar={false}
      bodyClassName="h-full overflow-y-auto bg-white p-3 text-[12px] leading-5 text-black"
    >
      {ABOUT_ME_PARAGRAPHS.map((paragraph) => (
        <p key={paragraph} className="mb-3">
          {paragraph}
        </p>
      ))}
    </XpWindowChrome>
  );
};

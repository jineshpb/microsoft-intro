import Image from "next/image";
import {
  XP_EXPLORER_MENU_ITEMS,
  XP_EXPLORER_NAVBAR_ITEMS,
  getXpIconPath,
} from "../constants";

type XpMenuItem = {
  label: string;
  icon: string | null;
};

type XpNavbarItem = {
  id: string;
  kind: "button" | "separator";
  label?: string;
  icon?: string | null;
  showLabel?: boolean;
};

type XpWindowContainerProps = {
  children: React.ReactNode;
  className?: string;
};

type XpExplorerMenuBarProps = {
  items?: readonly XpMenuItem[];
};

type XpExplorerNavBarProps = {
  items?: readonly XpNavbarItem[];
  isBackDisabled?: boolean;
  isForwardDisabled?: boolean;
};

type XpExplorerAddressBarProps = {
  path: string;
};

type XpWindowChromeProps = {
  children: React.ReactNode;
  className?: string;
  menuItems?: readonly XpMenuItem[];
  navItems?: readonly XpNavbarItem[];
  showNavBar?: boolean;
  isBackDisabled?: boolean;
  isForwardDisabled?: boolean;
  addressPath?: string;
  bodyClassName?: string;
};

export const XpWindowContainer = ({
  children,
  className = "bg-white",
}: XpWindowContainerProps) => {
  return <div className={`flex h-full flex-col ${className}`}>{children}</div>;
};

export const XpExplorerMenuBar = ({
  items = XP_EXPLORER_MENU_ITEMS,
}: XpExplorerMenuBarProps) => {
  return (
    <div className="flex items-center justify-between border-b border-[#aca899] bg-[#ece9d8] px-2 py-0.5 text-[11px] text-slate-900">
      <div className="flex items-center gap-3">
        {items.map((item) => (
          <span key={item.label} className="flex items-center gap-1">
            {item.icon ? (
              <Image
                src={item.icon}
                alt=""
                width={12}
                height={12}
                aria-hidden="true"
              />
            ) : null}
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export const XpExplorerNavBar = ({
  items = XP_EXPLORER_NAVBAR_ITEMS,
  isBackDisabled = true,
  isForwardDisabled = true,
}: XpExplorerNavBarProps) => {
  const isItemDisabled = (itemId: string) => {
    if (itemId === "back") {
      return isBackDisabled;
    }

    if (itemId === "forward") {
      return isForwardDisabled;
    }

    return false;
  };

  return (
    <div className="flex items-center gap-1 border-b border-[#aca899] bg-gradient-to-b from-[#f7f6f2] to-[#ece9d8] px-2 py-1">
      {items.map((item) => {
        if (item.kind === "separator") {
          return (
            <span
              key={item.id}
              className="mx-1 h-6 w-px bg-[#aca899]"
              aria-hidden="true"
            />
          );
        }

        const isDisabled = isItemDisabled(item.id);

        return (
          <button
            key={item.id}
            type="button"
            aria-label={item.label}
            disabled={isDisabled}
            className={`flex items-center gap-1 rounded-sm px-1 py-0.5 disabled:opacity-50 ${item.showLabel ? "" : ""}`}
          >
            {item.icon ? (
              <Image
                src={getXpIconPath(item.icon)}
                alt=""
                width={24}
                height={24}
                aria-hidden="true"
              />
            ) : null}
            {item.showLabel ? (
              <span className="text-[11px] text-slate-800">{item.label}</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
};

export const XpExplorerAddressBar = ({ path }: XpExplorerAddressBarProps) => {
  return (
    <div className="flex items-center gap-2 border-b border-[#aca899] bg-[#ece9d8] px-2 py-1 text-[11px] text-slate-800">
      <span>Address</span>
      <div className="min-w-0 flex-1 rounded-sm border border-[#7f9db9] bg-white px-2 py-0.5">
        {path}
      </div>
    </div>
  );
};

export const XpWindowChrome = ({
  children,
  className = "bg-white",
  menuItems = XP_EXPLORER_MENU_ITEMS,
  navItems = XP_EXPLORER_NAVBAR_ITEMS,
  showNavBar = true,
  isBackDisabled = true,
  isForwardDisabled = true,
  addressPath,
  bodyClassName = "min-h-0 flex-1 overflow-y-auto bg-white",
}: XpWindowChromeProps) => {
  return (
    <XpWindowContainer className={className}>
      <XpExplorerMenuBar items={menuItems} />
      {showNavBar ? (
        <XpExplorerNavBar
          items={navItems}
          isBackDisabled={isBackDisabled}
          isForwardDisabled={isForwardDisabled}
        />
      ) : null}
      {addressPath ? <XpExplorerAddressBar path={addressPath} /> : null}
      <div className={bodyClassName}>{children}</div>
    </XpWindowContainer>
  );
};

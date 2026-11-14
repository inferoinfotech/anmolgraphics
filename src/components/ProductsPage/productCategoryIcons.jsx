import {
  IconBuilding,
  IconCalendarEvent,
  IconCards,
  IconCircleDot,
  IconCup,
  IconGift,
  IconId,
  IconIdBadge2,
  IconKey,
  IconLayoutGrid,
  IconLink,
  IconMedal,
  IconMouse,
  IconNfc,
  IconPaperclip,
  IconRectangleVertical,
  IconTag,
} from "@tabler/icons-react";

/** Tabler icon components keyed by exact category name (after merge). */
export const CATEGORY_ICON_MAP = {
  All: IconLayoutGrid,
  Attachments: IconPaperclip,
  Badges: IconIdBadge2,
  "Corporate ID Cards": IconBuilding,
  "Exhibitors ID Cards": IconCalendarEvent,
  "Gift Article": IconGift,
  Holders: IconRectangleVertical,
  "ID Cards": IconId,
  Keychain: IconKey,
  Lanyards: IconLink,
  Medals: IconMedal,
  "Membership Cards": IconCards,
  "Mouse Pad": IconMouse,
  Mug: IconCup,
  "RFID Smart Cards": IconNfc,
  YoYo: IconCircleDot,
};

export function CategoryIcon({ name, active }) {
  const Icon = CATEGORY_ICON_MAP[name] || IconTag;
  return (
    <Icon
      size={18}
      stroke={1.75}
      aria-hidden
      className={`shrink-0 ${active ? "text-[#1B6E9C]" : "text-[#5B7283]"}`}
    />
  );
}
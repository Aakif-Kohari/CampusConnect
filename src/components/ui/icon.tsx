import type { LucideIcon } from "lucide-react";
import Star from "lucide-react/dist/esm/icons/star";
import User from "lucide-react/dist/esm/icons/user";
import Bell from "lucide-react/dist/esm/icons/bell";
import Calendar from "lucide-react/dist/esm/icons/calendar";
import Settings from "lucide-react/dist/esm/icons/settings";
import Home from "lucide-react/dist/esm/icons/home";
import Search from "lucide-react/dist/esm/icons/search";
import Heart from "lucide-react/dist/esm/icons/heart";
import MessageCircle from "lucide-react/dist/esm/icons/message-circle";
import Trophy from "lucide-react/dist/esm/icons/trophy";
import Zap from "lucide-react/dist/esm/icons/zap";
import Map from "lucide-react/dist/esm/icons/map";
import BookOpen from "lucide-react/dist/esm/icons/book-open";

const ICON_MAP: Record<string, LucideIcon> = {
  star: Star,
  user: User,
  bell: Bell,
  calendar: Calendar,
  settings: Settings,
  home: Home,
  search: Search,
  heart: Heart,
  "message-circle": MessageCircle,
  trophy: Trophy,
  zap: Zap,
  map: Map,
  "book-open": BookOpen,
};

export function Icon({
  name,
  className,
  size = 16,
}: {
  name: string;
  className?: string;
  size?: number;
}) {
  const Comp = ICON_MAP[name.toLowerCase()] ?? Star;
  return <Comp className={className} size={size} />;
}

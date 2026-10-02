import { cn } from "@/lib/cn";
import { StatusBadge } from "@/components/ui/Badge";
import { FreshnessIndicator } from "@/components/status/FreshnessIndicator";
import { AvailabilityIndicator } from "@/components/status/AvailabilityIndicator";
import { LoadIndicator } from "@/components/status/LoadIndicator";
import { ETAIndicator } from "@/components/status/ETAIndicator";

export interface HospitalCardProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    name: string;
    location: string;
    freshness: "live" | "recent" | "aging" | "stale";
    timestamp: string;
    emergencyLoad: "low" | "moderate" | "high";
    icuLoad: number; // 0-100
    services: string[]; // e.g. ["Cardiac", "Trauma"]
    availableResources?: { [resource: string]: number };
    onlineStatus?: "online" | "offline" | "degraded";
    onClick?: () => void;
  }

/**
 * HospitalCard — a compact hospital summary used in lists and the
 * overview. Restrained, information-dense.
 */
export function HospitalCard({
  className,
  name,
  location,
  freshness,
  timestamp,
  emergencyLoad,
  icuLoad,
  services,
  availableResources,
  onlineStatus = "online",
  onClick,
  ...props
}: HospitalCardProps) {
  const statusLabel =
    onlineStatus === "online" ? "Online" : onlineStatus === "degraded" ? "Degraded" : "Offline";

  return (
    <button
      type="button"
      className={cn(
        "flex",
        "flex-col",
        "gap-2.5",
        "w-full",
        "rounded-lg",
        "border",
        "border-border",
        "bg-surface",
        "p-3",
        "text-left",
        "transition-colors",
        "hover:bg-muted",
        "active:bg-border",
        "focus-visible:outline-hidden",
        "focus-visible:ring-2",
        "focus-visible:ring-primary/20",
        "cursor-pointer",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {props.children}
    </button>
  );
}

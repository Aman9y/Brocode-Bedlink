import { cn } from "@/lib/cn";
import { StatusBadge } from "@/components/ui/Badge";
import { FreshnessIndicator } from "@/components/status/FreshnessIndicator";
import { AvailabilityIndicator } from "@/components/status/AvailabilityIndicator";
import { LoadIndicator } from "@/components/status/LoadIndicator";
import { ETAIndicator } from "@/components/status/ETAIndicator";

export interface HospitalCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
    name: string;
    location: string;
    freshness: "live" | "recent" | "aging" | "stale";
    timestamp: string;
    emergencyLoad: "low" | "moderate" | "high";
    icuLoad: number; // 0-100
    services: string[]; // e.g. ["Cardiac", "Trauma"]
    available+: { [resource: string]: number };
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
  availableLike: availableResources,
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
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="text-sm font-semibold text-text-primary truncate">
            {name}
          </div>
          <div className="text-xs text-text-secondary truncate">
            {location}
          </div>
        </div>
        <StatusBadge status="available">
          {statusLabel}
        </StatusBadge>
      </div>

      <div className="flex items-center gap-2 text-xs text-text-secondary">
        <FreshnessIndicator
          status={freshness}
          timestamp={timestamp}
          showLabel={false}
        />
        <span className="text-border">·</span>
        <LoadIndicator level={emergencyLoad} />
        <span className="text-border">·</span>
        <span className="font-mono">ICU: {icuLoad}%</span>
      </div>

      {services.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {services.slice(0, 3).map((s) => (
            <span
              key={s}
              className="text-xs rounded-full bg-muted px-2 py-0.5 text-text-secondary"
            >
              {s}
            </span>
          ))}
          {services.length > 3 && (
            <span className="text-xs text-text-secondary">
              +{services.length - 3}
            </span>
          )}
        </div>
      )}

      {Object.keys(availableResources ?? {}).length > 0 && (
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          {Object.entries(availableResources).map(([k, v]) => (
            <span key={k} className="flex items-center gap-1">
              <span className="font-semibold text-text-primary">{v}</span>
              <span className="text-text-secondary">{k}</span>
            </span>
          ))}
        </div>
      )}
    </button>
  );
}

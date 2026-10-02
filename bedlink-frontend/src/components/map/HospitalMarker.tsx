import { cn } from "@/lib/cn";
import { Hospital, MapPin } from "lucide-react";
import { StatusBadge } from "@/components/ui/Badge";
import { FreshnessIndicator } from "@/components/status/FreshnessIndicator";

export interface HospitalMarkerProps
  extends React.HTMLAttributes<HTMLDivElement> {
    /** Hospital name for screen readers */
    name: string;
    /** Unique id for the marker */
    id: string;
    /** Short label for the marker tooltip */
    label?: string;
    /** Hospital load */
    load?: "low" | "moderate" | "high";
    /** Data freshness status */
    freshness?: "live" | "recent" | "aging" | "stale";
    /** Data freshness timestamp */
    freshnessTimestamp?: string;
  }

/**
 * HospitalMarker — informative but visually restrained.
 * Icon + small info, never an overly colorful marker.
 */
export function HospitalMarker({
  className,
  name,
  id,
  label,
  load,
  freshness,
  freshnessTimestamp,
  ...props
}: HospitalMarkerProps) {
  const loadLabel = load ?? "moderate";

  return (
    <div
      className={cn(
        "relative",
        "flex",
        "flex-col",
        "items-center",
        "gap-1.5",
        "cursor-pointer",
        "select-none",
        className
      )}
      role="button"
      aria-label={`Hospital ${name}, load ${loadLabel}, ${freshness ?? "unknown"} data`}
      tabIndex={0}
      {...props}
    >
      <div
        className={cn(
          "size-5",
          "rounded-full",
          "flex",
          "items-center",
          "justify-center",
          "border-2",
          "border-border",
          "bg-surface",
          load === "high" && "bg-red-500/20",
          load === "moderate" && "bg-yellow-500/20",
          load === "low" && "bg-green-500/20"
        )}
        aria-hidden="true"
      >
        <Hospital className="size-2.5 text-text-secondary" aria-hidden="true" />
      </div>
      <div className="text-xs font-medium text-text-primary leading-tight">
        {name}
      </div>
      <div className="flex items-center gap-1.5">
        <MapPin className="size-3 text-text-secondary" aria-hidden="true" />
        <span className="text-xs text-text-secondary">{label ?? "Hospital"}</span>
      </div>
      {freshness && freshnessTimestamp && (
        <span className="text-[10px] text-text-secondary">
          <FreshnessIndicator
            status={freshness}
            timestamp={freshnessTimestamp}
            showLabel={false}
          />
        </span>
      )}
    </div>
  );
}

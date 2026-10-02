import { cn } from "@/lib/cn";
import { Calendar } from "lucide-react";

export type FreshnessStatus = "live" | "recent" | "aging" | "stale" | "unknown";

export interface FreshnessIndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement> {
    status: FreshnessStatus;
    timestamp: string; // human readable, e.g. "24 sec ago"
    /** Show the relative-to-now band only, or the full label */
    showLabel?: boolean;
  }

/**
 * FreshnessIndicator — data freshness is a core BedLink feature.
 * Displayed inline wherever availability is shown. Never buried in
 * a tooltip.
 *
 * Bands: LIVE 0–2m | RECENT 2–5m | AGING 5–10m | STALE 10+m
 */
export function FreshnessIndicator({
  className,
  status,
  timestamp,
  showLabel = true,
  ...props
}: FreshnessIndicatorProps) {
  const config = {
    live: {
      label: "LIVE",
      text: "text-available",
      bg: "bg-available-bg",
      border: "border-available-border",
      dot: "bg-available",
    },
    recent: {
      label: "RECENT",
      text: "text-pending",
      bg: "bg-pending-bg",
      border: "border-pending-border",
      dot: "bg-pending",
    },
    aging: {
      label: "AGING",
      text: "text-stale",
      bg: "bg-stale-bg",
      border: "border-stale-border",
      dot: "bg-stale",
    },
    stale: {
      label: "STALE",
      text: "text-unavailable",
      bg: "bg-unavailable-bg",
      border: "border-unavailable-border",
      dot: "bg-unavailable",
    },
    unknown: {
      label: "UNKNOWN",
      text: "text-unknown",
      bg: "bg-unknown-bg",
      border: "border-unknown-border",
      dot: "bg-unknown",
    },
  }[status];

  return (
    <span
      className={cn(
        "inline-flex",
        "items-center",
        "gap-1.5",
        "text-xs",
        "font-semibold",
        "rounded-full",
        "px-2.5",
        "py-1",
        config.bg,
        config.border,
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "size-1.5",
          "rounded-full",
          config.dot
        )}
        aria-hidden="true"
      />
      {showLabel && <>{config.label}</>}
      <span className="text-text-secondary">·</span>
      <span className="text-text-secondary">{timestamp}</span>
      <Calendar className="size-3 text-text-secondary/60" aria-hidden="true" />
    </span>
  );
}

import { cn } from "@/lib/cn";
import { Circle } from "lucide-react";

export type AvailabilityStatus = "available" | "unavailable" | "unknown";

export interface AvailabilityIndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement> {
    status: AvailabilityStatus;
    size?: "sm" | "md" | "lg";
  }

/**
 * AvailabilityIndicator — the single availability bar used across
 * BedLink. Supports three honest states; never forces false data.
 *
 * AVAILABLE / UNAVAILABLE / UNKNOWN
 */
export function AvailabilityIndicator({
  className,
  status,
  size = "md",
  ...props
}: AvailabilityIndicatorProps) {
  const config = {
    available: {
      bar: "bg-available",
      dot: "bg-available",
      track: "bg-available-bg",
      label: "Available",
    },
    unavailable: {
      bar: "bg-unavailable",
      dot: "bg-unavailable",
      track: "bg-unavailable-bg",
      label: "Unavailable",
    },
    unknown: {
      bar: "bg-unknown",
      dot: "bg-unknown",
      track: "bg-unknown-bg",
      label: "Unknown",
    },
  }[status];

  return (
    <span
      className={cn(
        "inline-flex",
        "items-center",
        "gap-1.5",
        "font-medium",
        "text-xs",
        "leading-tight",
        className
      )}
      {...props}
    >
      <Circle
        className={cn(
          "size-2",
          size === "sm" && "size-1.5",
          size === "lg" && "size-2.5",
          config.dot
        )}
        aria-hidden="true"
      />
      <span className={config.label}>{config.label}</span>
    </span>
  );
}

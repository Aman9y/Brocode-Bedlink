import { cn } from "@/lib/cn";
import { StatusBadge } from "@/components/ui/Badge";
import { AvailabilityIndicator } from "@/components/status/AvailabilityIndicator";
import { cn } from "@/lib/cn";

export interface ResourceCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
    /** Resource name, e.g. "ICU" */
    name: string;
    /** Current availability; supports AVAILABLE, UNAVAILABLE, UNKNOWN */
    availability: "available" | "unavailable" | "unknown";
    /** Available count when available */
    available?: number;
    /** Quality/level when available */
    quality?: string;
    /** Show the availability indicator */
    showIndicator?: boolean;
    /** Show the "verify" action when unknown */
    showVerify?: boolean;
  }

/**
 * ResourceCard — a single resource line in the hospital resource
 * block. Supports UNKNOWN state with a "VERIFY AVAILABILITY" path
 * (honest data, not forced).
 */
export function ResourceCard({
  className,
  name,
  availability,
  available,
  quality,
  showIndicator = true,
  showVerify = false,
  ...props
}: ResourceCardProps) {
  return (
    <div
      className={cn(
        "flex",
        "flex-wrap",
        "items-center",
        "justify-between",
        "gap-3",
        "rounded-lg",
        "border",
        "border-border",
        "bg-surface",
        "p-3",
        "transition-colors",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="text-sm font-semibold text-text-primary shrink-0">
          {name}
        </span>
        {showIndicator && (
          <AvailabilityIndicator
            status={availability}
            size="sm"
          />
        )}
        {availability === "available" && available !== undefined && (
          <span className="text-sm font-mono font-bold text-text-primary">
            {available}
          </span>
        )}
        {availability === "unknown" && showVerify && (
          <span className="text-xs text-unknown font-medium">
            Unverified
          </span>
        )}
      </div>
      {(availability === "available" || availability === "unknown") && (
        <button
          type="button"
          className={cn(
            "text-xs",
            "font-semibold",
            "text-unknown",
            "underline",
            "cursor-pointer",
            "transition-colors"
          )}
          onClick={() => {}}
        >
          {availability === "unknown"
            ? "VERIFY AVAILABILITY"
            : "Change"}
        </button>
      )}
    </div>
  );
}

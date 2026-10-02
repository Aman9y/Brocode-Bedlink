import { cn } from "@/lib/cn";
import { Clock, Route } from "lucide-react";

export interface ETAIndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement> {
    /** Estimated time in minutes */
    minutes: number;
    /** Distance in km */
    distance?: number;
    /** Show the route icon or just the clock */
    showRoute?: boolean;
  }

/**
 * ETAIndicator — ETA is a core BedLink display.
 * Shows minutes + km where relevant, always with a clock icon
 * (never color-only).
 */
export function ETAIndicator({
  className,
  minutes,
  distance,
  showRoute = false,
  ...props
}: ETAIndicatorProps) {
  return (
    <span
      className={cn(
        "inline-flex",
        "items-center",
        "gap-2",
        "font-mono",
        "font-semibold",
        "text-sm",
        "text-text-primary",
        className
      )}
      {...props}
    >
      {showRoute ? (
        <>
          <Route className="size-4 text-text-secondary" aria-hidden="true" />
          <span className="text-text-secondary">ETA </span>
          <span className="text-text-primary">{minutes} min</span>
          {distance !== undefined && (
            <>
              <span className="text-border">·</span>
              <span className="text-text-secondary">{distance} km</span>
            </>
          )}
        </>
      ) : (
        <>
          <Clock className="size-4 text-text-secondary" aria-hidden="true" />
          <span className="text-text-secondary">ETA</span>
          <span className="text-text-primary"> {minutes} min</span>
          {distance !== undefined && (
            <>
              <span className="text-border">·</span>
              <span className="text-text-secondary">{distance} km</span>
            </>
          )}
        </>
      )}
    </span>
  );
}

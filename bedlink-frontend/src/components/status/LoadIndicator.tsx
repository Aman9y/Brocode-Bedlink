import { cn } from "@/lib/cn";

export type LoadLevel = "low" | "moderate" | "high" | "critical";

export interface LoadIndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement> {
    level: LoadLevel;
  }

/**
 * LoadIndicator — operational load level. Used for hospital load,
 * emergency load, and ICU load context.
 */
export function LoadIndicator({
  className,
  level,
  ...props
}: LoadIndicatorProps) {
  const config = {
    low: {
      label: "Low",
      text: "text-available",
      bar: "bg-available",
    },
    moderate: {
      label: "Moderate",
      text: "text-pending",
      bar: "bg-pending",
    },
    high: {
      label: "High",
      text: "text-stale",
      bar: "bg-stale",
    },
    critical: {
      label: "Critical",
      text: "text-unavailable",
      bar: "bg-unavailable",
    },
  }[level];

  return (
    <span
      className={cn(
        "inline-flex",
        "items-center",
        "gap-2",
        "font-semibold",
        "text-xs",
        "leading-tight",
        "rounded-full",
        "px-2.5",
        "py-1",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "size-1.5",
          "rounded-full",
          config.bar
        )}
        aria-hidden="true"
      />
      <span className={config.text}>{config.label}</span>
    </span>
  );
}

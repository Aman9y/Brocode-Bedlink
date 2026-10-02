import { cn } from "@/lib/cn";

export interface ConfirmationTimerProps
  extends React.HTMLAttributes<HTMLSpanElement> {
    /** Seconds remaining (0 → expired) */
    seconds: number;
    /** Show hours when > 0 */
    includeHours?: boolean;
    /** Expired state if seconds <= 0 */
    expiredLabel?: string;
  }

/**
 * ConfirmationTimer — operational countdown display.
 * Looks operational, not decorative. Used in the confirmation flow.
 * Purely presentational; a parent holds the real timer.
 */
export function ConfirmationTimer({
  className,
  seconds,
  includeHours = true,
  expiredLabel = "EXPIRED",
  ...props
}: ConfirmationTimerProps) {
  if (seconds <= 0) {
    return (
      <span
        className={cn(
          "inline-flex",
          "items-center",
          "gap-1.5",
          "font-mono",
          "font-bold",
          "text-sm",
          "text-unavailable",
          "rounded-full",
          "px-3",
          "py-1.5",
          "bg-unavailable-bg",
          "border",
          "border-unavailable-border",
          className
        )}
        {...props}
      >
        <Clock className="size-3.5" aria-hidden="true" />
        <span className="text-text-primary">{expiredLabel}</span>
      </span>
    );
  }

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  const fmt = (n: number) => String(n).padStart(2, "0");

  const timeParts = [
    includeHours ? h : null,
    m,
    s,
  ].filter(Boolean) as number[];

  return (
    <span
      className={cn(
        "inline-flex",
        "items-center",
        "gap-1.5",
        "font-mono",
        "font-bold",
        "text-sm",
        "text-text-primary",
        "rounded-full",
        "px-3",
        "py-1.5",
        "border",
        "border-border",
        "bg-surface",
        className
      )}
      {...props}
    >
      <Clock className="size-3.5 text-text-secondary" aria-hidden="true" />
      <span className="text-text-primary">
        {timeParts.map((part) => (
          <span
            key={part}
            className="inline-block"
            aria-label={`${part} ${part === 1 ? "hour" : "minutes"}`}
          >
            {fmt(part)}
          </span>
        ))}
      </span>
    </span>
  );
}

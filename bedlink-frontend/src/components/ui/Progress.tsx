import { cn } from "@/lib/cn";

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value?: number; // 0–100
  max?: number;
  showLabel?: boolean;
}

/**
 * Progress bar — restrained, operational, never animated to the point of
 * distraction. Used for loading states and resource usage.
 */
export function Progress({
  className,
  value = 0,
  max = 100,
  showLabel = false,
  ...props
}: ProgressProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div
      className={cn(
        "w-full",
        "rounded-full",
        "bg-muted",
        "overflow-hidden",
        "h-2",
        className
      )}
      role="progressbar"
      aria-valuenow={Math.round(percent)}
      aria-valuemin={0}
      aria-valuemax={100}
      {...props}
    >
      <div
        className="h-full rounded-full bg-primary/70 transition-all duration-300"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

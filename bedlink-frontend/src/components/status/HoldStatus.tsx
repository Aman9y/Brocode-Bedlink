import { cn } from "@/lib/cn";
import { CircleCheck, CircleX, Clock, Circle } from "lucide-react";

export type HoldState = "held" | "pending" | "expired" | "none";

export interface HoldStatusProps
  extends React.HTMLAttributes<HTMLSpanElement> {
    state: HoldState;
  }

/**
 * HoldStatus — the hold state of a bed/resource.
 * CONFIRMED / BED HELD is the unmistakable state after accept & hold.
 */
export function HoldStatus({
  className,
  state,
  ...props
}: HoldStatusProps) {
  const config = {
    held: {
      icon: CircleCheck,
      text: "text-available",
      label: "BED HELD",
      badge: "bg-available-bg",
    },
    pending: {
      icon: Clock,
      text: "text-pending",
      label: "PENDING",
      badge: "bg-pending-bg",
    },
    expired: {
      icon: CircleX,
      text: "text-unavailable",
      label: "EXPIRED",
      badge: "bg-unavailable-bg",
    },
    none: {
      icon: Circle,
      text: "text-text-secondary",
      label: "NOT HELD",
      badge: "bg-muted",
    },
  }[state];

  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex",
        "items-center",
        "gap-1.5",
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
      <Icon className="size-3.5" aria-hidden="true" />
      <span className="text-text-primary">{config.label}</span>
    </span>
  );
}

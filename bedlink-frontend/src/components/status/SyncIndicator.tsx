import { cn } from "@/lib/cn";
import { CheckCircle, Circle, Clock } from "lucide-react";

export type SyncState = "synced" | "syncing" | "pending";

export interface SyncIndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement> {
    state: SyncState;
    message?: string; // "SYNCED ✓" / "12 sec ago"
  }

/**
 * SyncIndicator — PWA sync status. When offline: "LOCAL UPDATE SAVED — Waiting for connection…"
 */
export function SyncIndicator({
  className,
  state,
  message,
  ...props
}: SyncIndicatorProps) {
  const config = {
    synced: {
      icon: CheckCircle,
      text: "text-available",
      label: "SYNCED ✓",
      dot: "bg-available",
    },
    syncing: {
      icon: Circle,
      text: "text-pending",
      label: "SYNCING",
      dot: "bg-pending",
      pulse: true,
    },
    pending: {
      icon: Clock,
      text: "text-unknown",
      label: "PENDING",
      dot: "bg-unknown",
      pulse: true,
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
        config.text,
        className
      )}
      {...props}
    >
      <Icon
        className={cn(
          "size-3.5",
          config.pulse && "pulse-soft"
        )}
        aria-hidden="true"
      />
      <span className="text-text-primary">{config.label}</span>
      {message && (
        <>
          <span className="text-text-secondary">·</span>
          <span className="text-text-secondary">{message}</span>
        </>
      )}
    </span>
  );
}

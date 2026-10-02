import { cn } from "@/lib/cn";
import { CircleCheck, CircleX, Clock, AlertTriangle, Phone, Circle } from "lucide-react";

export type OfferState = "sent" | "accepted" | "rejected" | "timeout" | "none";

export interface OfferStatusProps
  extends React.HTMLAttributes<HTMLSpanElement> {
    state: OfferState;
  }

/**
 * OfferStatus — the state of a hospital offer (the "confirmation flow").
 */
export function OfferStatus({
  className,
  state,
  ...props
}: OfferStatusProps) {
  const config = {
    sent: {
      icon: Clock,
      text: "text-pending",
      label: "OFFER SENT",
      badge: "bg-pending-bg",
    },
    accepted: {
      icon: CircleCheck,
      text: "text-available",
      label: "ACCEPTED",
      badge: "bg-available-bg",
    },
    rejected: {
      icon: CircleX,
      text: "text-unavailable",
      label: "REJECTED",
      badge: "bg-unavailable-bg",
    },
    timeout: {
      icon: AlertTriangle,
      text: "text-stale",
      label: "TIMEOUT",
      badge: "bg-stale-bg",
    },
    none: {
      icon: Circle,
      text: "text-text-secondary",
      label: "NO OFFER",
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

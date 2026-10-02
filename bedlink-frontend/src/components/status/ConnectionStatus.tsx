import { cn } from "@/lib/cn";
import {
  Wifi,
  WifiOff,
  WifiLow,
  WifiHigh,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";

export type ConnectionState = "online" | "unstable" | "offline";

export interface ConnectionStatusProps
  extends React.HTMLAttributes<HTMLSpanElement> {
    state: ConnectionState;
    lastSynced?: string; // "18 sec ago"
  }

/**
 * ConnectionStatus — always communicates network state.
 * When offline: "LOCAL UPDATE SAVED — Waiting for connection…"
 */
export function ConnectionStatus({
  className,
  state,
  lastSynced,
  ...props
}: ConnectionStatusProps) {
  const config = {
    online: {
      icon: Wifi,
      text: "text-available",
      pulse: false,
      label: "ONLINE",
    },
    unstable: {
      icon: AlertTriangle,
      text: "text-stale",
      pulse: true,
      label: "CONNECTION UNSTABLE",
    },
    offline: {
      icon: WifiOff,
      text: "text-unavailable",
      pulse: true,
      label: "OFFLINE",
    },
  }[state];

  const Icon = config.icon;

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
      {config.label}
      {lastSynced && (
        <>
          <span className="text-text-secondary">·</span>
          <span className="text-text-secondary">{lastSynced}</span>
        </>
      )}
      {state === "online" && (
        <RefreshCw className="size-3 text-available/60" aria-hidden="true" />
      )}
    </span>
  );
}

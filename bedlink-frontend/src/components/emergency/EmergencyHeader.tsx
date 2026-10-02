import { cn } from "@/lib/cn";
import { StatusBadge } from "@/components/ui/Badge";
import { FreshnessIndicator } from "@/components/status/FreshnessIndicator";
import { HoldStatus, HoldState } from "@/components/status/HoldStatus";
import { ETAIndicator } from "@/components/status/ETAIndicator";

export interface EmergencyHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
    code: string;
    severity: "critical" | "urgent" | "stable";
    title: string;
    etaMinutes: number;
    freshness: "live" | "recent" | "aging" | "stale";
    freshnessTimestamp: string;
    required: string[];
    holdState: HoldState;
    ambulanceETA: number; // minutes
  }

/**
 * EmergencyHeader — the header for an emergency detail screen or
 * request card. Shows the "what is happening" information.
 */
export function EmergencyHeader({
  className,
  code,
  severity,
  title,
  etaMinutes,
  freshness,
  freshnessTimestamp,
  required,
  holdState,
  ambulanceETA,
  ...props
}: EmergencyHeaderProps) {
  return (
    <div
      className={cn(
        "flex",
        "flex-wrap",
        "items-start",
        "justify-between",
        "gap-4",
        "rounded-lg",
        "border",
        "border-border",
        "bg-surface",
        "p-4",
        "border-b",
        "border-border-b",
        className
      )}
      {...props}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">
            {title}
          </h1>
          <StatusBadge status={"unavailable"}>
            {severity.toUpperCase()}
          </StatusBadge>
        </div>
        <div className="text-xs font-mono text-text-secondary mt-1">
          {code}
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-text-primary">
          <ETAIndicator minutes={etaMinutes} />
          <span className="text-border">·</span>
          <FreshnessIndicator
            status={freshness}
            timestamp={freshnessTimestamp}
            showLabel
          />
        </div>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {required.map((r) => (
            <span
              key={r}
              className="text-xs rounded-full bg-muted px-2.5 py-1 text-text-secondary"
            >
              {r}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-start gap-2">
        {holdState !== "none" && <HoldStatus state={holdState} />}
        {ambulanceETA > 0 && (
          <div className="text-xs text-text-secondary font-mono">
            Ambulance ETA: {ambulanceETA} min
          </div>
        )}
      </div>
    </div>
  );
}

import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/Badge";
import { FreshnessIndicator } from "@/components/status/FreshnessIndicator";
import { MatchScore } from "@/components/status/MatchScore";
import { ETAIndicator } from "@/components/status/ETAIndicator";
import { OfferStatus } from "@/components/status/OfferStatus";
import { HoldStatus } from "@/components/status/HoldStatus";
import { Lightning } from "lucide-react";

export interface EmergencyCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
    id: string;
    code: string; // e.g. "BL-1042"
    severity: "critical" | "urgent" | "stable";
    title: string;
    etaMinutes: number;
    required: string[];
    freshness: "live" | "recent" | "aging" | "stale";
    freshnessTimestamp: string;
    matchScore?: number;
    offerState: "sent" | "accepted" | "rejected" | "timeout" | "none";
  }

/**
 * EmergencyCard — the active emergency list item on the dispatcher
 * overview. Reads as: what's happening → what matters → action.
 */
export function EmergencyCard({
  className,
  id,
  code,
  severity,
  title,
  etaMinutes,
  required,
  freshness,
  freshnessTimestamp,
  matchScore,
  offerState,
  ...props
}: EmergencyCardProps) {
  const severityConfig = {
    critical: {
      badge: "bg-unavailable" as const,
      badgeText: "CRITICAL",
      text: "text-unavailable",
      dot: "bg-unavailable",
      icon: "bg-red-500/20",
    },
    urgent: {
      badge: "bg-unavailable" as const,
      badgeText: "URGENT",
      text: "text-stale",
      dot: "bg-stale",
      icon: "bg-orange-500/20",
    },
    stable: {
      badge: "bg-pending" as const,
      badgeText: "STABLE",
      text: "text-pending",
      dot: "bg-pending",
      icon: "bg-amber-500/20",
    },
  }[severity];

  const { badge, badgeText, text, dot, icon } = severityConfig;

  return (
    <div
      className={cn(
        "flex",
        "flex-wrap",
        "items-start",
        "gap-3",
        "rounded-lg",
        "border",
        "border-border",
        "bg-surface",
        "p-4",
        "transition-colors",
        "hover:bg-muted",
        "active:bg-border",
        className
      )}
      {...props}
    >
      <div className="flex-shrink-0">
        <div
          className={cn(
            "size-9",
            "rounded-full",
            "flex",
            "items-center",
            "justify-center",
            "border",
            "border-border",
            "bg-surface",
            icon
          )}
          aria-hidden="true"
        >
          <Lightning className="size-4" strokeWidth={2.5} />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-text-primary truncate">
            {title}
          </h3>
          <StatusBadge status={severity === "critical" ? "unavailable" : severity === "urgent" ? "stale" : "pending"}>
            {badgeText}
          </StatusBadge>
        </div>
        <div className="text-xs font-mono text-text-secondary mt-0.5">
          {code}
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-text-secondary">
          <ETAIndicator minutes={etaMinutes} />
          <span className="text-border">·</span>
          <FreshnessIndicator
            status={freshness}
            timestamp={freshnessTimestamp}
            showLabel={false}
          />
          {matchScore !== undefined && (
            <>
              <span className="text-border">·</span>
              <span className="font-mono text-text-primary">
                {matchScore}% match
              </span>
            </>
          )}
        </div>
        <div className="flex flex-wrap gap-1 mt-1.5">
          {required.map((r) => (
            <span
              key={r}
              className="text-xs rounded-full bg-muted px-2 py-0.5 text-text-secondary"
            >
              {r}
            </span>
          ))}
        </div>
        {offerState !== "none" && offerState !== "rejected" && (
          <div className="flex items-center gap-2 mt-1.5">
            <OfferStatus state={offerState} />
            {offerState === "accepted" && <HoldStatus state="held" />}
          </div>
        )}
      </div>

      {matchScore !== undefined && (
        <MatchScore value={matchScore} size="sm" />
      )}
    </div>
  );
}

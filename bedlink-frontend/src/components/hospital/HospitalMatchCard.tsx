import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { FreshnessIndicator } from "@/components/status/FreshnessIndicator";
import { AvailabilityIndicator } from "@/components/status/AvailabilityIndicator";
import { LoadIndicator } from "@/components/status/LoadIndicator";
import { MatchScore } from "@/components/status/MatchScore";
import { ETAIndicator } from "@/components/status/ETAIndicator";
import { HoldStatus } from "@/components/status/HoldStatus";
import { OfferStatus } from "@/components/status/OfferStatus";

export interface HospitalMatchCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
    /** Hospital name */
    name: string;
    /** Match score 0–100 */
    score: number;
    /** Matching rationale */
    reason?: string;
    /** Match rationale bullet list */
    reasons?: string[];
    /** Distance in km */
    distance: number;
    /** ETA in minutes */
    eta: number;
    /** Required resources */
    required: string[];
    /** Available resources */
    available: { [resource: string]: number };
    /** Specialities */
    specialties: string[];
    /** Data freshness */
    freshness: "live" | "recent" | "aging" | "stale";
    freshnessTimestamp: string;
    /** Hospital load */
    load: "low" | "moderate" | "high";
    /** Current state */
    state: "available" | "held" | "pending" | "unavailable";
    /** Offers state */
    offerState: "sent" | "accepted" | "rejected" | "timeout" | "none";
    /** Current hold state */
    holdState: "held" | "pending" | "expired" | "none";
    /** Whether the hospital is currently being offered */
    isBeingOffered: boolean;
    /** Primary action button label */
    primaryActionLabel: string;
    /** Primary action click handler */
    onPrimaryAction: () => void;
  }

/**
 * HospitalMatchCard — the BedLink matching result card.
 * Every card shows: name, match score, distance, ETA, required /
 * available resources, specialties, data freshness, load, state, and
 * the primary action. Explainable matching built in.
 */
export function HospitalMatchCard({
  className,
  name,
  score,
  reason,
  reasons,
  distance,
  eta,
  required,
  available,
  specialties,
  freshness,
  freshnessTimestamp,
  load,
  state,
  offerState,
  holdState,
  isBeingOffered,
  primaryActionLabel,
  onPrimaryAction,
  ...props
}: HospitalMatchCardProps) {
  const isOffered =
    isBeingOffered ||
    offerState === "sent" ||
    offerState === "accepted";

  return (
    <div
      className={cn(
        "flex",
        "flex-col",
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
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="text-sm font-semibold text-text-primary truncate">
            {name}
          </div>
          <div className="text-xs text-text-secondary">{distance} km</div>
        </div>
        <OfferStatus state={offerState} />
      </div>

      <MatchScore value={score} reason={reason} reasons={reasons} size="md" />

      <div className="flex flex-wrap items-center gap-2 text-xs text-text-secondary">
        <ETAIndicator minutes={eta} distance={distance} />
        <span className="text-border">·</span>
        <LoadIndicator level={load} />
        <span className="text-border">·</span>
        <FreshnessIndicator
          status={freshness}
          timestamp={freshnessTimestamp}
          showLabel={false}
        />
      </div>

      <div className="flex items-center gap-2">
        <StatusBadge status={state} />
        {holdState !== "none" && <HoldStatus state={holdState} />}
      </div>

      <div className="grid gap-2">
        <div className="text-xs font-semibold text-text-primary">
          Required
        </div>
        <div className="flex flex-wrap gap-1.5">
          {required.map((r) => (
            <Badge key={r} variant="default">
              {r}
            </Badge>
          ))}
        </div>
        <div className="text-xs font-semibold text-text-primary mt-2">
          Available
        </div>
        <div className="flex flex-wrap gap-1.5">
          {Object.entries(available).map(([k, v]) => (
            <Badge key={k} variant="success">
              {k}: {v}
            </Badge>
          ))}
        </div>
      </div>

      <div className="text-xs font-semibold text-text-primary">
        Specialties
      </div>
      <div className="flex flex-wrap gap-1.5">
        {specialties.slice(0, 4).map((s) => (
          <Badge key={s} variant="default">
            {s}
          </Badge>
        ))}
        {specialties.length > 4 && (
          <span className="text-xs text-text-secondary">
            +{specialties.length - 4}
          </span>
        )}
      </div>

      <Button
        variant="primary"
        size="sm"
        onClick={onPrimaryAction}
        disabled={isOffered}
      >
        {primaryActionLabel}
      </Button>
    </div>
  );
}

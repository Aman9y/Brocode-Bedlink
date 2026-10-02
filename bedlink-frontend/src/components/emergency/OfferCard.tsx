import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { FreshnessIndicator } from "@/components/status/FreshnessIndicator";
import { OfferStatus } from "@/components/status/OfferStatus";
import { HoldStatus, HoldState } from "@/components/status/HoldStatus";
import { ConfirmationTimer } from "@/components/status/ConfirmationTimer";

export interface OfferCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
    hospitalName: string;
    emergencyCode: string;
    emergencyTitle: string;
    required: string[];
    eta: number; // ambulance ETA minutes
    freshness: "live" | "recent" | "aging" | "stale";
    freshnessTimestamp: string;
    responseTimeRemaining: number; // seconds
    offerState: "sent" | "accepted" | "rejected" | "timeout" | "none";
    holdState: HoldState;
    onConfirm: () => void;
    onCancel: () => void;
  }

/**
 * OfferCard — the focused confirmation state when the dispatcher
 * requests confirmation. Hospital, emergency, required resources,
 * response-required, operational timer, and confirm/cancel.
 */
export function OfferCard({
  className,
  hospitalName,
  emergencyCode,
  emergencyTitle,
  required,
  eta,
  freshness,
  freshnessTimestamp,
  responseTimeRemaining,
  offerState,
  holdState,
  onConfirm,
  onCancel,
  ...props
}: OfferCardProps) {
  const isResponded = offerState === "accepted" || offerState === "rejected";

  return (
    <div
      className={cn(
        "flex",
        "flex-col",
        "gap-4",
        "rounded-xl",
        "border",
        "border-border",
        "bg-surface",
        "p-5",
        "max-w-lg",
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">
            Confirm resource for {hospitalName}
          </h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Emergency: <span className="font-mono">{emergencyCode}</span>
          </p>
        </div>
        <OfferStatus state={offerState} />
      </div>

      {holdState !== "none" && <HoldStatus state={holdState} />}

      <div className="grid gap-2">
        <div className="text-xs font-semibold text-text-primary">
          Emergency required
        </div>
        <div className="flex flex-wrap gap-1.5">
          {required.map((r) => (
            <Badge key={r} variant="default">
              {r}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs text-text-secondary">
        <ETAIndicator minutes={eta} showRoute />
        <span className="text-border">·</span>
        <FreshnessIndicator
          status={freshness}
          timestamp={freshnessTimestamp}
          showLabel={false}
        />
      </div>

      {!isResponded && (
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-text-secondary">
            Hospital response required
          </span>
          <ConfirmationTimer
            seconds={responseTimeRemaining}
            includeHours
          />
        </div>
      )}

      <div className="flex gap-3">
        {!isResponded ? (
          <>
            <Button variant="primary" onClick={onConfirm}>
              Confirm
            </Button>
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          </>
        ) : (
          <Button variant="success" disabled>
            Confirmed
          </Button>
        )}
      </div>
    </div>
  );
}

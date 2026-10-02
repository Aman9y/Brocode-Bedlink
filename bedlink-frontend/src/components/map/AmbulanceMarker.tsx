import { cn } from "@/lib/cn";
import { Ambulance, Navigation } from "lucide-react";

export interface AmbulanceMarkerProps
  extends React.HTMLAttributes<HTMLDivElement> {
    /** Ambulance name / id */
    name: string;
    /** Heading in degrees (0-360) for rotation */
    heading?: number;
    /** Active route / en-route */
    active?: boolean;
    /** Show route icon instead of pin */
    route?: boolean;
    /** Label suffix, e.g. "EN ROUTE" */
    label?: string;
  }

/**
 * AmbulanceMarker — clear, calm, never flashy.
 * An ambulance crew must identify their vehicle at a glance.
 */
export function AmbulanceMarker({
  className,
  name,
  heading,
  active = false,
  route,
  label,
  ...props
}: AmbulanceMarkerProps) {
  return (
    <div
      className={cn(
        "relative",
        "flex",
        "flex-col",
        "items-center",
        "gap-1.5",
        "cursor-pointer",
        "select-none",
        className
      )}
      role="button"
      aria-label={`Ambulance ${name}, ${active ? "en route" : "scheduled"}`}
      tabIndex={0}
      {...props}
    >
      <div
        className={cn(
          "size-6",
          "rounded-full",
          "flex",
          "items-center",
          "justify-center",
          "border-2",
          "border-border",
          "bg-surface",
          "relative",
          route ? "bg-amber-500/20" : "bg-amber-500/20"
        )}
        style={
          heading && !route
            ? { transform: `rotate(${heading}deg)` }
            : undefined
        }
        aria-hidden="true"
      >
        {route ? (
          <Navigation className="size-3 text-amber-700" aria-hidden="true" />
        ) : (
          <Ambulance className="size-3 text-amber-700" aria-hidden="true" />
        )}
      </div>
      <div className="text-xs font-medium text-text-primary leading-tight">
        {name}
      </div>
      {label && (
        <div
          className={cn(
            "text-[10px]",
            active ? "text-available" : "text-text-secondary",
            "font-semibold"
          )}
          aria-live="polite"
        >
          {label}
        </div>
      )}
    </div>
  );
}

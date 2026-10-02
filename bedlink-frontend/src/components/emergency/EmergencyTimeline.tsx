import { cn } from "@/lib/cn";

export interface TimelineEvent {
  time: string; // "14:02"
  label: string; // "Emergency created"
  /** Optional detail line under the label */
  detail?: string;
  /** Emphasize this event (e.g. current/latest) */
  highlighted?: boolean;
}

export interface EmergencyTimelineProps
  extends React.HTMLAttributes<HTMLDivElement> {
    events: TimelineEvent[];
    /** Currently active state */
    activeEventIndex?: number;
  }

/**
 * EmergencyTimeline — reusable timeline for any emergency.
 * Shows a chronological, operational event log.
 */
export function EmergencyTimeline({
  className,
  events,
  activeEventIndex,
  ...props
}: EmergencyTimelineProps) {
  return (
    <div
      className={cn(
        "flex",
        "flex-col",
        "gap-0",
        className
      )}
      {...props}
    >
      {events.map((event, i) => (
        <div
          key={i}
          className={cn(
            "relative",
            "flex",
            "flex-wrap",
            "items-start",
            "gap-3",
            "pb-5",
            i < events.length - 1 && "border-b",
            "border-border"
          )}
        >
          <div
            className={cn(
              "relative",
              "flex",
              "flex-shrink-0",
              "size-4",
              "rounded-full",
              "flex",
              "items-center",
              "justify-center",
              "border-2",
              "border-border",
              event.highlighted ? "bg-primary" : "bg-surface",
              "z-10"
            )}
          >
            {event.highlighted && (
              <span className="size-1 rounded-full bg-white" aria-hidden="true" />
            )}
          </div>
          <div className="min-w-0">
            <div
              className={cn(
                "text-sm font-semibold",
                event.highlighted
                  ? "text-text-primary"
                  : "text-text-secondary",
                "leading-tight"
              )}
            >
              {event.time}
            </div>
            <div
              className={cn(
                "text-sm",
                event.highlighted
                  ? "text-text-primary font-medium"
                  : "text-text-primary",
                "font-medium"
              )}
            >
              {event.label}
            </div>
            {event.detail && (
              <div
                className={cn(
                  "text-xs",
                  "text-text-secondary",
                  "mt-0.5"
                )}
              >
                {event.detail}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

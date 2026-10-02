import { cn } from "@/lib/cn";
import { MapPin, Navigation, AlertTriangle } from "lucide-react";

export interface MapPanelProps
  extends React.HTMLAttributes<HTMLDivElement> {
    /** Left/right content alongside the map */
    sidebarContent?: React.ReactNode;
    /** Reusable emphasis; grounds the map in context */
    aspectRatio?: number;
  }

/**
 * MapPanel — the map shell. Lightweight, informative, with clearly
 * labeled layers. The map is supporting information, not the whole app.
 */
export function MapPanel({
  className,
  sidebarContent,
  children,
  ...props
}: MapPanelProps) {
  return (
    <div
      className={cn(
        "relative",
        "flex",
        "flex-wrap",
        "gap-4",
        "rounded-lg",
        "border",
        "border-border",
        "bg-surface",
        "overflow-hidden",
        className
      )}
      {...props}
    >
      {sidebarContent && (
        <div className="w-[320px] shrink-0 overflow-y-auto pr-4">
          {sidebarContent}
        </div>
      )}
      <div
        className={cn(
          "relative",
          "flex-1",
          "min-h-[320px]",
          "rounded-lg",
          "border",
          "border-border",
          "bg-muted",
          "overflow-hidden"
        )}
      >
        {children}
        <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
          <div className="flex items-center gap-2 text-xs text-text-secondary bg-surface/80 px-3 py-2 rounded-md border border-border pointer-events-auto">
            <MapPin className="size-3.5" aria-hidden="true" />
            <span>Map layer: ambulance · hospital · patient · route</span>
          </div>
        </div>
        <div className="absolute top-3 right-3 pointer-events-none">
          <div className="flex items-center gap-2 text-xs text-text-secondary bg-surface/80 px-3 py-2 rounded-md border border-border pointer-events-auto">
            <AlertTriangle className="size-3.5" strokeWidth={2} aria-hidden="true" />
            <span>Note: map is supporting information only</span>
          </div>
        </div>
      </div>
    </div>
  );
}

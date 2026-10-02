import { cn } from "@/lib/cn";
import { Search, RotateCcw, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement> {
    /** Icon key: search | map | list | none */
    icon?: "search" | "map" | "list" | "none";
    /** Title of the empty state */
    title: string;
    /** Descriptive message */
    description: string;
    /** Optional action buttons */
    action?: React.ReactNode;
    /** Additional footer */
    footer?: React.ReactNode;
  }

/**
 * EmptyState — useful empty state, never blank.
 * Example: "No exact match found" with an EXPAND SEARCH action.
 */
export function EmptyState({
  className,
  icon = "search",
  title,
  description,
  action,
  footer,
  ...props
}: EmptyStateProps) {
  const iconMap = {
    search: <Search className="size-8" strokeWidth={1.5} />,
    map: <MapPin className="size-8" strokeWidth={1.5} />,
    list: <div className="size-8 rounded-full border border-border flex items-center justify-center"><span className="text-xs font-mono font-bold text-text-secondary">-</span></div>,
    none: <div className="size-8" />,
  }[icon];

  return (
    <div
      className={cn(
        "flex",
        "flex-col",
        "items-center",
        "gap-3",
        "rounded-xl",
        "border",
        "border-border",
        "bg-surface",
        "p-8",
        "text-center",
        "max-w-sm",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "size-12",
          "rounded-full",
          "flex",
          "items-center",
          "justify-center",
          "bg-muted",
          "text-text-secondary"
        )}
      >
        {iconMap}
      </div>
      <div>
        <h3 className="text-base font-semibold text-text-primary">
          {title}
        </h3>
        <p className="text-sm text-text-secondary mt-0.5 leading-relaxed">
          {description}
        </p>
      </div>
      {action && (
        <div className="flex gap-2 justify-center">{action}</div>
      )}
      {footer && <div className="text-xs text-text-secondary mt-1">{footer}</div>}
    </div>
  );
}

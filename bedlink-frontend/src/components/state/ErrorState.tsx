import { cn } from "@/lib/cn";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface ErrorStateProps
  extends React.HTMLAttributes<HTMLDivElement> {
    /** Icon key: alert | home | none */
    icon?: "alert" | "home" | "none";
    /** Error title */
    title: string;
    /** Actionable message */
    description: string;
    /** The last known good state, for reference */
    lastKnownState?: string;
    /** Retry handler */
    onRetry?: () => void;
    /** Navigate back handler */
    onNavigateBack?: () => void;
  }

/**
 * ErrorState — actionable, never "Something went wrong."
 * Shows last confirmed state so the user knows what is valid.
 */
export function ErrorState({
  className,
  icon = "alert",
  title,
  description,
  lastKnownState,
  onRetry,
  onNavigateBack,
  ...props
}: ErrorStateProps) {
  const iconMap = {
    alert: <AlertTriangle className="size-8" strokeWidth={1.5} />,
    home: <Home className="size-8" strokeWidth={1.5} />,
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
          "bg-unavailable",
          "text-bg",
          "px-3",
          "py-3"
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
        {lastKnownState && (
          <div className="mt-3 text-xs text-text-secondary bg-muted rounded-md px-3 py-2">
            <span className="font-semibold">Last confirmed state:</span> {lastKnownState}
          </div>
        )}
      </div>
      <div className="flex gap-2">
        {onRetry && (
          <Button variant="primary" size="sm" onClick={onRetry}>
            <RefreshCw className="size-3.5" aria-hidden="true" />
            Retry
          </Button>
        )}
        {onNavigateBack && (
          <Button variant="secondary" size="sm" onClick={onNavigateBack}>
            <Home className="size-3.5" aria-hidden="true" />
            Back
          </Button>
        )}
      </div>
    </div>
  );
}

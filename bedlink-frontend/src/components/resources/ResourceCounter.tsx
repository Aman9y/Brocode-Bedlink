import { cn } from "@/lib/cn";
import { Minus, Plus } from "lucide-react";

export interface ResourceCounterProps
  extends React.HTMLAttributes<HTMLDivElement> {
    /** Current count, e.g. 3 */
    value: number;
    /** Minimum allowed value */
    min?: number;
    /** Maximum allowed value */
    max?: number;
    /** Label shown on the left */
    label?: string;
    /** Helper text under the counter */
    helperText?: string;
    /** Show +/- buttons */
    showButtons?: boolean;
    /** Step amount for increment/decrement */
    step?: number;
  }

/**
 * ResourceCounter — the ± 3 ± control on the nurse resource screen.
 * Fast, digital, single-tap on mobile.
 */
export function ResourceCounter({
  className,
  value,
  min = 0,
  max = 999,
  label,
  helperText,
  showButtons = true,
  step = 1,
  ...props
}: ResourceCounterProps) {
  return (
    <div
      className={cn(
        "inline-flex",
        "flex-wrap",
        "items-center",
        "gap-3",
        "rounded-lg",
        "border",
        "border-border",
        "bg-surface",
        "p-3",
        "transition-colors",
        className
      )}
      {...props}
    >
      {label && (
        <span className="text-sm font-medium text-text-primary min-w-[80px]">
          {label}
        </span>
      )}
      <div
        className={cn(
          "flex",
          "items-center",
          "gap-2",
          "px-1",
          "rounded-md",
          "border",
          "border-border",
          "min-w-[72px]"
        )}
      >
        {showButtons && (
          <button
            type="button"
            className="flex size-7 items-center justify-center rounded-md text-text-secondary hover:text-text-primary hover:bg-muted transition-colors"
            onClick={() => {}}
            aria-label={`Decrease ${label ?? ""} by ${step}`}
          >
            <Minus className="size-3.5" aria-hidden="true" />
          </button>
        )}
        <span className="w-[64px] text-center text-base font-mono font-bold text-text-primary select-none">
          {value}
        </span>
        {showButtons && (
          <button
            type="button"
            className="flex size-7 items-center justify-center rounded-md text-text-secondary hover:text-text-primary hover:bg-muted transition-colors"
            onClick={() => {}}
            aria-label={`Increase ${label ?? ""} by ${step}`}
          >
            <Plus className="size-3.5" aria-hidden="true" />
          </button>
        )}
      </div>
      {helperText && (
        <span className="text-xs text-text-secondary">{helperText}</span>
      )}
    </div>
  );
}

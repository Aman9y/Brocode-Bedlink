import { cn } from "@/lib/cn";
import { Check } from "lucide-react";
import { forwardRef } from "react";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    /** Render with label styling */
    label?: string;
  }

/**
 * Checkbox — visible label, keyboard accessible, no color-only meaning.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    return (
      <label
        className={cn(
          "flex",
          "items-center",
          "gap-2",
          "cursor-pointer",
          "select-none",
          className
        )}
        htmlFor={id}
      >
        <input
          ref={ref}
          id={id}
          className={cn(
            "hidden",
            "peer",
            "sr-only"
          )}
          type="checkbox"
          {...props}
        />
        <span
          className={cn(
            "size-4",
            "rounded-md",
            "border",
            "border-border",
            "bg-surface",
            "flex",
            "items-center",
            "justify-center",
            "transition-colors",
            "peer-checked:bg-primary",
            "peer-focus:outline-hidden",
            "peer-focus:ring-2",
            "peer-focus:ring-primary/20",
            "peer-disabled:opacity-50",
            "cursor-pointer"
          )}
        >
          <Check
            className={cn(
              "size-3",
              "text-white",
              "pointer-events-none",
              "transition-opacity",
              "peer-checked:opacity-100",
              "peer-disabled:opacity-0"
            )}
            aria-hidden="true"
          />
        </span>
        {label && (
          <span
            className={cn(
              "text-sm",
              "text-text-primary",
              "font-medium",
              "peer-disabled:text-text-secondary"
            )}
          >
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

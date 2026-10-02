import { cn } from "@/lib/cn";
import { Label } from "@/components/ui/Label";

/**
 * Left-side icon node (e.g. a search icon). Rendered inside the input.
 */
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Show a visible label for the input */
  label?: string;
  /** Show helper/help text below */
  helperText?: string;
  /** Left-side icon (e.g. search) */
  leftIcon?: React.ReactNode;
}

/**
 * Input — clinical, high-contrast, with visible focus ring.
 * Never rely on placeholder as a label.
 */
export function Input({
  className,
  label,
  helperText,
  id,
  leftIcon,
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <Label htmlFor={id}>{label}</Label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary">
            {leftIcon}
          </span>
        )}
        <input
          className={cn(
            leftIcon ? "pl-10" : "",
            "w-full",
            "rounded-lg",
            "border",
            "border-border",
            "bg-surface",
            "px-3",
            "py-2.5",
            "text-sm",
            "text-text-primary",
            "leading-tight",
            "placeholder:text-text-secondary",
            "transition-colors",
            "duration-150",
            "focus:border-primary",
            "focus:outline-hidden",
            "focus:ring-2",
            "focus:ring-primary/20",
            "disabled:opacity-50",
            "disabled:cursor-not-allowed",
            className
          )}
        id={id}
        {...props}
      />
      </div>
      {helperText && (
        <span className="mt-1.5 text-xs text-text-secondary">
          {helperText}
        </span>
      )}
    </div>
  );
}

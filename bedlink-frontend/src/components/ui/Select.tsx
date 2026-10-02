import { cn } from "@/lib/cn";
import { Label } from "@/components/ui/Label";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
}

/**
 * Select — consistent with Input rhythm (40px height).
 */
export function Select({
  className,
  label,
  helperText,
  options,
  placeholder = "Select an option",
  id,
  ...props
}: SelectProps) {
  return (
    <div className="w-full">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative">
        <select
          className={cn(
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
            "appearance-none",
            "cursor-pointer",
            "transition-colors",
            "duration-150",
            "focus:border-primary",
            "focus:outline-hidden",
            "focus:ring-2",
            "focus:ring-primary/20",
            "disabled:opacity-50",
            "disabled:cursor-not-allowed",
            "pr-10",
            className
          )}
          id={id}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none size-4 text-text-secondary"
          aria-hidden="true"
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

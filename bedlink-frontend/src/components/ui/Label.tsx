import { cn } from "@/lib/cn";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Explicit htmlFor if the label wraps an input; otherwise omit */
  htmlFor?: string;
}

/**
 * Label — always render a visible label for forms. No placeholders
 * as substitutes (accessibility requirement).
 */
export function Label({
  className,
  htmlFor,
  children,
  ...props
}: LabelProps) {
  return (
    <label
      className={cn(
        "text-sm",
        "font-medium",
        "text-text-primary",
        "leading-tight",
        "select-none",
        "cursor-pointer",
        className
      )}
      htmlFor={htmlFor}
      {...props}
    >
      {children}
    </label>
  );
}

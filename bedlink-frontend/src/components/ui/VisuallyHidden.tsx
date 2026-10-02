import { cn } from "@/lib/cn";

export interface VisuallyHiddenProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

/**
 * Visually hidden but accessible to screen readers.
 * Used when text must exist for a11y but not be visible.
 */
export function VisuallyHidden({
  className,
  children,
  ...props
}: VisuallyHiddenProps) {
  return (
    <span
      className={cn(
        "sr-only",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

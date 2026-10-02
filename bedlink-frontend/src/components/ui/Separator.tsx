import { cn } from "@/lib/cn";

export interface SeparatorProps
  extends React.HTMLAttributes<HTMLHRElement> {
  /** Vertical orientation */
  vertical?: boolean;
}

/**
 * Thin separator — visual rhythm, not decoration.
 */
export function Separator({
  className,
  vertical = false,
  ...props
}: SeparatorProps) {
  return (
    <hr
      className={cn(
        "border-border",
        vertical ? "w-[1px] h-full" : "h-[1px] w-full",
        className
      )}
      {...props}
    />
  );
}

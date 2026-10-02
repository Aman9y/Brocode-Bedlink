import { cn } from "@/lib/cn";

export interface MatchScoreProps
  extends React.HTMLAttributes<HTMLSpanElement> {
    /** Match percentage, e.g. 94 */
    value: number;
    /** Show the "why" explanation block */
    reason?: string;
    /** Show the "why" bullet list */
    reasons?: string[];
    /** Display style: small inline or large block */
    size?: "sm" | "md" | "lg";
  }

/**
 * MatchScore — explainable matching display.
 * NEVER just "MATCH SCORE 94" — always accompany with "WHY THIS
 * HOSPITAL" evidence so users understand the result.
 */
export function MatchScore({
  className,
  value,
  reason,
  reasons,
  size = "md",
  ...props
}: MatchScoreProps) {
  return (
    <div
      className={cn(
        "text-center",
        "rounded-lg",
        "border",
        "border-border",
        "bg-surface",
        "p-3",
        className
      )}
      {...props}
    >
      <div className="font-mono font-bold text-2xl leading-tight">
        {value}
        <span className="text-sm font-normal text-text-secondary">%</span>
      </div>
      <div className="mt-1 flex items-center justify-center gap-1.5">
        <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${value}%` }}
            aria-hidden="true"
          />
        </div>
      </div>
      {size === "lg" && (
        <div className="mt-2 text-xs text-text-secondary font-medium">
          Match score
        </div>
      )}
      {reason && size !== "sm" && (
        <div className="mt-1.5 text-xs text-text-secondary leading-relaxed">
          {reason}
        </div>
      )}
      {reasons && reasons.length > 0 && (
        <ul className="mt-1.5 space-y-0.5 text-left">
          {reasons.map((r) => (
            <li
              key={r}
              className="text-xs text-text-secondary flex items-start gap-1.5"
            >
              <svg
                className="size-3 shrink-0 text-available mt-0.5"
                viewBox="0 0 12 12"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10.28 2.28a.75.75 0 0 1 0 1.06l-5.5 5.5a.75.75 0 0 1-1.06 0L2.28 6.06a.75.75 0 0 1 1.06-1.06L6 5.06l4.72-4.72a.75.75 0 0 1 1.06 0Z"
                  clipRule="evenodd"
                />
              </svg>
              {r}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

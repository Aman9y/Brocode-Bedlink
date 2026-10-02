import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

/**
 * Generic badge (label style).
 */
const badgeVariants = cva(
  [
    "inline-flex",
    "items-center",
    "gap-1.5",
    "font-medium",
    "text-xs",
    "leading-tight",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-muted",
          "text-text-secondary",
          "border-border",
        ],
        primary: ["bg-primary", "text-bg"],
        secondary: ["bg-surface", "text-text-primary", "border-border"],
        ghost: ["bg-transparent", "text-text-secondary"],
        success: ["bg-available", "text-bg"],
        warning: ["bg-pending", "text-bg"],
        danger: ["bg-unavailable", "text-bg"],
        muted: ["bg-muted", "text-text-secondary"],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({
  className,
  variant,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    >
      {children}
    </span>
  );
}

/**
 * StatusBadge — the single status indicator used across BedLink.
 * Never color-only: always an icon + label so meaning survives
 * grayscale/accessibility.
 */
const statusVariants = cva(
  [
    "inline-flex",
    "items-center",
    "gap-1.5",
    "font-semibold",
    "text-xs",
    "leading-tight",
    "border",
    "rounded-full",
  ],
  {
    variants: {
      status: {
        available: [
          "bg-available-bg",
          "text-available",
          "border-available-border",
        ],
        held: [
          "bg-held-bg",
          "text-held",
          "border-held-border",
        ],
        pending: [
          "bg-pending-bg",
          "text-pending",
          "border-pending-border",
        ],
        stale: [
          "bg-stale-bg",
          "text-stale",
          "border-stale-border",
        ],
        unavailable: [
          "bg-unavailable-bg",
          "text-unavailable",
          "border-unavailable-border",
        ],
        unknown: [
          "bg-unknown-bg",
          "text-unknown",
          "border-unknown-border",
        ],
      },
    },
    defaultVariants: {
      status: "available",
    },
  }
);

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusVariants> {}

export function StatusBadge({
  className,
  status,
  children,
  ...props
}: StatusBadgeProps) {
  return (
    <span
      className={cn(statusVariants({ status }), className)}
      {...props}
    >
      {children}
    </span>
  );
}

"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { type ReactNode } from "react";

/**
 * Button component built on class-variance-authority.
 * Client component - interacts with user events.
 */
const buttonVariants = cva(
  [
    "inline-flex",
    "items-center",
    "justify-center",
    "gap-2",
    "font-semibold",
    "cursor-pointer",
    "transition-all",
    "duration-150",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed",
    "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-primary",
          "text-bg",
          "hover:bg-primary-hover",
          "active:bg-primary-active",
          "border-none",
        ],
        secondary: [
          "bg-surface",
          "text-text-primary",
          "border",
          "border-border",
          "hover:bg-muted",
          "active:bg-border",
        ],
        outline: [
          "bg-transparent",
          "text-text-primary",
          "border",
          "border-border",
          "hover:bg-muted",
          "active:bg-border",
        ],
        ghost: [
          "bg-transparent",
          "text-text-secondary",
          "hover:bg-muted",
          "active:bg-border",
        ],
        danger: [
          "bg-unavailable",
          "text-bg",
          "hover:bg-unavailable-hover",
          "active:bg-unavailable-active",
          "border-none",
        ],
        success: [
          "bg-available",
          "text-bg",
          "hover:bg-available-hover",
          "active:bg-available-active",
          "border-none",
        ],
        warning: [
          "bg-pending",
          "text-bg",
          "hover:bg-pending-hover",
          "active:bg-pending-active",
          "border-none",
        ],
        subtle: [
          "bg-transparent",
          "text-text-secondary",
          "hover:bg-muted",
          "active:bg-border",
        ],
      },
      size: {
        sm: [
          "text-sm",
          "px-3",
          "py-2",
          "rounded-md",
        ],
        md: [
          "text-base",
          "px-4",
          "py-2.5",
          "rounded-lg",
        ],
        lg: [
          "text-base",
          "px-5",
          "py-3",
          "rounded-lg",
        ],
        icon: [
          "p-2",
          "rounded-lg",
        ],
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Left-side icon (e.g. a search icon) */
  leftIcon?: ReactNode;
  /** Right-side icon */
  rightIcon?: ReactNode;
  /** Primary content of the button */
  children?: ReactNode;
}

/** Primary action button — used for the most important operational action on any screen. Consistently 40px tall. */
export function Button({
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  children,
  onClick,
  disabled,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(buttonVariants({ variant, size }), className)}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
}

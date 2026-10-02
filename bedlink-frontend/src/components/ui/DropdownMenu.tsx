import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { ChevronRight, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export interface DropdownMenuDividerProps
  extends React.HTMLAttributes<HTMLHRElement> {}

export function DropdownMenuDivider({
  className,
  ...props
}: DropdownMenuDividerProps) {
  return (
    <hr
      className={cn("border-border/60", "my-1", className)}
      {...props}
    />
  );
}

export interface DropdownMenuItemProps
  extends React.LiHTMLAttributes<HTMLLIElement> {
    shortcut?: string;
    icon?: React.ReactNode;
  }

export function DropdownMenuItem({
  className,
  icon,
  shortcut,
  children,
  ...props
}: DropdownMenuItemProps) {
  return (
    <li
      className={cn(
        "flex",
        "items-center",
        "gap-2",
        "px-3",
        "py-2",
        "text-sm",
        "cursor-pointer",
        "rounded-md",
        "transition-colors",
        "hover:bg-muted",
        "focus:outline-hidden",
        "focus:bg-muted",
        "active:bg-border",
        className
      )}
      {...props}
    >
      {icon}
      <span className="text-text-primary">{children}</span>
      {shortcut && (
        <span className="ml-auto text-xs text-text-secondary font-mono">
          {shortcut}
        </span>
      )}
    </li>
  );
}

export interface DropdownMenuLabelProps
  extends React.HTMLAttributes<HTMLLIElement> {
  align?: "start" | "center";
}

export function DropdownMenuLabel({
  className,
  align = "start",
  children,
  ...props
}: DropdownMenuLabelProps) {
  return (
    <li
      className={cn(
        "px-3",
        "py-2",
        "text-xs",
        "font-semibold",
        "uppercase",
        "tracking-wider",
        "text-text-secondary",
        "pointer-events-none",
        "select-none",
        "flex",
        "items-" + align,
        "gap-2",
        className
      )}
      {...props}
    >
      {children}
    </li>
  );
}

export interface DropdownMenuSubProps
  extends React.HTMLAttributes<HTMLUListElement> {}

export function DropdownMenuSub({
  className,
  children,
  ...props
}: DropdownMenuSubProps) {
  return (
    <ul
      className={cn(
        "px-3",
        "py-1",
        "min-w-[180px]",
        "bg-surface",
        "border",
        "border-border",
        "rounded-md",
        "shadow-lg",
        "overflow-hidden",
        "z-50",
        "pointer-events-auto",
        className
      )}
      {...props}
    >
      {children}
    </ul>
  );
}

export interface DropdownMenuTriggerProps
  extends React.HTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
  }

export function DropdownMenuTrigger({
  className,
  children,
  ...props
}: DropdownMenuTriggerProps) {
  return (
    <button
      className={cn(
        "flex",
        "items-center",
        "gap-1.5",
        "px-3",
        "py-2",
        "text-sm",
        "font-medium",
        "text-text-primary",
        "cursor-pointer",
        "rounded-md",
        "transition-colors",
        "hover:bg-muted",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export interface DropdownMenuProps
  extends React.HTMLAttributes<HTMLUListElement> {
    children: React.ReactNode;
    position?: "bottom" | "top" | "right" | "left";
  }

export function DropdownMenu({
  className,
  children,
  position = "bottom",
  ...props
}: DropdownMenuProps) {
  return (
    <ul
      className={cn(
        "relative",
        "z-[100]",
        "min-w-[200px]",
        "bg-surface",
        "border",
        "border-border",
        "rounded-md",
        "shadow-lg",
        "overflow-hidden",
        "pointer-events-auto",
        className
      )}
      {...props}
    >
      {children}
    </ul>
  );
}

export interface DropdownMenuContentProps
  extends React.HTMLAttributes<HTMLUListElement> {}

export function DropdownMenuContent({
  className,
  children,
  ...props
}: DropdownMenuContentProps) {
  return (
    <ul
      className={cn(
        "relative",
        "z-50",
        "min-w-[180px]",
        "bg-surface",
        "border",
        "border-border",
        "rounded-md",
        "shadow-lg",
        "overflow-hidden",
        "pointer-events-auto",
        className
      )}
      {...props}
    >
      {children}
    </ul>
  );
}

export interface DropdownMenuRadioGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function DropdownMenuRadioGroup({
  className,
  children,
  ...props
}: DropdownMenuRadioGroupProps) {
  return (
    <div
      className={cn("flex", "flex-col", "gap-1", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export interface DropdownMenuRadioItemProps
  extends React.LiHTMLAttributes<HTMLLIElement> {
    value: string;
    checked: boolean;
  }

export function DropdownMenuRadioItem({
  className,
  value,
  checked,
  children,
  ...props
}: DropdownMenuRadioItemProps) {
  return (
    <li
      className={cn(
        "flex",
        "items-center",
        "gap-2",
        "px-3",
        "py-2",
        "text-sm",
        "cursor-pointer",
        "rounded-md",
        "transition-colors",
        "hover:bg-muted",
        checked && "bg-muted",
        className
      )}
      onClick={() => {}}
      {...props}
    >
      <span
        className={cn(
          "size-3",
          "rounded-full",
          "border",
          "border-border",
          "flex",
          "items-center",
          "justify-center",
          checked && "bg-primary"
        )}
      >
        {checked && <Check className="size-2.5 text-white" aria-hidden="true" />}
      </span>
      <span className="text-text-primary">{children}</span>
    </li>
  );
}

/**
 * Tooltip — unobtrusive, high-contrast, no fancy delays.
 */
export interface TooltipProps
  extends React.HTMLAttributes<HTMLDivElement> {
    content: string;
    children: React.ReactNode;
    side?: "top" | "bottom" | "left" | "right";
  }

export function Tooltip({
  content,
  children,
  side = "top",
  className,
  ...props
}: TooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}
    >
      {children}
      {open && (
        <div
          className={cn(
            "absolute",
            "z-50",
            "px-2.5",
            "py-1.5",
            "text-xs",
            "font-medium",
            "text-text-primary",
            "bg-surface",
            "border",
            "border-border",
            "rounded-md",
            "shadow-md",
            "white-space-nowrap",
            "pointer-events-none",
            "transition-opacity",
            "duration-150",
            "ease-out",
            side === "top" && "bottom-full",
            side === "bottom" && "top-full",
            side === "left" && "right-full",
            side === "right" && "left-full",
          )}
          style={
            {
              top: side === "top" ? "-8px" : undefined,
              bottom: side === "bottom" ? "-8px" : undefined,
              left: side === "left" ? "-8px" : undefined,
              right: side === "right" ? "-8px" : undefined,
            } as React.CSSProperties
          }
        >
          {content}
        </div>
      )}
    </div>
  );
}

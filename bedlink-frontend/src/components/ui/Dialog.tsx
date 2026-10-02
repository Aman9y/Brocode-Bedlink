import { cn } from "@/lib/cn";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether the dialog is open (managed by parent) */
  open: boolean;
  /** Escape key closes; click on overlay closes */
  onOpenChange: (open: boolean) => void;
}

/**
 * Modal overlay + panel.
 * Focus-trap and escape handling are managed by parent/context.
 */
export function DialogOverlay({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "fixed",
        "inset-0",
        "z-50",
        "flex",
        "items-center",
        "justify-center",
        "bg-black/40",
        "backdrop-blur-sm",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0" aria-hidden="true" />
      {children}
    </div>
  );
}

export function DialogPanel({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "w-full",
        "max-w-lg",
        "rounded-xl",
        "bg-surface",
        "border",
        "border-border",
        "shadow-lg",
        "relative",
        "z-10",
        "overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between p-5 border-b border-border">
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

/**
 * Minimal dialog primitive — renders a portal to body with focus
 * management when `open` is true. Caller controls position/size.
 */
export function Dialog({
  open,
  onOpenChange,
  className,
  children,
  ...props
}: DialogProps) {
  const prevFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      // Store currently focused element to restore on close
      prevFocusRef.current = document.activeElement as HTMLElement;
      // Lock body scroll
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // Return focus to the previously focused element
      setTimeout(() => {
        if (prevFocusRef.current && typeof prevFocusRef.current.focus === "function") {
          prevFocusRef.current.focus();
        }
      }, 0);
    }
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onOpenChange(false);
      }
    };
    if (open) {
      document.addEventListener("keydown", handleKey);
      return () => document.removeEventListener("keydown", handleKey);
    }
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <DialogOverlay className={className} {...props}>
      <DialogPanel>
        <button
          className="absolute right-4 top-4 p-1 rounded-md text-text-secondary hover:text-text-primary hover:bg-muted transition-colors"
          onClick={() => onOpenChange(false)}
          aria-label="Close dialog"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
        {children}
      </DialogPanel>
    </DialogOverlay>
  );
}

import { cn } from "@/lib/cn";
import { AlertTriangle, X } from "lucide-react";
import { useEffect, useRef } from "react";

export interface AlertDialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmVariant?: "danger" | "primary" | "secondary";
  onConfirm?: () => void;
}

/**
 * Confirmation dialog for destructive or consequential actions.
 * Never silently perform destructive actions.
 */
export function AlertDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  confirmVariant = "danger",
  onConfirm,
  className,
  children,
  ...props
}: AlertDialogProps) {
  const prevFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      prevFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={() => onOpenChange(false)}
      {...props}
    >
      <div
        className="w-full max-w-md rounded-xl bg-surface border border-border shadow-lg p-6 relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 text-unavailable mb-3">
          <AlertTriangle className="size-5 shrink-0" aria-hidden="true" />
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        <p className="text-sm text-text-secondary mb-6 leading-relaxed">
          {description}
        </p>
        <div className="flex gap-3 justify-end">
          <button
            className="px-4 py-2.5 rounded-lg border border-border text-sm font-semibold text-text-primary hover:bg-muted transition-colors"
            onClick={() => onOpenChange(false)}
          >
            {cancelLabel}
          </button>
          {children || (
            <button
              className={cn(
                "px-4",
                "py-2.5",
                "rounded-lg",
                "text-sm",
                "font-semibold",
                "cursor-pointer",
                "transition-all",
                "disabled:opacity-50",
                "disabled:cursor-not-allowed",
                confirmVariant === "danger" && [
                  "bg-unavailable",
                  "text-bg",
                  "hover:bg-unavailable-hover",
                ],
                confirmVariant === "primary" && [
                  "bg-primary",
                  "text-bg",
                  "hover:bg-primary-hover",
                ],
                confirmVariant === "secondary" && [
                  "bg-surface",
                  "text-text-primary",
                  "border",
                  "border-border",
                  "hover:bg-muted",
                ]
              )}
              onClick={() => {
                onConfirm?.();
                onOpenChange(false);
              }}
            >
              {confirmLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

import { cn } from "@/lib/cn";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Input } from "@/components/ui/Input";

const React = require("react");

export interface ConfirmDialogProps
  extends React.HTMLAttributes<HTMLDivElement> {
    /** Whether the dialog is open */
    open: boolean;
    /** Close handler */
    onClose: () => void;
    /** Title */
    title: string;
    /** Description */
    description: string;
    /** Reason options */
    reasonOptions?: string[];
    /** Placeholder for the custom reason */
    reasonPlaceholder?: string;
    /** Whether a reason is required */
    reasonRequired?: boolean;
    /** On confirm handler */
    onConfirm: (reason?: string) => void;
    /** Confirm button label */
    confirmLabel?: string;
    /** Cancel button label */
    cancelLabel?: string;
    /** Variant: danger | warning | confirmation */
    variant?: "danger" | "warning" | "confirmation";
    /** Whether to show a reason input */
    showReasonInput?: boolean;
  }

/**
 * ConfirmDialog — clear confirmation for destructive actions.
 * Groups reasons; never silently performs destructive actions.
 */
export function ConfirmDialog({
  open,
  onClose,
  title,
  description,
  reasonOptions = [
    "Resource unavailable",
    "Condition mismatch",
    "Capacity changed",
    "Other",
  ],
  reasonPlaceholder = "Briefly explain your reason",
  reasonRequired = false,
  onConfirm,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  showReasonInput = false,
  ...props
}: ConfirmDialogProps) {
  const variantConfig = {
    danger: {
      icon: "bg-red-500/20",
      border: "border-red-500/30",
      button: "bg-red-500/20 hover:bg-red-500/30 text-red-500 border-red-500/30",
    },
    warning: {
      icon: "bg-orange-500/20",
      border: "border-orange-500/30",
      button: "bg-orange-500/20 hover:bg-orange-500/30 text-orange-500 border-orange-500/30",
    },
    confirmation: {
      icon: "bg-primary/20",
      border: "border-primary/30",
      button: "bg-primary text-white border-primary",
    },
  }[variant];

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
      {...props}
    >
      <div
        className="w-full max-w-md rounded-xl bg-surface border border-border shadow-lg p-6 relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={cn(
            "flex",
            "items-center",
            "gap-3",
            "mb-3",
            variantConfig.icon
          )}
        >
          <AlertTriangle className="size-5" aria-hidden="true" />
          <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
        </div>
        <p
          className="text-sm text-text-secondary mb-5 leading-relaxed"
        >
          {description}
        </p>

        {showReasonInput && (
          <div className="mb-5 space-y-3">
            <Label>Select a reason</Label>
            <div className="flex flex-wrap gap-2">
              {reasonOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={cn(
                    "px-3",
                    "py-1.5",
                    "rounded-md",
                    "text-xs",
                    "font-medium",
                    "border",
                    "border-border",
                    "bg-surface",
                    "text-text-secondary",
                    "cursor-pointer",
                    "transition-colors",
                    "hover:bg-muted"
                  )}
                  onClick={() => onConfirm(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
            {reasonRequired && (
              <Textarea
                placeholder={reasonPlaceholder}
                rows={3}
                className="mt-2"
              />
            )}
          </div>
        )}

        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button
            variant={variant === "danger" ? "danger" : "primary"}
            onClick={() => onConfirm(undefined)}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

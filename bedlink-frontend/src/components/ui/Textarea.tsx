import { cn } from "@/lib/cn";
import { Label } from "@/components/ui/Label";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
}

export function Textarea({
  className,
  label,
  helperText,
  id,
  ...props
}: TextareaProps) {
  return (
    <div className="w-full">
      {label && <Label htmlFor={id}>{label}</Label>}
      <textarea
        className={cn(
          "w-full",
          "rounded-lg",
          "border",
          "border-border",
          "bg-surface",
          "px-3",
          "py-2.5",
          "text-sm",
          "text-text-primary",
          "leading-relaxed",
          "placeholder:text-text-secondary",
          "transition-colors",
          "duration-150",
          "focus:border-primary",
          "focus:outline-hidden",
          "focus:ring-2",
          "focus:ring-primary/20",
          "disabled:opacity-50",
          "disabled:cursor-not-allowed",
          "resize-y",
          className
        )}
        id={id}
        {...props}
      />
      {helperText && (
        <span className="mt-1.5 text-xs text-text-secondary">
          {helperText}
        </span>
      )}
    </div>
  );
}

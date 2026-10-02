import { cn } from "@/lib/cn";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Render a card with a surface background and subtle border */
  variant?: "surface" | "elevated";
  /**
   * Optional header slot.
   * @example <CardHeader><CardTitle>Title</CardTitle></CardHeader>
   */
  header?: React.ReactNode;
  /**
   * Optional footer slot for actions.
   */
  footer?: React.ReactNode;
}

/**
 * Operational card. Restrained radius (8px) with border + surface
 * contrast rather than heavy shadows.
 */
export function Card({
  className,
  variant = "surface",
  header,
  footer,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-surface",
        "border",
        "border-border",
        "rounded-lg",
        "shadow-sm",
        variant === "elevated" && "shadow-md",
        className
      )}
      {...props}
    >
      {(header || footer) && (
        <div
          className={cn(
            "flex",
            "flex-wrap",
            "items-center",
            "justify-between",
            "gap-3",
            "p-4",
            "border-b",
            "border-border"
          )}
        >
          {header}
          {footer}
        </div>
      )}
      <div className={cn("p-4", header || footer ? "pt-0" : "pt-0")}>
        {children}
      </div>
    </div>
  );
}

export interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "end" | "center";
}

export function CardHeader({
  className,
  align = "start",
  children,
  ...props
}: CardHeaderProps) {
  return (
    <div
      className={cn(
        "flex",
        "flex-wrap",
        "items-start",
        "justify-" + align,
        "gap-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export function CardTitle({
  className,
  as: Tag = "h3",
  children,
  ...props
}: CardTitleProps) {
  return (
    <Tag
      className={cn("text-base", "font-semibold", "leading-tight", className)}
      {...props}
    >
      {children}
    </Tag>
  );
}

export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: "p";
}

export function CardDescription({
  className,
  as: Tag = "p",
  children,
  ...props
}: CardDescriptionProps) {
  return (
    <Tag
      className={cn("text-sm", "text-text-secondary", className)}
      {...props}
    >
      {children}
    </Tag>
  );
}

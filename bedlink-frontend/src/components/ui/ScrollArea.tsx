import { cn } from "@/lib/cn";
import { useRef, useCallback, useEffect } from "react";

export interface ScrollAreaProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Internal content wrapper (renders scrollable content) */
  children: React.ReactNode;
}

/**
 * Accessible scroll area. Uses native scroll on all browsers with a
 * restrained custom scrollbar for visual consistency.
 */
export function ScrollArea({
  className,
  children,
  ...props
}: ScrollAreaProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  const scrollToTop = useCallback(() => {
    rootRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    el.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative",
        "overflow-auto",
        "max-h-[calc(100vh-64px)]",
        className
      )}
      {...props}
    >
      <div className="min-w-full">{children}</div>
    </div>
  );
}

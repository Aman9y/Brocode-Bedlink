import { cn } from "@/lib/cn";
import { Skeleton } from "@/components/ui/Skeleton";

export interface LoadingSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {
    /** What the skeleton is waiting for; shows a meaningful message */
    loadingMessage?: string;
  }

/**
 * LoadingSkeleton — meaningful loading message, not a blank screen.
 * Messages are operational and purpose-driven.
 */
export function LoadingSkeleton({
  className,
  loadingMessage = "Loading...",
  ...props
}: LoadingSkeletonProps) {
  return (
    <div
      className={cn(
        "flex",
        "flex-col",
        "gap-3",
        "rounded-xl",
        "border",
        "border-border",
        "bg-surface",
        "p-5",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2 text-sm font-semibold text-text-secondary">
        <div className="size-3.5 animate-pulse rounded-full bg-border" />
        {loadingMessage}
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-4/6" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  );
}

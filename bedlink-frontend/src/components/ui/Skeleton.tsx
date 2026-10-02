import { cn } from "@/lib/cn";

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Shimmer animation (default) or static placeholder */
  animated?: boolean;
}

/**
 * Skeleton loader — meaningful loading state, not a blank screen.
 * Used throughout for content that is fetching.
 */
export function Skeleton({
  className,
  animated = true,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "skeleton",
        !animated && "bg-border",
        className
      )}
      {...props}
    />
  );
}

export function SkeletonText({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "space-y-1",
        "w-full",
        className
      )}
      {...props}
    >
      <Skeleton className="h-3 w-1/3" />
      <Skeleton className="h-3 w-2/3" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  );
}

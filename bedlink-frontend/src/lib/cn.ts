import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";



/**
 * Utility that merges class names using clsx and tailwind-merge.
 * Ensures Tailwind's conflict-resolution works even when using
 * the class-variance-authority (cva) pattern.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

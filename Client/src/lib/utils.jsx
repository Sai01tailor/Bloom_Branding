import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names and merges Tailwind classes 
 * to prevent styling conflicts.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
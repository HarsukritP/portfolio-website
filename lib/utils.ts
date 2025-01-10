import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function easeInOut(current: number, target: number, factor: number = 0.1): number {
  return current + (target - current) * factor
}
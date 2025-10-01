import { clsx, type ClassValue } from "clsx";
import type { href } from "react-router";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Path = Parameters<typeof href>[0];

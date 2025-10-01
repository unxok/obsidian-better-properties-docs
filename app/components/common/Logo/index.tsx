import type { ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const Logo = ({ className, ...props }: ComponentProps<"svg">) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("lucide lucide-archive-icon lucide-archive", className)}
    version="1.1"
    id="svg2"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs id="defs2" />
    <rect width="20" height="5" x="2" y="3" rx="1" id="rect1" />
    <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" id="path1" />
    <path d="M 8.4652135,14.551529 H 15.484517" id="path2" />
    <path d="m 12.030728,11.09421 v 7.019302" id="path2-5" />
  </svg>
);

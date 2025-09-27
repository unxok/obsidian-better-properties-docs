import { ExternalLink } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const EditOnGithub = ({
	path,
	className,
}: {
	path: string;
	className?: string;
}) => (
	<a
		className={cn("flex gap-[.75ch] items-center", className)}
		href={
			"https://github.com/unxok/obsidian-better-properties-docs/app/articles/" +
			path +
			".mdx"
		}
	>
		<span>Edit this page on Github</span>
		<ExternalLink size={"1rem"} />
	</a>
);

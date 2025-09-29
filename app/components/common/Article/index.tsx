import { useEffect, type ReactNode } from "react";
import { EditOnGithub } from "../EditOnGithub";
import type { TocItem } from "rehype-mdx-toc";
import { useToc } from "../TocSidebar";
import { Link } from "react-router";
import { cn, type Path } from "~/lib/utils";
import { buttonVariants } from "~/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Article = ({
	children,
	path,
	toc,
	next,
}: {
	children: ReactNode;
	path: string;
	toc: TocItem[];
	next?: {
		path: Path;
		label: string;
	};
}): ReactNode => {
	const { setToc } = useToc();

	useEffect(() => {
		if (!toc) return;
		setToc(() => [...toc]);
	}, [toc]);
	return (
		<div className='flex w-full justify-center max-w-[95%] mx-auto'>
			<article className='typography pt-12 pb-72 w-full h-fit max-w-[80ch]'>
				{children}
				<hr />
				<div className='flex flex-wrap gap-4 items-center justify-between w-full'>
					<EditOnGithub path={path} />
					{next && (
						<Link
							to={next.path}
							className={cn(
								buttonVariants({ variant: "secondary" }),
								"no-underline"
							)}
						>
							{next.label}
							<ArrowRight />
						</Link>
					)}
				</div>
			</article>
		</div>
	);
};

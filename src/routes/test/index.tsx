import { createFileRoute } from "@tanstack/react-router";

import Markdown, { toc } from "./index.mdx";

export const Route = createFileRoute("/test/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className='prose dark:prose-invert'>
			<div>
				TOC:
				<br />
				<ul>
					{toc?.map(({ value }, index) => (
						<li key={`${value}-${index}`}>{value}</li>
					))}
				</ul>
			</div>
			<Markdown />
		</div>
	);
}

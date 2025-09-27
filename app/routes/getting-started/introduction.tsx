import { EditOnGithub } from "~/components/common/EditOnGithub";
import type { Route } from "../../+types/root";
import Introduction, {
	// @ts-expect-error TODO named imports from *.mdx not being recognized by TS
	toc,
} from "~/articles/introduction.mdx";
import type { ReactNode } from "react";
import { Article } from "~/components/common/Article";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Introduction | Better Properties Docs" },
		{
			name: "description",
			content: "Getting started with Better Properties",
		},
	];
}

export default function Home({}: Route.ComponentProps) {
	console.log(toc);
	return (
		<Article
			path='introduction'
			toc={toc}
		>
			<Introduction />
		</Article>
	);
}

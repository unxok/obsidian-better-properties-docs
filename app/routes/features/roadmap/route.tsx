import MdxArticle, {
	// @ts-expect-error TODO named imports from *.mdx not being recognized by TS
	toc,
	// @ts-expect-error
	filepath,
} from "./article.mdx";
import { Article } from "~/components/common/Article";
import type { components } from "@octokit/openapi-types";
import type { Route } from "./+types/route";
import { ArrowUp, MessageSquare } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

type Issue = components["schemas"]["issue"];

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Roadmap | Better Properties Docs" },
		{
			name: "description",
			content: "Features roadmap",
		},
	];
}

export async function loader({ context }: Route.LoaderArgs) {
	// TODO catch errors
	const token = context.cloudflare.env["GITHUB_PAT"];
	const res = await fetch(
		"https://api.github.com/repos/unxok/obsidian-better-properties/issues",
		{
			headers: {
				"Accept": "application/vnd.github+json",
				"User-Agent": "obsidian-better-properties-docs",
				// "Access-Control-Allow-Origin": "*",
				// "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
				// "Access-Control-Max-Age": "86400",
				"Authorization": `Bearer ${token}`,
				"X-GitHub-Api-Version": "2022-11-28",
			},
			mode: "cors",
		}
	);
	const issues: Issue[] = await res.json();
	return issues;
}

export default function Route({ loaderData }: Route.ComponentProps) {
	return (
		<Article
			path={filepath}
			toc={toc}
			// next={{
			// 	label: "Installation",
			// 	path: "/getting-started/installation",
			// }}
		>
			<MdxArticle
				components={{
					RoadmapIssues() {
						return (
							<IssuesList
								issues={loaderData
									.filter((issue) =>
										issue.labels.some((l) => {
											const label = typeof l === "string" ? l : (l.name ?? "");
											return label?.toLowerCase().includes("roadmap");
										})
									)
									.sort((a, b) => {
										const upvotes = (i: Issue) => i.reactions?.["+1"] ?? 0;
										const au = upvotes(a);
										const bu = upvotes(b);
										if (au > bu) return 1;
										if (au < bu) return -1;
										return 0;
									})}
							/>
						);
					},
					BugIssues() {
						return (
							<IssuesList
								issues={loaderData
									.filter((issue) =>
										issue.labels.some((l) => {
											const label = typeof l === "string" ? l : (l.name ?? "");
											return label?.toLowerCase().includes("bug");
										})
									)
									.sort((a, b) => {
										const upvotes = (i: Issue) => i.reactions?.["+1"] ?? 0;
										const au = upvotes(a);
										const bu = upvotes(b);
										if (au > bu) return 1;
										if (au < bu) return -1;
										return 0;
									})}
							/>
						);
					},
					FeatureIssues() {
						return (
							<IssuesList
								issues={loaderData
									.filter((issue) =>
										issue.labels.some((l) => {
											const label = typeof l === "string" ? l : (l.name ?? "");
											return (
												label?.toLowerCase().includes("feature request") &&
												!label?.toLowerCase().includes("roadmap")
											);
										})
									)
									.sort((a, b) => {
										const upvotes = (i: Issue) => i.reactions?.["+1"] ?? 0;
										const au = upvotes(a);
										const bu = upvotes(b);
										if (au > bu) return 1;
										if (au < bu) return -1;
										return 0;
									})}
							/>
						);
					},
				}}
			/>
		</Article>
	);
}

const IssuesList = ({ issues }: { issues: Issue[] }) => {
	//
	return (
		<ul>
			{issues.map(({ id, url, title, comments, reactions }) => (
				<li key={id}>
					<div className='flex gap-2 items-center'>
						<a href={url}>{title}</a>
						<Badge
							className='h-5 rounded-full'
							variant={"outline"}
						>
							<MessageSquare />
							{comments}
						</Badge>
						<Badge className='h-5 rounded-full'>
							<ArrowUp />
							{reactions?.["+1"] ?? 0}
						</Badge>
					</div>
				</li>
			))}
			{issues.length === 0 && <li className='text-muted'>No issues found</li>}
		</ul>
	);
};

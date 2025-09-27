import type { ReactNode } from "react";
import { EditOnGithub } from "../EditOnGithub";
import type { HeadingDepth, TocItem } from "rehype-mdx-toc";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarRail,
} from "~/components/ui/sidebar";
import { Link, href } from "react-router";
import { Logo } from "../Logo";
import { Header } from "../Header";

export const Article = ({
	children,
	path,
	toc,
}: {
	children: ReactNode;
	path: string;
	toc?: TocItem[];
}): ReactNode => {
	return (
		<div className='flex w-full'>
			<article className='typography w-full max-w-[80ch] mx-auto'>
				{children}
				<hr />
				<EditOnGithub path={path} />
			</article>
			<Sidebar
				collapsible='offcanvas'
				side='right'
			>
				<SidebarHeader>
					<Header />
				</SidebarHeader>
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupLabel>On this page</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{nestTocByDepth(toc ?? []).map((item) =>
									renderNestedMenu(item)
								)}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
				<SidebarRail />
			</Sidebar>
		</div>
	);
};

const renderNestedMenu = (item: TreeNode) => (
	<SidebarMenuItem key={item.id}>
		<SidebarMenuButton asChild>
			<Link
				to={{
					hash: item.href,
				}}
			>
				{item.value}
			</Link>
		</SidebarMenuButton>
		{item.children.length ? (
			<SidebarMenuSub>
				{item.children.map((subItem) => renderNestedMenu(subItem))}
			</SidebarMenuSub>
		) : undefined}
	</SidebarMenuItem>
);

type TreeNode = TocItem & { children: TreeNode[] };

const nestTocByDepth = (toc: readonly TocItem[]): TreeNode[] => {
	const roots: TreeNode[] = [];
	const stack: TreeNode[] = [];

	for (const item of toc) {
		const depth = Math.max(1, Number(item.depth));
		const node: TreeNode = { ...item, children: [] };

		stack.length = Math.min(stack.length, depth - 1);

		if (stack.length === 0) {
			roots.push(node);
		} else {
			stack[stack.length - 1].children.push(node);
		}

		stack[depth - 1] = node;
	}

	return roots;
};

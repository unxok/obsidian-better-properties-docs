import type { ComponentProps, ReactNode } from "react";
import {
	Meta,
	Links,
	ScrollRestoration,
	Scripts,
	Link,
	href,
	NavLink as BaseNavLink,
} from "react-router";
import { Header } from "~/components/common/Header";
import { ThemeProvider } from "~/components/common/ThemeSwitcher";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarRail,
} from "~/components/ui/sidebar";
import { Logo } from "./components/common/Logo";
import "./typography.css";
import { cn } from "./lib/utils";

export const Layout = ({ children }: { children: ReactNode }): ReactNode => {
	return (
		<html lang='en'>
			<head>
				<meta charSet='utf-8' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
				<Meta />
				<Links />
			</head>
			<body>
				<ThemeProvider>
					{/* <div className='fixed inset-0 bg-background flex flex-col text-foreground'> */}
					<SidebarProvider>
						<SiteSidebar />
						<div className='w-full py-6 px-4'>
							<Header />
							<main>
								{children}
								<ScrollRestoration />
								<Scripts />
							</main>
						</div>
					</SidebarProvider>
					{/* </div> */}
				</ThemeProvider>
			</body>
		</html>
	);
};

const SiteSidebar = (): ReactNode => {
	return (
		<Sidebar collapsible='offcanvas'>
			<SidebarHeader>
				<h1 className='text-lg text-nowrap font-mono font-semibold flex items-center gap-[0.75ch] pt-4'>
					<Logo />
					<span>Better Properties</span>
				</h1>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Getting started</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<NavLink to={href("/")}>Introduction</NavLink>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
};

const NavLink = ({
	className,
	...props
}: ComponentProps<typeof BaseNavLink>): ReactNode => (
	<BaseNavLink
		className={({ isActive }) => {
			const defaultClassName = "";
			return cn(defaultClassName, isActive && "bg-secondary", className);
		}}
		{...props}
	/>
);

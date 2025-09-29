import { useState, type ComponentProps, type ReactNode } from "react";
import {
	Meta,
	Links,
	ScrollRestoration,
	Scripts,
	href,
	NavLink as BaseNavLink,
} from "react-router";
import {
	ThemeProvider,
	ThemeSwitcher,
} from "~/components/common/ThemeSwitcher";
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
	useSidebar,
} from "~/components/ui/sidebar";
import { Logo } from "./components/common/Logo";
import "./typography.css";
import "./index.css";
import { cn } from "./lib/utils";
import { RightSidebar, TocProvider } from "./components/common/TocSidebar";
import { Coffee, ExternalLink, Menu, PanelRight } from "lucide-react";
import { Button, buttonVariants } from "./components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { GithubIcon } from "./components/common/GithubIcon";

export const Layout = ({ children }: { children: ReactNode }): ReactNode => {
	const [leftOpen, setLeftOpen] = useState<boolean>(true);
	const [rightOpen, setRightOpen] = useState<boolean>(true);
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
					<TocProvider>
						<div className='fixed inset-0 bg-inherit text-inherit flex flex-col'>
							<div className='lg:hidden'>
								<Header
									toggleLeftSidebar={() => setLeftOpen((prev) => !prev)}
									toggleRightSidebar={() => setRightOpen((prev) => !prev)}
								/>
							</div>
							<div className='flex w-full'>
								<SidebarProvider
									className='w-fit'
									open={leftOpen}
									onOpenChange={setLeftOpen}
								>
									<LeftSidebar />
								</SidebarProvider>
								<main className='h-screen w-full overflow-y-auto bg-background'>
									{children}
									<ScrollRestoration />
									<Scripts />
								</main>
								<SidebarProvider
									className='w-fit'
									open={rightOpen}
									onOpenChange={setRightOpen}
								>
									<RightSidebar />
								</SidebarProvider>
							</div>
						</div>
					</TocProvider>
				</ThemeProvider>
			</body>
		</html>
	);
};

const LeftSidebar = (): ReactNode => {
	const { toggleSidebar } = useSidebar();

	return (
		<Sidebar collapsible='offcanvas'>
			{/* <SidebarHeader>
					<h1 className='text-lg text-nowrap font-mono font-semibold flex items-center gap-[0.75ch] pt-4'>
						<Logo />
						<span>Better Properties</span>
					</h1>
				</SidebarHeader> */}
			<SidebarHeader>
				<header className='py-1 w-full justify-center hidden lg:flex'>
					<H1 />
				</header>
				<div className='flex items-center gap-1 w-full justify-around'>
					<a
						title='Buy me a coffee'
						href='https://buymeacoffee.com/unxok'
						className={buttonVariants({ variant: "ghost", size: "icon" })}
					>
						<Coffee />
					</a>
					<GithubButton />
					<ThemeSwitcher />
				</div>
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
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<NavLink to={href("/getting-started/installation")}>
										Installation
									</NavLink>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<NavLink to={href("/getting-started/usage")}>Usage</NavLink>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>Features</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<NavLink to={href("/features/roadmap")}>
										Roadmap, bugs, and more
									</NavLink>
								</SidebarMenuButton>
							</SidebarMenuItem>
							{/* <SidebarMenuItem>
								<SidebarMenuButton>Property types</SidebarMenuButton>
								<SidebarMenuSub>
									<SidebarMenuItem>
										<SidebarMenuButton>Array</SidebarMenuButton>
									</SidebarMenuItem>
								</SidebarMenuSub>
							</SidebarMenuItem> */}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter className='text-center font-semibold font-mono'>
				Made with &lt;3 by Unxok
			</SidebarFooter>
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

const GithubButton = (): ReactNode => (
	<DropdownMenu>
		<DropdownMenuTrigger asChild>
			<Button
				title='Github links'
				variant={"ghost"}
				size={"icon"}
			>
				<GithubIcon />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align='end'>
			<DropdownMenuItem asChild>
				<a href='https://github.com/unxok/obsidian-better-properties-docs'>
					<span>Docs</span>
					<ExternalLink />
				</a>
			</DropdownMenuItem>
			<DropdownMenuItem asChild>
				<a href='https://github.com/unxok/obsidian-better-properties'>
					<span>Plugin</span>
					<ExternalLink />
				</a>
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
);

const Header = ({
	toggleLeftSidebar,
	toggleRightSidebar,
}: {
	toggleLeftSidebar: () => void;
	toggleRightSidebar: () => void;
}) => {
	return (
		<header className='flex items-center justify-between gap-1 px-2 py-2 border-b-1 bg-background'>
			<div className='flex gap-1 items-center'>
				<Button
					onClick={toggleLeftSidebar}
					variant={"ghost"}
					size={"icon"}
				>
					<Menu />
				</Button>
				<H1 />
			</div>
			<Button
				variant={"ghost"}
				size={"icon"}
				onClick={toggleRightSidebar}
			>
				<PanelRight />
			</Button>
		</header>
	);
};

const H1 = () => (
	<h1 className='flex font-bold tracking-wide items-center gap-[.5ch] text-lg'>
		<Logo
			width={18}
			height={18}
			className='mb-0.5'
		/>
		<span>Better Properties Docs</span>
	</h1>
);

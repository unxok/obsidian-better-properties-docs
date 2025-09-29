import type { ReactNode } from "react";
import { ThemeSwitcher } from "~/components/common/ThemeSwitcher";
import { Button, buttonVariants } from "~/components/ui/button";
import { GithubIcon } from "~/components/common/GithubIcon";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Coffee, ExternalLink } from "lucide-react";

export const Header = (): ReactNode => (
	<header
		className='flex items-center gap-1 w-full justify-around
	
	'
	>
		<a
			title='Buy me a coffee'
			href='https://buymeacoffee.com/unxok'
			className={buttonVariants({ variant: "ghost" })}
		>
			<Coffee />
		</a>
		<GithubButton />
		<ThemeSwitcher />
	</header>
);

const GithubButton = (): ReactNode => (
	<DropdownMenu>
		<DropdownMenuTrigger asChild>
			<Button
				title='Github links'
				variant={"ghost"}
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

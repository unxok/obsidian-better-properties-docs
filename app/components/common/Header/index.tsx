import type { ReactNode } from "react";
import { Logo } from "~/components/common/Logo";
import { ThemeSwitcher } from "~/components/common/ThemeSwitcher";
import { Button } from "~/components/ui/button";
import { GithubIcon } from "~/components/common/GithubIcon";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { ExternalLink } from "lucide-react";

export const Header = (): ReactNode => (
	<header className='flex items-center gap-1 w-full justify-end'>
		<GithubButton />
		<ThemeSwitcher />
	</header>
);

const GithubButton = (): ReactNode => (
	<DropdownMenu>
		<DropdownMenuTrigger asChild>
			<Button variant={"ghost"}>
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

import type { Route } from "./+types/route";
import MdxArticle, {
  // @ts-expect-error TODO named imports from *.mdx not being recognized by TS
  toc,
  // @ts-expect-error
  filepath,
} from "./article.mdx";
import { Article } from "~/components/common/Article";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Installation | Better Properties Docs" },
    {
      name: "description",
      content: "Installing Better Properties",
    },
  ];
}

export default function Route({}: Route.ComponentProps) {
  return (
    <Article
      path={filepath}
      toc={toc}
      next={{
        label: "Usage",
        path: "/getting-started/usage",
      }}
    >
      <MdxArticle />
    </Article>
  );
}

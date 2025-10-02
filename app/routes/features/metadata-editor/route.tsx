import MdxArticle, {
  // @ts-expect-error TODO named imports from *.mdx not being recognized by TS
  toc,
  // @ts-expect-error
  filepath,
} from "./article.mdx";
import { Article } from "~/components/common/Article";
import type { Route } from "./+types/route";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Metadata Editor | Better Properties Docs" },
    {
      name: "description",
      content: "Metadata Editor features",
    },
  ];
}

// export async function loader({ context }: Route.LoaderArgs) {
// }

export default function Route({ loaderData }: Route.ComponentProps) {
  return (
    <Article
      path={filepath}
      toc={toc}
      next={{
        label: "Property types",
        path: "/features/property-types",
      }}
    >
      <MdxArticle />
    </Article>
  );
}

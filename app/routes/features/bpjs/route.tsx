import type { Route } from "./+types/route";
import MdxArticle, {
  // @ts-expect-error TODO named imports from *.mdx not being recognized by TS
  toc,
  // @ts-expect-error
  filepath,
} from "./article.mdx";
import { Article } from "~/components/common/Article";
// import GetMetadataTypeDef from "./(method types)/getMetadata/index.mdx";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "bpjs | Better Properties Docs" },
    {
      name: "description",
      content: "how to use bpjs blocks",
    },
  ];
}

export default function Route({}: Route.ComponentProps) {
  return (
    <Article
      path={filepath}
      toc={toc}
      next={{
        label: "bpjs",
        path: "/features/bpjs",
      }}
    >
      <MdxArticle />
    </Article>
  );
}

// const GetMetadataType = () => (
// 	<InfoButton label={<code>function</code>}>
// 		<h4>Arguments</h4>
// 		<table>
// 			<thead>
// 				<tr>
// 					<th>Name</th>
// 					<th>Type</th>
// 					<th>Description</th>
// 				</tr>
// 			</thead>
// 			<tbody>
// 				<tr>
// 					<td>options</td>
// 					<td>
// 						<InfoButton
// 							label={<code className='text-nowrap'>object | undefined</code>}
// 						>
// 							<table>
// 								<thead>
// 									<tr>
// 										<th>Key</th>
// 										<th>Type</th>
// 										<th>Default</th>
// 									</tr>
// 								</thead>
// 								<tbody>
// 									<tr>
// 										<td>
// 											<InfoButton label='path'>
// 												The path to the file get the metadata of. Defaults to
// 												the path tha the bpjs block is rendered within.
// 											</InfoButton>
// 										</td>
// 										<td>
// 											<code>string | undefined</code>
// 										</td>
// 										<td>
// 											<code>api.sourcePath</code>
// 										</td>
// 									</tr>
// 									<tr>
// 										<td>
// 											<InfoButton label='subscribe'>
// 												Whether to re-render when the file at the provided path
// 												has vault events (rename, delete, etc.) or has it's
// 												metadata cache changed.
// 											</InfoButton>
// 										</td>
// 										<td>
// 											<code>boolean | undefined</code>
// 										</td>
// 										<td>
// 											<code>true</code>
// 										</td>
// 									</tr>
// 								</tbody>
// 							</table>
// 						</InfoButton>
// 					</td>
// 					<td>options for this method</td>
// 				</tr>
// 			</tbody>
// 		</table>
// 		<h4>Returns</h4>
// 		<a href='https://docs.obsidian.md/Reference/TypeScript+API/CachedMetadata'>
// 			<code>CachedMetadata</code>
// 		</a>
// 		<h4>Examples</h4>
// 		<pre>
// 			<code>
// 				api.getMetadata()
// 				<br />
// 				<br />
// 				api.getMetadata(&#123;path: "path/to/note.md"&#125;)
// 				<br />
// 				<br />
// 				api.getMetadata(&#123;subscribe: false&#125;)
// 				<br />
// 				<br />
// 				api.getMetadata(&#123;
// 				<br />
// 				&nbsp;&nbsp; path: "path/to/note.md",
// 				<br />
// 				&nbsp;&nbsp; subscribe: false,
// 				<br />
// 				&#125;)
// 			</code>
// 		</pre>
// 	</InfoButton>
// );

// const GetPropertyType = () => (
// 	<InfoButton label={<code>function</code>}>
// 		<h4>Arguments</h4>
// 		<table>
// 			<thead>
// 				<tr>
// 					<th>Name</th>
// 					<th>Type</th>
// 					<th>Description</th>
// 				</tr>
// 			</thead>
// 			<tbody>
// 				<tr>
// 					<td>options</td>
// 					<td>
// 						<InfoButton label={<code>object</code>}>
// 							<table>
// 								<thead>
// 									<tr>
// 										<th>Key</th>
// 										<th>Type</th>
// 										<th>Default</th>
// 									</tr>
// 								</thead>
// 								<tbody>
// 									<tr>
// 										<td>
// 											<InfoButton label='property'>
// 												The property name to get the value of.
// 											</InfoButton>
// 										</td>
// 										<td>
// 											<code>string</code>
// 										</td>
// 										<td>-</td>
// 									</tr>
// 									<tr>
// 										<td>
// 											<InfoButton label='path'>
// 												The path to the file get the property from. Defaults to
// 												the path tha the bpjs block is rendered within.
// 											</InfoButton>
// 										</td>
// 										<td>
// 											<code>string | undefined</code>
// 										</td>
// 										<td>
// 											<code>api.sourcePath</code>
// 										</td>
// 									</tr>
// 									<tr>
// 										<td>
// 											<InfoButton label='subscribe'>
// 												Whether to re-render when the file at the provided path
// 												has vault events (rename, delete, etc.) or has it's
// 												metadata cache changed.
// 											</InfoButton>
// 										</td>
// 										<td>
// 											<code>boolean | undefined</code>
// 										</td>
// 										<td>
// 											<code>true</code>
// 										</td>
// 									</tr>
// 								</tbody>
// 							</table>
// 						</InfoButton>
// 					</td>
// 					<td>options for this method</td>
// 				</tr>
// 			</tbody>
// 		</table>
// 		<h4>Returns</h4>
// 		<code>unknown</code>
// 		<h4>Examples</h4>
// 		<pre>
// 			<code>
// 				api.getProperty(&#123;property: "somePropertyName"&#125;)
// 				<br />
// 				<br />
// 				api.getProperty(&#123;
// 				<br />
// 				&nbsp;&nbsp; property: "somePropertyName",
// 				<br />
// 				&nbsp;&nbsp; path: "path/to/note.md",
// 				<br />
// 				&#125;)
// 				<br />
// 				<br />
// 				api.getProperty(&#123;
// 				<br />
// 				&nbsp;&nbsp; property: "somePropertyName",
// 				<br />
// 				&nbsp;&nbsp; subscribe: false,
// 				<br />
// 				&#125;)
// 				<br />
// 				<br />
// 				api.getProperty(&#123;
// 				<br />
// 				&nbsp;&nbsp; property: "somePropertyName",
// 				<br />
// 				&nbsp;&nbsp; path: "path/to/note.md",
// 				<br />
// 				&nbsp;&nbsp; subscribe: false,
// 				<br />
// 				&#125;)
// 			</code>
// 		</pre>
// 	</InfoButton>
// );

// const RenderPropertyType = () => (
// 	<InfoButton label={<code>function</code>}>
// 		<h4>Arguments</h4>
// 		<table>
// 			<thead>
// 				<tr>
// 					<th>Name</th>
// 					<th>Type</th>
// 					<th>Description</th>
// 				</tr>
// 			</thead>
// 			<tbody>
// 				<tr>
// 					<td>options</td>
// 					<td>
// 						<InfoButton label={<code>object</code>}>
// 							<table>
// 								<thead>
// 									<tr>
// 										<th>Key</th>
// 										<th>Type</th>
// 										<th>Default</th>
// 									</tr>
// 								</thead>
// 								<tbody>
// 									<tr>
// 										<td>
// 											<InfoButton label='property'>
// 												The property name to get the value of.
// 											</InfoButton>
// 										</td>
// 										<td>
// 											<code>string</code>
// 										</td>
// 										<td>-</td>
// 									</tr>
// 									<tr>
// 										<td>
// 											<InfoButton label='path'>
// 												The path to the file get the property from. Defaults to
// 												the path tha the bpjs block is rendered within.
// 											</InfoButton>
// 										</td>
// 										<td>
// 											<code>string | undefined</code>
// 										</td>
// 										<td>
// 											<code>api.sourcePath</code>
// 										</td>
// 									</tr>
// 									<tr>
// 										<td>
// 											<InfoButton label='subscribe'>
// 												Whether to re-render when the file at the provided path
// 												has vault events (rename, delete, etc.) or has it's
// 												metadata cache changed.
// 											</InfoButton>
// 										</td>
// 										<td>
// 											<code>boolean | undefined</code>
// 										</td>
// 										<td>
// 											<code>true</code>
// 										</td>
// 									</tr>
// 									<tr>
// 										<td>
// 											<InfoButton label='el'>
// 												The element to render the property within.
// 											</InfoButton>
// 										</td>
// 										<td>
// 											<code>HTMLElement | undefined</code>
// 										</td>
// 										<td>
// 											<code>api.el</code>
// 										</td>
// 									</tr>
// 									<tr>
// 										<td>
// 											<InfoButton label='hideKey'>
// 												Whether to hide the key element of the rendered
// 												property.
// 											</InfoButton>
// 										</td>
// 										<td>
// 											<code>boolean | undefined</code>
// 										</td>
// 										<td>
// 											<code>false</code>
// 										</td>
// 									</tr>
// 								</tbody>
// 							</table>
// 						</InfoButton>
// 					</td>
// 					<td>options for this method</td>
// 				</tr>
// 			</tbody>
// 		</table>
// 		<h4>Returns</h4>
// 		<code>PropertyWidgetComponent</code>
// 		<h4>Examples</h4>
// 		<pre>
// 			<code>
// 				api.renderProperty(&#123;property: "somePropertyName"&#125;)
// 				<br />
// 				<br />
// 				api.renderProperty(&#123;
// 				<br />
// 				&nbsp;&nbsp; property: "somePropertyName",
// 				<br />
// 				&nbsp;&nbsp; path: "path/to/note.md",
// 				<br />
// 				&#125;)
// 				<br />
// 				<br />
// 				api.renderProperty(&#123;
// 				<br />
// 				&nbsp;&nbsp; property: "somePropertyName",
// 				<br />
// 				&nbsp;&nbsp; subscribe: false,
// 				<br />
// 				&#125;)
// 				<br />
// 				<br />
// 				api.renderProperty(&#123;
// 				<br />
// 				&nbsp;&nbsp; property: "somePropertyName",
// 				<br />
// 				&nbsp;&nbsp; path: "path/to/note.md",
// 				<br />
// 				&nbsp;&nbsp; subscribe: false,
// 				<br />
// 				&nbsp;&nbsp; el: api.el.createDiv(),
// 				<br />
// 				&nbsp;&nbsp; hideKey: true,
// 				<br />
// 				&#125;)
// 			</code>
// 		</pre>
// 	</InfoButton>
// );

// const MarkdownType = () => (
// 	<InfoButton label={<code className='text-nowrap'>async function</code>}>
// 		<h4>Arguments</h4>
// 		<table>
// 			<thead>
// 				<tr>
// 					<th>Name</th>
// 					<th>Type</th>
// 					<th>Description</th>
// 				</tr>
// 			</thead>
// 			<tbody>
// 				<tr>
// 					<td>options</td>
// 					<td>
// 						<InfoButton label={<code>object</code>}>
// 							<table>
// 								<thead>
// 									<tr>
// 										<th>Key</th>
// 										<th>Type</th>
// 										<th>Default</th>
// 									</tr>
// 								</thead>
// 								<tbody>
// 									<tr>
// 										<td>
// 											<InfoButton label='text'>
// 												The plaintext in markdown format to render to HTML
// 											</InfoButton>
// 										</td>
// 										<td>
// 											<code>string</code>
// 										</td>
// 										<td>-</td>
// 									</tr>
// 									<tr>
// 										<td>
// 											<InfoButton label='el'>
// 												The element to render the parsed markdown HTML into.
// 											</InfoButton>
// 										</td>
// 										<td>
// 											<code>HTMLElement | undefined</code>
// 										</td>
// 										<td>
// 											<code>api.el</code>
// 										</td>
// 									</tr>
// 								</tbody>
// 							</table>
// 						</InfoButton>
// 					</td>
// 					<td>options for this method</td>
// 				</tr>
// 			</tbody>
// 		</table>
// 		<h4>Returns</h4>
// 		<code>void</code>
// 		<h4>Examples</h4>
// 		<pre>
// 			<code>
// 				api.markdown(&#123;text: "*some* **markdown** \n here"&#125;)
// 				<br />
// 				<br />
// 				api.markdown(&#123;
// 				<br />
// 				&nbsp;&nbsp; text: "*some* **markdown** \n here",
// 				<br />
// 				&nbsp;&nbsp; el: api.el.createDiv(),
// 				<br />
// 				&#125;)
// 			</code>
// 		</pre>
// 	</InfoButton>
// );

// const ImportType = () => (
// 	<InfoButton label={<code className='text-nowrap'>async function</code>}>
// 		<h4>Arguments</h4>
// 		<table>
// 			<thead>
// 				<tr>
// 					<th>Name</th>
// 					<th>Type</th>
// 					<th>Description</th>
// 				</tr>
// 			</thead>
// 			<tbody>
// 				<tr>
// 					<td>path</td>
// 					<td>
// 						<code>string</code>
// 					</td>
// 					<td>
// 						The path to the file to import. Supported extensions are{" "}
// 						<code>.js</code>, <code>.css</code>, <code>.json</code>,{" "}
// 						<code>.yaml</code>, <code>.csv</code>, <code>.tsv</code>,{" "}
// 						<code>.md</code>, and <code>.txt</code>
// 					</td>
// 				</tr>
// 				<tr>
// 					<td>data</td>
// 					<td>
// 						<code className='text-nowrap'>string | undefined</code>
// 					</td>
// 					<td>
// 						For <code>.csv</code> and <code>.tsv</code> files, this can be used
// 						to set a custom delimiter.
// 					</td>
// 				</tr>
// 			</tbody>
// 		</table>
// 		<h4>Returns</h4>
// 		<InfoButton label={<code>Promise&lt;unknown&gt;</code>}>
// 			<ul>
// 				<li>
// 					<code>.js</code> - executes the javascript file and returns its
// 					default export. It can export with either ES6 syntax (
// 					<code>export default myFn</code>) or CommonJs syntax (
// 					<code>module.exports = myFn</code>).
// 				</li>
// 				<li>
// 					<code>.css</code> - injects the CSS styles into{" "}
// 					<code>api.styleEl</code>
// 				</li>
// 				<li>
// 					<code>.json</code> - returns file contents parsed as JSON
// 				</li>
// 				<li>
// 					<code>.yaml</code> - returns file contents parsed as YAML
// 				</li>
// 				<li>
// 					<code>.csv</code> - returns file contents parsed as a CSV to a
// 					<code>string[][]</code>
// 				</li>
// 				<li>
// 					<code>.tsv</code> - returns file contents parsed as a TSV to a
// 					<code>string[][]</code>
// 				</li>
// 				<li>
// 					<code>.md</code>, <code>.txt</code> - returns file contents
// 				</li>
// 			</ul>
// 		</InfoButton>
// 		<h4>Examples</h4>
// 		<pre>
// 			<code>
// 				const myFn = await api.import("path/to/file.js");
// 				<br />
// 				<br />
// 				// injects css into api.styleEl
// 				<br />
// 				await api.import("path/to/file.css");
// 				<br />
// 				<br />
// 				const json = await api.import("path/to/file.json");
// 				<br />
// 				const jsonFromYaml = await api.import("path/to/file.yaml");
// 				<br />
// 				<br />
// 				const csvArray = await api.import("path/to/file.csv"); const tsvArray =
// 				<br />
// 				await api.import("path/to/file.tsv");
// 				<br />
// 				<br />
// 				const mdContent = await api.import("path/to/file.md"); const txtContent
// 				= await api.import("path/to/file.txt");
// 			</code>
// 		</pre>
// 	</InfoButton>
// );

// https://docs.slatejs.org/walkthroughs/01-installing-slate
// https://docs.slatejs.org/walkthroughs/02-adding-event-handlers
// https://docs.slatejs.org/walkthroughs/03-defining-custom-elements
// Import React dependencies.
import { useCallback, useState } from "react";
// Import the Slate editor factory.
import { type BaseEditor, Editor, Element, Transforms, createEditor } from "slate";
// Import the Slate components and React plugin.
import { Editable, type ReactEditor, type RenderElementProps, Slate, withReact } from "slate-react";

type CustomElement = { type: "paragraph" | "code"; children: CustomText[] };
type CustomText = { text: string };

declare module "slate" {
	interface CustomTypes {
		Editor: BaseEditor & ReactEditor;
		Element: CustomElement;
		Text: CustomText;
	}
}

const initialValue: CustomElement[] = [
	{
		type: "paragraph",
		children: [{ text: "A line of text in a paragraph." }],
	},
];

// Define a React component renderer for our code blocks.
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const CodeElement = (props: RenderElementProps) => {
	return (
		<pre {...props.attributes}>
			<code>{props.children}</code>
		</pre>
	);
};
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const DefaultElement = (props: RenderElementProps) => {
	return <p {...props.attributes}>{props.children}</p>;
};

// Define our app...
const App = () => {
	// Create a Slate editor object that won't change across renders.
	const [editor] = useState(() => withReact(createEditor()));

	// Define a rendering function based on the element passed to `props`. We use
	// `useCallback` here to memoize the function for subsequent renders.
	const renderElement = useCallback((props: RenderElementProps) => {
		switch (props.element.type) {
			case "code":
				return <CodeElement {...props} />;
			default:
				return <DefaultElement {...props} />;
		}
	}, []);

	// Add the editable component inside the context.
	return (
		<Slate editor={editor} initialValue={initialValue}>
			<Editable
				renderElement={renderElement}
				onKeyDown={(event) => {
					if (event.key === "'" && event.ctrlKey) {
						// ctrl+`は使ってるので、ctrl+'に変更
						console.log("ctrl+' was pressed");
						event.preventDefault();
						// Determine whether any of the currently selected blocks are code blocks.
						const [match] = Editor.nodes(editor, {
							match: (n) => (n as Element).type === "code",
						});
						// Toggle the block type depending on whether there's already a match.
						Transforms.setNodes(
							editor,
							{ type: match ? "paragraph" : "code" },
							{ match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) },
						);
					}
				}}
			/>
		</Slate>
	);
};

export default App;

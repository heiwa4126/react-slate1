// https://docs.slatejs.org/walkthroughs/01-installing-slate
// https://docs.slatejs.org/walkthroughs/02-adding-event-handlers
// https://docs.slatejs.org/walkthroughs/03-defining-custom-elements
// https://docs.slatejs.org/walkthroughs/04-applying-custom-formatting
// Import React dependencies.
import { useCallback, useState } from "react";
// Import the Slate editor factory.
import { type BaseEditor, Editor, Element, Transforms, createEditor } from "slate";
// Import the Slate components and React plugin.
import {
	Editable,
	type ReactEditor,
	type RenderElementProps,
	RenderLeafProps,
	Slate,
	withReact,
} from "slate-react";

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
const CodeElement = (props: RenderElementProps) => {
	return (
		<pre {...props.attributes}>
			<code>{props.children}</code>
		</pre>
	);
};
const DefaultElement = (props: RenderElementProps) => {
	return <p {...props.attributes}>{props.children}</p>;
};

// Define a React component to render leaves with bold text.
// カスタムのLeaf型を定義
interface CustomLeaf {
	bold?: boolean;
	// 他のカスタム属性があればここに追加
}
const Leaf = (props: RenderLeafProps) => {
	return (
		<span
			{...props.attributes}
			style={{ fontWeight: (props.leaf as CustomLeaf).bold ? "bold" : "normal" }}
		>
			{props.children}
		</span>
	);
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

	// Define a leaf rendering function that is memoized with `useCallback`.
	const renderLeaf = useCallback((props: RenderLeafProps) => {
		return <Leaf {...props} />;
	}, []);

	// Add the editable component inside the context.
	return (
		<Slate editor={editor} initialValue={initialValue}>
			<Editable
				renderElement={renderElement}
				renderLeaf={renderLeaf}
				onKeyDown={(event) => {
					if (!event.ctrlKey) {
						return;
					}
					switch (event.key) {
						case "'": {
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
							break;
						}
						// When "B" is pressed, bold the text in the selection.
						case "b": {
							event.preventDefault();
							Editor.addMark(editor, "bold", true);
							break;
						}
					}
				}}
			/>
		</Slate>
	);
};

export default App;

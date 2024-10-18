// https://docs.slatejs.org/walkthroughs/01-installing-slate
// Import React dependencies.
import { useState } from "react";
// Import the Slate editor factory.
import { type BaseEditor, createEditor } from "slate";
// Import the Slate components and React plugin.
import { Editable, type ReactEditor, Slate, withReact } from "slate-react";

type CustomElement = { type: "paragraph"; children: CustomText[] };
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

// Define our app...
const App = () => {
	// Create a Slate editor object that won't change across renders.
	const [editor] = useState(() => withReact(createEditor()));
	// Add the editable component inside the context.
	return (
		<Slate editor={editor} initialValue={initialValue}>
			<Editable />
		</Slate>
	);
};

export default App;

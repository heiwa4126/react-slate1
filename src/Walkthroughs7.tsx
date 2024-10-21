// https://docs.slatejs.org/walkthroughs/07-enabling-collaborative-editing

import { useState } from "react";
import { type Descendant, createEditor } from "slate";
import { Editable, Slate, withReact } from "slate-react";

const initialValue: Descendant[] = [{ children: [{ text: "" }] }];

export const CollaborativeEditor = () => {
	return <SlateEditor />;
};

const SlateEditor = () => {
	const [editor] = useState(() => withReact(createEditor()));

	return (
		<Slate editor={editor} initialValue={initialValue}>
			<Editable />
		</Slate>
	);
};

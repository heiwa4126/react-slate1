// https://github.com/ianstormtaylor/slate/blob/main/site/examples/ts/plaintext.tsx
import { useMemo } from "react";
import { type Descendant, type Element, createEditor } from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, withReact } from "slate-react";

enum ElementType {
	Paragraph = "paragraph",
	Heading = "heading",
}

const PlainTextExample = () => {
	const editor = useMemo(() => withHistory(withReact(createEditor())), []);
	return (
		<Slate editor={editor} initialValue={initialValue}>
			<Editable placeholder="Enter some plain text..." />
		</Slate>
	);
};

// // Paragraph型のカスタム定義
// type ParagraphElement = {
// 	type: "paragraph";
// 	children: Descendant[];
// };

// または、Element型を継承してParagraphElement型を定義することもできる
interface ParagraphElement extends Element {
	// type: "paragraph";
	type: ElementType.Paragraph;
	children: Descendant[];
}
// https://docs.slatejs.org/concepts/12-typescript
// https://docs.slatejs.org/concepts/12-typescript#best-practices-for-element-and-text-types
// を参照

const initialValue: ParagraphElement[] = [
	{
		type: ElementType.Paragraph,
		children: [{ text: "This is editable plain text, just like a <textarea>!" }],
	},
	{
		type: ElementType.Paragraph,
		children: [{ text: "2行目!" }],
	},
];

// https://github.com/ianstormtaylor/slate/blob/main/site/examples/ts/plaintext.tsx にあった
// 元の設定
// const initialValue: Descendant[] = [
// 	{
// 		type: "paragraph",
// 		children: [{ text: "This is editable plain text, just like a <textarea>!" }],
// 	},
// ];

export default PlainTextExample;

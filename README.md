# react-slate1

リッチテキストエディタフレームワーク
[slate - npm](https://www.npmjs.com/package/slate)
を
TypeScript で使う練習。

## 開発

Vite で React で TypeScript で SWC なので普通に。

```sh
pnpm i
pnpm dev
pnpm run build && pnpm preview
```

## 参考

- [TypeScript | Slate](https://docs.slatejs.org/concepts/12-typescript)
- [slate/site/examples/ts/plaintext.tsx at main · ianstormtaylor/slate](https://github.com/ianstormtaylor/slate/blob/main/site/examples/ts/plaintext.tsx)

## Walkthrough メモ

### 1

[Installing Slate | Slate](https://docs.slatejs.org/walkthroughs/01-installing-slate)

```typescript
type CustomElement = { type: "paragraph"; children: CustomText[] };
type CustomText = { text: string };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
```

このコードは、TypeScript を使用して React プロジェクト内でカスタム型を定義し、Slate エディタの型定義を拡張するためのものです。以下に詳細を説明します。

まず、CustomElement と CustomText という 2 つの型が定義されています。CustomElement は、type プロパティが"paragraph"であり、children プロパティが CustomText 型の配列であるオブジェクトを表します。一方、CustomText は、text プロパティを持つ単純なオブジェクトです。これらの型は、Slate エディタ内で使用されるカスタム要素とテキストを表現するために使用されます。

次に、slate モジュールの型定義を拡張するための宣言が行われています。declare module "slate"という宣言は、既存の slate モジュールに新しい型情報を追加するためのものです。この中で、CustomTypes というインターフェースが定義されており、Editor、Element、および Text という 3 つのプロパティを持ちます。Editor は BaseEditor と ReactEditor の両方を拡張した型であり、Element は先ほど定義した CustomElement 型、Text は同じく先ほど定義した CustomText 型です。

このようにして、Slate エディタを使用する際に、カスタム要素やテキストの型情報を明示的に定義することができ、型安全性を高めることができます。これにより、開発者はエディタ内で使用するデータ構造が正しいことを保証しやすくなります。

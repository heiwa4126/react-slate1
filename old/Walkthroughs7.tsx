// https://docs.slatejs.org/walkthroughs/07-enabling-collaborative-editing

import { useEffect, useState } from "react";
import { type Descendant, createEditor } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import { withYjs, YjsEditor } from '@slate-yjs/core'
import * as Y from 'yjs'

const initialValue: Descendant[] = [{ children: [{ text: "" }] }];

export const CollaborativeEditor = () => {
  const [connected, setConnected] = useState(false)
  const [sharedType, setSharedType] = useState()
  const [provider, setProvider] = useState()

  // Set up your Yjs provider and document
  useEffect(() => {
    const yDoc = new Y.Doc()
    const sharedDoc = yDoc.get('slate', Y.XmlText)

    // Set up your Yjs provider. This line of code is different for each provider.
    const yProvider = new YjsProvider(/* ... */)

    yProvider.on('sync', setConnected)
    setSharedType(sharedDoc)
    setProvider(yProvider)

    return () => {
      yDoc?.destroy()
      yProvider?.off('sync', setConnected)
      yProvider?.destroy()
    }
  }, [])

  if (!connected || !sharedType || !provider) {
    return <div>Loading…</div>
  }

  return <SlateEditor />
}

const SlateEditor = () => {
	const [editor] = useState(() => withReact(createEditor()));

	return (
		<Slate editor={editor} initialValue={initialValue}>
			<Editable />
		</Slate>
	);
};

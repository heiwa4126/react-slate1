import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
// import PlainTextExample from "./PlainTextExample";
import "./index.css";
import { CollaborativeEditor } from "./Walkthroughs7";

const rootElement = document.getElementById("root");
if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<CollaborativeEditor />
		</StrictMode>,
	);
} else {
	console.error("Failed to find the root element.");
}

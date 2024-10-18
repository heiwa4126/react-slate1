import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
import "./index.css";
import PlainTextExample from "./PlainTextExample";

const rootElement = document.getElementById("root");
if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<PlainTextExample />
		</StrictMode>,
	);
} else {
	console.error("Failed to find the root element.");
}

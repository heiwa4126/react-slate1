import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
// import PlainTextExample from "./PlainTextExample";
import "./index.css";
import App from "./Walkthroughs6";

const rootElement = document.getElementById("root");
if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<App />
		</StrictMode>,
	);
} else {
	console.error("Failed to find the root element.");
}

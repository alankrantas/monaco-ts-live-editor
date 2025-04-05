import {
    lazy,
    Suspense,
} from "react";

import "./App.css";

const MonacoEditor = lazy(
    () => import("./component/MonacoEditor"),
);

import exampleCode from "./data/exampleCode.txt?raw";

function App() {
    return (
        <div>
            <div>
                <h1>Monaco TypeScript Live Editor</h1>
                <h3>IntelliSense and in-browser execution for JavaScript/TypeScript (<a href="https://github.com/alankrantas/monaco-ts-live-editor" target="_blank" rel="noreferrer noopener">repo</a>)</h3>
            </div>
            <div>
                <Suspense
                    fallback={
                        <h3>Loading editor...</h3>
                    }
                >
                    <MonacoEditor
                        code={exampleCode}
                        darkMode={true}
                        strictMode={true}
                    />
                </Suspense>
            </div>
        </div>
    )
}

export default App

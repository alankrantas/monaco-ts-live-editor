import {
    lazy,
    Suspense
} from "react";

import "./App.css";

const MonacoEditor = lazy(
    () => import("./component/MonacoEditor"),
);

function App() {
    return (
        <div>
            <div>
                <h1>Monaco TypeScript Live Editor (<a href="https://github.com/alankrantas/monaco-ts-live-editor" target="_blank">Github Repo</a>)</h1>
            </div>
            <div>
                <Suspense
                    fallback={
                        <h4>Loading editor component...</h4>
                    }
                >
                    <MonacoEditor
                        code="console.log('Hello World!');"
                        darkMode={true}
                        strictMode={true}
                    />
                </Suspense>
            </div>
        </div>
    )
}

export default App

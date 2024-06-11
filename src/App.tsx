import {
    lazy,
    Suspense,
    useEffect,
    useState
} from "react";

import "./App.css";

const MonacoEditor = lazy(
    () => import("./component/MonacoEditor"),
);

function App() {
    const [editorCode, setEditorCode] = useState(`console.log("Hello World!");`);

    useEffect(() => {
        fetch("/monaco-ts-live-editor/exampleCode.txt").then(res => res.text()).then(data => setEditorCode(data));
    }, []);

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
                        code={editorCode}
                        darkMode={true}
                        strictMode={true}
                    />
                </Suspense>
            </div>
        </div>
    )
}

export default App

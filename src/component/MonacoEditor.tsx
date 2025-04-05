import {
    FunctionComponent,
    useEffect,
    useRef,
    useState,
} from "react";
import Editor from "@monaco-editor/react";

import { MonacoEditorProps, EditorOptions, GenerateCompilerOptions } from "./MonacoEditorOptions";
import { ExecuteCode } from "./MonacoEditorExecute";
import styles from "./MonacoEditor.module.css";

const MonacoEditor: FunctionComponent<MonacoEditorProps> = ({
    code = "",
    darkMode = false,
    strictMode = false
}) => {
    const monacoRef = useRef<any>(null);
    const [editorCode, setEditorCode] = useState(code);
    const [executing, setExecuting] = useState(false);
    const [editorDarkMode, setEditorDarkMode] = useState(darkMode);
    const [editorStrictMode, setEditorStrictMode] = useState(strictMode);
    const [consoleOutput, setConsoleOutput] = useState<string[]>([]);

    const setEditorCompileOptions = () => {
        if (monacoRef) {
            monacoRef.current?.languages.typescript.typescriptDefaults.setCompilerOptions(
                GenerateCompilerOptions(
                    editorStrictMode,
                    monacoRef.current?.languages.typescript.ScriptTarget.ESNext
                ),
            );
            monacoRef.current?.languages.typescript.typescriptDefaults.setDiagnosticsOptions(
                {
                    noSemanticValidation: false,
                    noSuggestionDiagnostics: false,
                    noSyntaxValidation: false,
                },
            );
            /*
            You can also add declaration files (.d.ts) of an external module
            for editor IntelliSense to recognize the custom types:

            const url = "/url/your-module-declaretion.d.ts";
            const moduleName = "your-module-name";

            fetch(url)
                .then(res => res.text())
                .then(data => {
                    const externalModule = `declare module ${moduleName} { ${data} };`;
                    monacoRef.current?.languages.typescript.typescriptDefaults.addExtraLib(
                        externalModule,
                    );
            })
            */
        }
    };

    useEffect(() => {
        setEditorCompileOptions();
    }, [monacoRef, editorStrictMode]);

    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                <div className={styles.padded}>
                    <div className={styles.padded}>
                        <input
                            type="checkbox"
                            checked={editorDarkMode}
                            onChange={() => setEditorDarkMode(!editorDarkMode)}
                            className={styles.checkbox}
                        />
                        <span>&nbsp;Dark Mode</span>
                        &nbsp;&nbsp;
                        <input
                            type="checkbox"
                            checked={editorStrictMode}
                            onChange={() => setEditorStrictMode(!editorStrictMode)}
                            className={styles.checkbox}
                        />
                        <span>&nbsp;Strict Mode</span>
                    </div>
                    <div className={styles.padded}>
                        <Editor
                            height="100vh"
                            theme={editorDarkMode ? "vs-dark" : "vs"}
                            options={EditorOptions}
                            language="typescript"
                            value={editorCode}
                            onMount={(editor, monaco) => {
                                if (monaco) monacoRef.current = monaco;
                            }}
                            onChange={(value, e) => setEditorCode(value ?? "")}
                        />
                    </div>
                </div>
                <div className={styles.padded}>
                    <div className={styles.padded}>
                        <button
                            onClick={async () => {
                                navigator.clipboard.writeText(editorCode);
                                alert("Script copied!");
                            }}
                            className={styles.button}
                        >
                            Copy Code
                        </button>
                        &nbsp;
                        <button
                            onClick={async () => {
                                if (window.confirm("Confirm clearing script?"))
                                    setEditorCode("");
                            }}
                            className={styles.button}
                        >
                            Clear Code
                        </button>
                        &nbsp;
                        <button
                            onClick={async () => {
                                if (executing) return;
                                setExecuting(true);
                                setConsoleOutput(await ExecuteCode(editorCode));
                                setExecuting(false);
                            }}
                            className={styles.button}
                            disabled={executing}
                        >
                            {
                                executing ? "Executing..." : "Execute"
                            }
                        </button>
                    </div>
                    <pre className={styles.code}>
                        <div className={styles.padded}>
                            {
                                consoleOutput.join("\n")
                            }
                        </div>
                    </pre>
                </div>
            </div>
        </div>
    )
}


export default MonacoEditor;

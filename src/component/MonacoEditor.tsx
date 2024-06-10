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
    const [editorDarkMode, setEditorDarkMode] = useState(darkMode);
    const [editorStrictMode, setEditorStrictMode] = useState(strictMode);
    const [consoleOutput, setConsoleOutput] = useState<string[]>([]);

    const setEditorCompileOptions = () => {
        if (monacoRef) {
            monacoRef.current?.languages.typescript.typescriptDefaults.setCompilerOptions(
                GenerateCompilerOptions(
                    strictMode,
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
            You can also add a declaration file (.d.ts) of an external module
            for IntelliSense to be able to support custom types:

            fetch("/url/your-declaretion.d.ts")
                .then(res => res.text())
                .then(data => {
                    const externalModule = `declare module ${your-module-name} { ${data} };`;
                    monacoRef.current?.languages.typescript.typescriptDefaults.addExtraLib(
                        externalModule,
                    );
            })
            */
        }
    };

    useEffect(() => {
        setEditorCompileOptions();
    }, [monacoRef, strictMode]);

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
                        <span>Dark Mode</span>
                        &nbsp;
                        <input
                            type="checkbox"
                            checked={editorStrictMode}
                            onChange={() => setEditorStrictMode(!editorStrictMode)}
                            className={styles.checkbox}
                        />
                        <span>Strict IntelliSense Mode</span>
                    </div>
                    <div className={styles.padded}>
                        <Editor
                            height="100vh"
                            theme={editorDarkMode ? "vs-dark" : "vs"}
                            options={EditorOptions}
                            language="typescript"
                            value={editorCode}
                            onMount={(editor, monaco) => {
                                if (monaco) {
                                    monacoRef.current = monaco;
                                }
                            }}
                            onChange={(value, e) => {
                                setEditorCode(value ?? "");
                            }}
                        />
                    </div>
                </div>
                <div className={styles.padded}>
                    <div className={styles.padded}>
                        <button
                            onClick={async (e) => {
                                navigator.clipboard.writeText(editorCode);
                                alert("Script copied!");
                            }}
                            className={styles.button}
                        >
                            Copy
                        </button>
                        &nbsp;
                        <button
                            onClick={async (e) => {
                                if (window.confirm("Confirm clearing script?"))
                                    setEditorCode("");
                            }}
                            className={styles.button}
                        >
                            Clear
                        </button>
                        &nbsp;
                        <button
                            onClick={(e) => setConsoleOutput(ExecuteCode(editorCode))}
                            className={styles.button}
                        >
                            Execute
                        </button>
                    </div>
                    <div className={styles.padded}>
                        {
                            consoleOutput.map((log) => (
                                <pre className={styles.code}>
                                    {log}
                                </pre>
                            ))
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}


export default MonacoEditor;

import {
    FunctionComponent,
    useState,
    useEffect,
    useRef,
} from "react";
import Editor from "@monaco-editor/react";

import { MonacoEditorProps, EditorOptions, GenerateCompilerOptions } from "../utils/MonacoEditorOptions";
import { ExecuteCode } from "../utils/MonacoEditorExecute";
import styles from "../css/MonacoEditor.module.css";

const MonacoEditor: FunctionComponent<MonacoEditorProps> = ({
    code = "",
    darkMode = false,
    strictMode = false
}) => {
    const monacoRef = useRef<any>(null);
    const [editorCode, setEditorCode] = useState(code);
    const [editorDarkMode, setEditorDarkMode] = useState(darkMode);
    const [editorStrictMode, setEditorStrictMode] = useState(strictMode);
    const [consoleOutput, SetConsoleOutput] = useState<string[]>([]);

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
                        <span>&nbsp;Dark Mode</span>
                    </div>
                    <div className={styles.padded}>
                        <input
                            type="checkbox"
                            checked={editorStrictMode}
                            onChange={() => setEditorStrictMode(!editorStrictMode)}
                            className={styles.checkbox}
                        />
                        <span>&nbsp;Strict IntelliSense Mode</span>
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
                            onClick={async (e) => SetConsoleOutput(await ExecuteCode(editorCode))}
                            className={styles.button}
                        >
                            Execute
                        </button>
                    </div>
                    <div className={styles.padded}>
                        <pre className={styles.code}>
                            {consoleOutput.join("\n")}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default MonacoEditor;
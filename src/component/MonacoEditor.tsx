import {
    FunctionComponent,
    useState,
    useEffect,
    useRef,
} from "react";
import Editor from "@monaco-editor/react";

import { EditorOptions, GenerateCompilerOptions } from "../utils/MonacoEditorOptions";
import { ExecuteCode } from "../utils/MonacoEditorExecute";
import styles from "../css/MonacoEditor.module.css";

const MonacoEditor: FunctionComponent = () => {
    const monacoRef = useRef<any>(null);
    const [code, setCode] = useState("console.log('Hello World!')");
    const [strictMode, setStrictMode] = useState(true);
    const [consoleOutput, SetConsoleOutput] = useState<string[]>([]);
    const [darkMode, setDarkMode] = useState(true);

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
                            checked={darkMode}
                            onChange={() => setDarkMode(!darkMode)}
                            className={styles.checkbox}
                        />
                        <span>&nbsp;Editor Dark Mode</span>
                    </div>
                    <div className={styles.padded}>
                        <input
                            type="checkbox"
                            checked={strictMode}
                            onChange={() => setStrictMode(!strictMode)}
                            className={styles.checkbox}
                        />
                        <span>&nbsp;Strict IntelliSense Mode</span>
                    </div>
                    <div className={styles.padded}>
                        <Editor
                            height="100vh"
                            theme={darkMode ? "vs-dark" : "vs"}
                            options={EditorOptions}
                            language="typescript"
                            value={code}
                            onMount={(editor, monaco) => {
                                if (monaco) {
                                    monacoRef.current = monaco;
                                }
                            }}
                            onChange={(value, e) => {
                                setCode(value ?? "");
                            }}
                        />
                    </div>
                </div>
                <div className={styles.padded}>
                    <div className={styles.padded}>
                        <button
                            onClick={async (e) => SetConsoleOutput(await ExecuteCode(code))}
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
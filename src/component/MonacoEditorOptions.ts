export interface MonacoEditorProps {
    code?: string;
    darkMode?: boolean;
    strictMode?: boolean;
}

export const EditorOptions = {
    automaticLayout: true,
    contextmenu: true,
    dragAndDrop: true,
    dropIntoEditor: {
        enabled: true,
    },
    detectIndentation: false,
    fixedOverflowWidgets: false,
    fontFamily: "Consolas",
    fontSize: 16,
    formatOnPaste: true,
    formatOnType: true,
    lineHeight: 1.5,
    minimap: {
        enabled: true,
    },
    padding: {
        top: 8,
        button: 8,
    },
    scrollbar: {
        verticalScrollbarSize: 9,
        horizontalScrollbarSize: 9,
        alwaysConsumeMouseWheel: false,
    },
    scrollBeyondLastLine: false,
    smoothScrolling: true,
    tabSize: 4,
    quickSuggestions: true,
    wordBasedSuggestions: true,
}

export const GenerateCompilerOptions = (strictMode: boolean, target: number) => {
    return {
        allowNonTsExtensions: true,
        allowUnreachableCode: !strictMode,
        allowUnusedLabels: !strictMode,
        checkJs: true,
        noFallthroughCasesInSwitch: strictMode,
        noImplicitAny: strictMode,
        noImplicitOverride: strictMode,
        noImplicitReturns: strictMode,
        noImplicitThis: strictMode,
        noPropertyAccessFromIndexSignature: strictMode,
        noUncheckedIndexedAccess: strictMode,
        noUnusedLocals: strictMode,
        noUnusedParameters: strictMode,
        skipLibCheck: true,
        strict: strictMode,
        target: target,
        noEmit: true,
    }
};
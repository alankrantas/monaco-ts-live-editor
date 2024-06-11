import ts from "typescript";

const consoleOriginal = console.log;
let consoleOutput: string[] = [];

export const ExecuteCode = async (code: string): Promise<string[]> => {
    consoleOutput = [];
    console.log = tmpConsoleLog;

    const transpileOutput = ts.transpileModule(code, {
        compilerOptions: {
            target: ts.ScriptTarget.ESNext,
            module: ts.ModuleKind.ESNext,
        },
    });

    transpileOutput.diagnostics?.forEach(item => tmpConsoleLog(item));

    try {
        const func = new Function(transpileOutput.outputText);
        func();
    } catch (e: any) {
        tmpConsoleLog(e.stack);
    } finally {
        tmpConsoleLog(`[editor: last executed at ${new Date().toLocaleString("en-us")}]`);
    }

    console.log = consoleOriginal;
    return consoleOutput;
};

const formatConsoleLog = (msg: any): string => {
    let msgString = "";
    if (msg) {
        if (Array.isArray(msg)) {
            msgString = `[${msg.join(", ")}]`;
        } else if (typeof msg == "object") {
            try {
                msgString = JSON.stringify(msg, null, 4);
            } catch (e) {
                msgString = String(msg);
            }
        } else {
            msgString = String(msg);
        }
    }
    return msgString;
};

const tmpConsoleLog = (...msg: any[]) => {
    msg.forEach((m) =>
        consoleOutput.push(formatConsoleLog(m)),
    );
};
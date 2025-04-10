import ts from "typescript";

let consoleOutput: string[] = [];

export const ExecuteCode = async (code: string): Promise<string[]> => {
    const consoleOriginal = console.log;

    consoleOutput = [];
    console.log = consoleLog;

    const transpileOutput = ts.transpileModule(code, {
        compilerOptions: {
            target: ts.ScriptTarget.ESNext,
            module: ts.ModuleKind.ESNext,
        },
    });

    transpileOutput.diagnostics?.forEach(item => consoleLog(item));

    try {
        (new Function(transpileOutput.outputText))();
    } catch (e: any) {
        consoleLog(e.stack);
    } finally {
        consoleLog(`\n[editor (TypeScript v${ts.version}): ${new Date().toLocaleString("en-us")}]`);
    }

    console.log = consoleOriginal;
    return consoleOutput;
};

const formatConsoleLog = (msg: any): string => {
    let msgString = "";
    if (Array.isArray(msg)) {
        msgString = `[${msg.map((item) => {
            return formatConsoleLog(item);
        }).join(", ")
            }]`;
    } else if (typeof msg == "object") {
        try {
            msgString = JSON.stringify(msg, null, 4);
        } catch (e) {
            msgString = `${msg}`;
        }
    } else {
        msgString = `${msg}`;
    }
    return msgString;
};

const consoleLog = (...msg: any[]) => {
    msg.forEach((m) =>
        consoleOutput.push(formatConsoleLog(m)),
    );
};
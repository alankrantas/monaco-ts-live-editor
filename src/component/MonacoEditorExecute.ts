import ts from "typescript";

export const ExecuteCode = (code: string): string[] => {
    const consoleOutput: string[] = [];

    const consoleOriginal = console.log;
    console.log = (...msg: any[]) => {
        msg.forEach((m) =>
            consoleOutput.push(formatConsoleLog(m)),
        );
    };

    const transpileOutput = ts.transpileModule(code, {
        compilerOptions: {
            target: ts.ScriptTarget.ESNext,
            module: ts.ModuleKind.ESNext,
        },
    });

    transpileOutput.diagnostics?.forEach(item => console.log(item));

    try {
        const func = new Function(transpileOutput.outputText);
        func();
    } catch (e: any) {
        console.log(e.stack);
    } finally {
        console.log(`[editor: last executed at ${new Date().toLocaleString("en-us")}]`);
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

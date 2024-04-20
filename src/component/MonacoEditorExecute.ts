import ts from "typescript";

export const ExecuteCode = async (code: string): Promise<string[]> => {
    const consoleOutput: string[] = [];

    const consoleOriginal = console.log;
    console.log = (...msg: any[]) => {
        msg.forEach((m) =>
            consoleOutput.push(formatConsoleLog(m)),
        );
    };

    const transpiledCode = ts.transpileModule(code, {
        compilerOptions: {
            target: ts.ScriptTarget.ESNext,
            module: ts.ModuleKind.ESNext,
        },
    }).outputText;

    const transpiledCodeAsFunction = `(async () => {
    return async () => {
        ${transpiledCode}
    }
})()`

    try {
        const executeFunction: () => Promise<string[]> = await eval(transpiledCodeAsFunction);
        await executeFunction();
    } catch (e: any) {
        console.log(e.stack);
    } finally {
        console.log(`[editor:\nlast executed at\n${new Date().toLocaleString("en-us")}]`);
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
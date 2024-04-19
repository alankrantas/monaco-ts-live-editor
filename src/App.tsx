import {
    lazy,
    Suspense
} from "react";

import "./App.css";

const MonacoEditor = lazy(
    () => import("./component/MonacoEditor"),
);

function App() {
    return (
        <div>
            <div>
                <h1>Monaco TypeScript Live Editor</h1>
            </div>
            <div>
                <Suspense
                    fallback={
                        <div>Loading component...</div>
                    }
                >
                    <MonacoEditor />
                </Suspense>
            </div>
        </div>
    )
}

export default App

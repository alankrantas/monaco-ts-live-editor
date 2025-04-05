# Monaco TypeScript Live Editor

> Try it [here](https://alankrantas.github.io/monaco-ts-live-editor/).

A simple demonstration to wrap [`@monaco-editor/react`](https://www.npmjs.com/package/@monaco-editor/react) into an online TypeScript editor component with IntelliSense support and script execution functionality. The React app is [created/built by Vite](https://vitejs.dev/) and deployed to GitHub Pages using Github Actions.

When the "Strict Mode" is enabled, the TypeScript compiler would use the following configurations:

- `allowUnreachableCode`: `false`
- `allowUnusedLabels`: `false`
- `noFallthroughCasesInSwitch`: `true`
- `noImplicitAny`: `true`
- `noImplicitOverride`: `true`
- `noImplicitReturns`: `true`
- `noImplicitThis`: `true`
- `noPropertyAccessFromIndexSignature`: `true`
- `noUncheckedIndexedAccess`: `true`
- `noUnusedLocals`: `true`
- `noUnusedParameters`: `true`
- `strict`: `true`

`checkJs` is set to `true` and `target`/`module` are set to `ESNext`.

If you want to add declaration files (`.d.ts`), see the comment in `/src/component/MonacoEditor.tsx`.

## Development

### `yarn`

Install dependencies.

### `yarn dev` or `yarn start`

Start the dev server.

### `yarn build`

Build a production at `./dist`.

### `yarn preview` or `yarn serve`

Serve and view the built production.

### `yarn commit`

Commit changes.

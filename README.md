# vite-plugin-import-buffer

This vite/rollup plugin allows importing files as node Buffers.
Files are appropriately emitted into build outputs, and loaded as a Buffer automatically.

## Usage

```js
import { defineConfig } from 'vite'
import importBuffer from 'vite-plugin-import-buffer'

export default defineConfig({
  plugins: [
    importBuffer()
  ]
})
```

## Example

```js
import fontData from './Inter-Regular.ttf?buffer';
``` 


## Options

### `include`

Type: `string[] | RegExp`

Default: `[]`

Glob patterns or RegExp to include files.

### `exclude`

Type: `string[] | RegExp`

Default: `[]`

Glob patterns or RegExp to exclude files.

### `loader`

Type: `(src: string) => string`

Default: `(src) => `import { readFile } from 'node:fs/promises';
export const originalUrl = ${src};
const buf = await readFile(new URL(originalUrl, import.meta.url));
export default buf;`

A function that returns the loader code for the buffer.

## License

[MIT](LICENSE)

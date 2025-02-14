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

## License

[MIT](LICENSE)

import { createFilter } from "@rollup/pluginutils";
import { basename } from "node:path";
import { readFile } from "node:fs/promises";

import type { Plugin, ResolvedConfig } from "vite";

export type Options =
	| {
			include?: Array<string | RegExp> | string | RegExp;
			exclude?: Array<string | RegExp> | string | RegExp;
	  }
	| undefined;

export const matchRE = /(?:\?|&)buff(er)?(?:&|$)/;

const isBuff = (id: string) => {
	return !!id.match(matchRE);
};

const cleanId = (id: string) => id.replace(matchRE, "");

const buildRollupAsset = (referenceId: string) =>
	`import.meta.ROLLUP_FILE_URL_${referenceId}`;

const loader = (src: string) => {
	return `
import { readFile } from 'node:fs/promises';
export const originalUrl = ${src};
const buf = await readFile(new URL(originalUrl, import.meta.url));
export default buf;
`;
};

const bufferImport = (options: Options = {}): Plugin => {
	const { include, exclude } = options;

	const filter = createFilter(include, exclude);

	let config: ResolvedConfig;

	return {
		name: "vite-plugin-import-buffer",
		enforce: "pre",

		configResolved(cfg) {
			config = cfg;
		},

		async load(id) {
			if (!filter(id)) {
				return null;
			}

			if (isBuff(id)) {
				const cleanedId = cleanId(id);

				// Vite compatibility
				let originalSrc = JSON.stringify(`./${basename(cleanedId)}`);

				// Emit file when building
				if (config.command !== "serve") {
					const originalRefId = this.emitFile({
						type: "asset",
						name: basename(cleanedId),
						source: await readFile(cleanedId),
						needsCodeReference: true,
					});
					originalSrc = buildRollupAsset(originalRefId);
				}
				return loader(originalSrc);
			}

			return null;
		},
	};
};

export { bufferImport };

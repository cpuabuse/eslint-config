/*
	Copyright 2022 cpuabuse.com
	Licensed under the ISC License (https://opensource.org/licenses/ISC)
*/

/**
 * ESLint base config, not really to be used directly.
 *
 * @module
 */

import type { Linter } from "eslint";
import { primaryExtends } from "./lib";

/**
 * Base config.
 */
const baseConfig: Linter.Config = {
	env: {
		browser: true,
		// Adds all ECMAScript 2021 globals and automatically sets the ecmaVersion parser option to 12
		es2021: true,
		mocha: true,
		node: true
	},
	extends: primaryExtends,
	parserOptions: {
		ecmaFeatures: {
			impliedStrict: true
		},
		sourceType: "module"
	},
	plugins: ["sort-keys-fix", "tsdoc", "header"],
	settings: { jsdoc: { tagNamePreference: { file: "module" } } }
};

/**
 * Export base.
 */
export = baseConfig;

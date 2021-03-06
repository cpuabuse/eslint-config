/*
	Copyright 2021 cpuabuse.com
	Licensed under the ISC License (https://opensource.org/licenses/ISC)
*/

/**
 * @file ESLint base config, not really to be used directly
 */

import type { Linter } from "eslint";
import { primaryExtends } from "./lib/partial";

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
	plugins: ["sort-keys-fix", "tsdoc", "header"]
};

// Export base
export = baseConfig;

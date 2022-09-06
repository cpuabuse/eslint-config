/*
	Copyright 2022 cpuabuse.com
	Licensed under the ISC License (https://opensource.org/licenses/ISC)
*/

/**
 * ESLint config for Vue.
 *
 * @file
 * @packageDocumentation
 */

/**
 * @license ISC
 * ISC License (ISC)
 *
 * Copyright 2020 cpuabuse.com
 *
 * Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

import { Linter } from "eslint";
import {
	baseRules,
	secondaryExtends,
	secondaryRules,
	secondarySettings,
	typeExtends,
	vueExtends,
	vueRules
} from "./lib";

/**
 * ESLint config for Vue.
 */
const vueConfig: Linter.Config = {
	extends: ["./base.js", ...typeExtends, ...vueExtends, ...secondaryExtends],
	parser: "vue-eslint-parser",
	parserOptions: {
		extraFileExtensions: [".vue"],
		parser: "@typescript-eslint/parser",
		project: "./tsconfig.json"
	},
	rules: { ...baseRules, ...vueRules, ...secondaryRules },
	settings: secondarySettings
};

export = vueConfig;

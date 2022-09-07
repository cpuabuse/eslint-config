/*
	Copyright 2022 cpuabuse.com
	Licensed under the ISC License (https://opensource.org/licenses/ISC)
*/

/**
 * Test file.
 *
 * @file
 */

import { strictEqual } from "assert";
import { Linter } from "eslint";
import defaultConfig from "../src/eslint/index";
import vueTypescriptConfig from "../src/eslint/typescript";
import vueConfig from "../src/eslint/vue";
import vueTsxConfig from "../src/eslint/vue-tsx";

describe("configs", function () {
	const configs: Array<{
		/**
		 * Actual config.
		 */
		file: Linter.Config;

		/**
		 * Name fo config.
		 */
		name: string;

		/**
		 * If the config has rules.
		 *
		 * If undefined, rules present assumed.
		 */
		hasRules?: boolean;
	}> = [
		{ file: defaultConfig, hasRules: false, name: "default" },
		{ file: vueTypescriptConfig, name: "typescript" },
		{ file: vueConfig, name: "vue" },
		{ file: vueTsxConfig, name: "vue-tsx" }
	];

	// Dynamic test
	// eslint-disable-next-line mocha/no-setup-in-describe
	configs.forEach(config => {
		describe(config.name, function () {
			it("should be an object", function () {
				strictEqual(typeof config.file, "object");
			});
			// Dynamic test
			// eslint-disable-next-line mocha/no-setup-in-describe
			if (config.hasRules === undefined || config.hasRules === true) {
				describe("#rules", function () {
					it("should be an object", function () {
						strictEqual(typeof config.file, "object");
					});
				});
			}
		});
	});
});

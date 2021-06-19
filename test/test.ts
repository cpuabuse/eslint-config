/*
	Copyright 2021 cpuabuse.com
	Licensed under the ISC License (https://opensource.org/licenses/ISC)
*/

/**
 * @file Test file
 */

import { strictEqual } from "assert";
import { Linter } from "eslint";
import defaultConfig from "../src/index";
import vueTypescriptConfig from "../src/typescript";
import vueConfig from "../src/vue";
import vueTsxConfig from "../src/vue-tsx";

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

/*
	Copyright 2021 cpuabuse.com
	Licensed under the ISC License (https://opensource.org/licenses/ISC)
*/

/**
 * @file Test file
 */

import { ok, strictEqual } from "assert";
import config from "../src/index";

describe("export", function () {
	it("should be an object", function () {
		strictEqual(typeof config, "object");
	});
	describe("#rules", function () {
		it("should be an object", function () {
			strictEqual(typeof config.rules, "object");
		});
		it("should be full", function () {
			ok(Object.keys(config.rules).length > 0);
		});
	});
});

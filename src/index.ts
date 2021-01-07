/*
	Copyright 2020 cpuabuse.com
	Licensed under the ISC License (https://opensource.org/licenses/ISC)
*/

/**
 * @file ESLint config
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

export = {
	env: {
		browser: true,
		es2021: true,
		mocha: true,
		// Adds all ECMAScript 2021 globals and automatically sets the ecmaVersion parser option to 12
		node: true
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended", // Loads @typescript-eslint plugin
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
		"plugin:import/errors", // Loads import plugin
		"plugin:import/warnings", // Loads import plugin
		"plugin:import/typescript", // Loads import plugin
		"plugin:jsdoc/recommended", // Loads JSDoc plugin
		"plugin:mocha/recommended", // Loads mocha plugin
		"airbnb-base",
		"plugin:prettier/recommended" // Loads prettier plugin
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			impliedStrict: true
		},
		project: "./tsconfig.json",
		sourceType: "module"
	},
	plugins: ["sort-keys-fix", "tsdoc", "header"],
	rules: {
		// Require explicit return types on functions and class methods
		// We want all types
		"@typescript-eslint/explicit-function-return-type": "error",

		// Require explicit accessibility modifiers on class properties and methods
		// Makes it clear
		"@typescript-eslint/explicit-member-accessibility": "error",

		// Require a consistent member declaration order
		// Order what can be ordered
		"@typescript-eslint/member-ordering": ["error", { default: { order: "alphabetically" } }],

		// Disallow generic Array constructors
		// We want to use array constructor often
		"@typescript-eslint/no-array-constructor": "off",

		// Disallow usage of the any type
		// That is why any can only be explicit
		"@typescript-eslint/no-explicit-any": "off",

		// Disallows explicit type declarations for variables or parameters initialized to a number, string, or boolean
		// We want the types to be forced
		"@typescript-eslint/no-inferrable-types": "off",

		// Require or disallow named function expressions
		// Creates too much clutter
		"func-names": "off",

		// Ensure that files begin with given comment
		// Properly add licenses
		"header/header": [
			"error",
			"block",
			[
				"",
				`	Copyright ${new Date().getFullYear()} cpuabuse.com`,
				"	Licensed under the ISC License (https://opensource.org/licenses/ISC)",
				""
			]
		],

		// Ensure consistent use of file extension within the import path
		// No extensions in typescript
		"import/extensions": [
			"error",
			"always",
			{
				js: "never",
				jsx: "never",
				ts: "never",
				tsx: "never"
			}
		],

		// Ensures that there is no resolvable path back to this module via its dependencies
		// Sometimes it is necessary to have circular dependencies
		"import/no-cycle": "off",

		// Enforce a convention in module import order
		// Sort everything; Used since sort-imports autofixes only multiple members on a single line are automatically sorted
		"import/order": [
			"error",
			{
				alphabetize: { order: "asc" }
			}
		],

		// When there is only a single export from a module, prefer using default export over named export
		// To have persistent imports there is no need for arbitrary default imports as modules will grow
		"import/prefer-default-export": "off",

		// Enforce consistent indentation
		// Managed by prettier
		indent: "off",

		"jsdoc/require-file-overview": "error",

		// Checks for presence of jsdoc comments, on class declarations as well as functions
		// Rule mostly for autofix; Default doesn't include classes; FunctionDeclaration defaults to true; "TSDeclareFunction" context omitted
		"jsdoc/require-jsdoc": [
			"error",
			{
				contexts: [
					"ClassProperty",
					"TSPropertySignature", // For interfaces
					"TSMethodSignature", // For interfaces
					"TSTypeAliasDeclaration",
					"TSEnumDeclaration",
					"TSInterfaceDeclaration",
					"Program > VariableDeclaration" // For global vars
				],
				require: {
					ArrowFunctionExpression: true,
					ClassDeclaration: true,
					ClassExpression: true,
					FunctionExpression: true,
					MethodDefinition: true
				}
			}
		],

		// Requires that each @param tag has a type value
		// Not necessary for TS
		"jsdoc/require-param-type": "off",

		// Requires that @returns tag has type value
		// Not needed for TS
		"jsdoc/require-returns-type": "off",

		// A file may not contain more than the specified number of classes
		// Let programmer decide
		"max-classes-per-file": "off",

		// Disallow Array constructors
		// Let programmer decide
		"no-array-constructor": "off",

		// The use of bitwise operators in JavaScript is very rare and often & or | is simply a mistyped && or ||, which will lead to unexpected behavior
		// Bitwise is essential
		"no-bitwise": "off",

		// Disallow Magic Numbers
		// We should use consts
		"no-magic-numbers": [
			"error",
			{
				ignore: [0, 1, -1]
			}
		],

		// Disallow Object constructors
		// Let programmer decide
		"no-new-object": "off",

		// Disallow Reassignment of Function Parameters
		// Too annoying for class references
		"no-param-reassign": ["error", { props: false }],

		// Disallow the unary operators ++ and --
		// Always
		"no-plusplus": "off",

		// Disallow Early Use
		// There is hoisting
		"no-use-before-define": "off",

		// Suggest using const
		// Let programmer decide
		"prefer-const": "off",

		// Import Sorting
		// Does only what it can autofix, rest is handled by import/order
		"sort-imports": ["error", { ignoreDeclarationSort: true }],

		// Require object keys to be sorted
		// Sort everything
		"sort-keys-fix/sort-keys-fix": "error",

		// A rule for validating that TypeScript doc comments conform to the TSDoc specification
		// Need proper docs
		"tsdoc/syntax": "error"
	},
	settings: {
		"import/resolver": {
			node: {
				extensions: [".js", ".jsx", ".ts", ".tsx"]
			}
		}
	}
};

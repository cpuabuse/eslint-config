/*
	Copyright 2021 cpuabuse.com
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
		"plugin:prettier/recommended", // Loads prettier plugin
		"plugin:vue/vue3-recommended"
	],
	overrides: [
		// Vue overrides
		{
			files: ["*.vue"],
			rules: {
				// Cannot work on file level https://github.com/Stuk/eslint-plugin-header/issues/8
				"header/header": "off",
				// Cannot work on file level
				"jsdoc/require-file-overview": "off"
			}
		}
	],
	parser: "vue-eslint-parser",
	parserOptions: {
		ecmaFeatures: {
			impliedStrict: true
		},
		extraFileExtensions: [".vue"],
		parser: "@typescript-eslint/parser",
		project: "./tsconfig.json",
		sourceType: "module"
	},
	plugins: ["sort-keys-fix", "tsdoc", "header"],
	rules: {
		// Common rules
		...{
			// Require explicit return types on functions and class methods
			// We want all types
			"@typescript-eslint/explicit-function-return-type": "error",

			// Require explicit accessibility modifiers on class properties and methods
			// Makes it clear
			"@typescript-eslint/explicit-member-accessibility": "error",

			// Require explicit return and argument types on exported functions' and classes' public class methods
			// Redundant as everything should already be typed
			"@typescript-eslint/explicit-module-boundary-types": "off",

			// Require a consistent member declaration order
			// Order what can be ordered
			"@typescript-eslint/member-ordering": [
				"error",
				{
					default: {
						memberTypes: [
							"signature",
							"public-field",
							"protected-field",
							"private-field",
							"public-constructor",
							"protected-constructor",
							"private-constructor",
							"public-static-method",
							"protected-static-method",
							"private-static-method",
							"public-method",
							"protected-method",
							"private-method"
						],
						order: "alphabetically"
					}
				}
			],

			// Disallow generic Array constructors
			// We want to use array constructor often
			"@typescript-eslint/no-array-constructor": "off",

			// Disallow duplicate class members
			// Fixes no-dupe-class-members
			"@typescript-eslint/no-dupe-class-members": ["error"],

			// Disallow usage of the any type
			// That is why any can only be explicit
			"@typescript-eslint/no-explicit-any": "off",

			// Disallows explicit type declarations for variables or parameters initialized to a number, string, or boolean
			// We want the types to be forced
			"@typescript-eslint/no-inferrable-types": "off",

			// Requires type definitions to exist
			// We want all types. Seems many options off by default now
			"@typescript-eslint/typedef": [
				"error",
				{
					arrayDestructuring: true,
					memberVariableDeclaration: true,
					objectDestructuring: true,
					parameter: true,
					propertyDeclaration: true,
					variableDeclaration: true
				}
			],

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

			// Ensures that parameter names in JSDoc match those in the function declaration
			// Allow destructured to be ignored and be documented
			"jsdoc/check-param-names": "off",

			// Checks that all files have a @file
			// For proper file descriptions
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

			// Requires that all function parameters are documented
			// For not generating clutter with destructuring and rest
			"jsdoc/require-param": ["error", { checkDestructuredRoots: false }],

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

			// Disallow duplicate name in class members
			// Not necessary in TS, since overload
			"no-dupe-class-members": "off",

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
		// Enum fix, removes errors shown with default ESLint for enums
		...{
			// Disallow variable declarations from shadowing variables declared in the outer scope
			...{
				"@typescript-eslint/no-shadow": "error",
				"no-shadow": "off"
			},
			// Disallow unused variables
			...{
				"@typescript-eslint/no-unused-vars": "error",
				"no-unused-vars": "off"
			}
		},
		// Vue fixes
		...{
			// Enforce consistent indentation
			// Indentation governed by prettier
			"vue/html-indent": "off",

			// Enforce the maximum number of attributes per line
			// Newlines governed by prettier
			"vue/max-attributes-per-line": "off",

			// Enforce order of properties in components
			// Property ordering governed by prettier
			"vue/order-in-components": "off",

			// Require a line break before and after the contents of a singleline element
			// Newlines governed by prettier
			"vue/singleline-html-element-content-newline": "off"
		}
	},
	settings: {
		"import/resolver": {
			node: {
				extensions: [".js", ".jsx", ".ts", ".tsx"]
			}
		}
	}
};

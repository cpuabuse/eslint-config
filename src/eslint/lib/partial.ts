/*
	Copyright 2024 cpuabuse.com
	Licensed under the ISC License (https://opensource.org/licenses/ISC)
*/

/**
 * @file
 * Reusable config bits.
 * @module lib
 */

import { Linter } from "eslint";
import { blockFirstLineTagRegex, blockOneLineRegex, blockTagRegex, inlineTagRegex } from ".";

/**
 * Asts to use for documentation.
 */
const DocAstContext: Array<string> = [
	"PropertyDefinition", // Class members
	"TSPropertySignature", // For interfaces
	"TSMethodSignature", // For interfaces
	"TSTypeAliasDeclaration",
	"TSEnumDeclaration",
	"TSInterfaceDeclaration",
	"Program > VariableDeclaration", // Non-exported top-level variables
	"ExportNamedDeclaration" // Exports
];

/**
 * Goes to top of `extends` list.
 */
export const primaryExtends: Array<string> = [
	"eslint:recommended",
	"plugin:@typescript-eslint/recommended" // Loads @typescript-eslint plugin
];

/**
 * Goes to bottom of `extends` list.
 */
export const secondaryExtends: Array<string> = [
	"plugin:import/errors", // Loads import plugin
	"plugin:import/warnings", // Loads import plugin
	"plugin:import/typescript", // Loads import plugin
	"plugin:jsdoc/recommended", // Loads JSDoc plugin
	"plugin:mocha/recommended", // Loads mocha plugin
	"airbnb-base",
	"plugin:prettier/recommended" // Loads prettier plugin
];

/**
 * Goes to the middle of `extends` list. Configs requiring type information (project option).
 */
export const typeExtends: Array<string> = ["plugin:@typescript-eslint/recommended-requiring-type-checking"];

/**
 * Goes to the middle of `extends` list. Configs for Vue.
 */
export const vueExtends: Array<string> = ["plugin:vue/vue3-recommended"];

/**
 * Rules that go everywhere. It includes rules from typescript typechecking as well, since it is difficult to distinguish origin.
 *
 * @remarks
 * - `@typescript-eslint/typedef` is to be governed by `noImplicitAny`
 * - `jsdoc/require-description` not needed due to `jsdoc/match-description`
 * - It is harder to check termination character for normal comments, but at least can check capitalization with `capitalized-comments`
 * - `@typescript-eslint/no-dupe-class-members` is not needed due to TS checking
 *
 * @see {@link DocAstContext}
 */
export const baseRules: Partial<Linter.RulesRecord> = {
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

		// Disallow empty functions
		// Ensure WIP code filled
		"@typescript-eslint/no-empty-function": "error",

		// Disallow usage of the any type
		// That is why any can only be explicit
		"@typescript-eslint/no-explicit-any": "off",

		// Disallows explicit type declarations for variables or parameters initialized to a number, string, or boolean
		// We want the types to be forced
		"@typescript-eslint/no-inferrable-types": "off",

		// Enforce or disallow capitalization of the first letter of a comment
		// Follow styling
		"capitalized-comments": ["error", "always"],

		// Require or disallow named function expressions
		// Creates too much clutter
		"func-names": "off",

		// Ensure that files begin with given comment
		// Properly add licenses
		"header/header": [
			"warn",
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
				cjs: "ignorePackages",
				css: "ignorePackages",
				js: "never",
				json: "ignorePackages",
				// TS doesn't like `.jsonc` extension
				jsonc: "ignorePackages",
				jsx: "never",
				mjs: "ignorePackages",
				sass: "ignorePackages",
				scss: "ignorePackages",
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

		// Reports invalid block tag names
		// Do not need to replace TSDoc comments
		"jsdoc/check-tag-names": "off",

		// Enforces a regular expression pattern on descriptions
		// Make sure the descriptions and tags are valid
		"jsdoc/match-description": [
			"error",
			{
				/*
					Exclude zero line comments - https://github.com/gajus/eslint-plugin-jsdoc/issues/847#issuecomment-1068594852
					One line comment format matches multiline, for the documentation output to match.
				*/
				contexts: [{ comment: "JsdocBlock[endLine!=0]" }],
				matchDescription: blockTagRegex,
				tags: {
					example: { match: blockFirstLineTagRegex },
					param: { match: inlineTagRegex },
					remarks: { match: true },
					returns: { match: inlineTagRegex },
					see: { match: inlineTagRegex },
					throws: { match: blockFirstLineTagRegex }
				}
			}
		],

		// Enforces a regular expression pattern on descriptions
		// Reports when certain comment structures are present
		"jsdoc/no-restricted-syntax": [
			"error",
			{
				contexts: [
					{
						// Process zero line comments - https://github.com/gajus/eslint-plugin-jsdoc/issues/847#issuecomment-1068579604
						comment: `JsdocBlock[endLine=0][description!=/${blockOneLineRegex}/]`
					}
				]
			}
		],

		// Checks that all files have a @file
		// For proper file descriptions
		"jsdoc/require-file-overview": "error",

		// Checks for presence of jsdoc comments, on class declarations as well as functions
		// Rule mostly for autofix; Default doesn't include classes; FunctionDeclaration defaults to true; "TSDeclareFunction" context omitted
		"jsdoc/require-jsdoc": [
			"error",
			{
				// FunctionDeclaration defaults to `true`
				contexts: DocAstContext,
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
		// Generating only for destructured root, to give it a name in typedoc; Currently produces false positive for following root params, if first is documented
		"jsdoc/require-param": [
			"error",
			{ autoIncrementBase: 2, checkDestructured: false, unnamedRootBase: ["param", "param"] }
		],

		// Requires that each @param tag has a type value
		// Not necessary for TS
		"jsdoc/require-param-type": "off",

		// Requires that @returns tag has type value
		// Not needed for TS
		"jsdoc/require-returns-type": "off",

		// Requires that throw statements are documented
		// Richer TSDoc
		"jsdoc/require-throws": ["error"],

		// Enforces lines (or no lines) between tags
		// Default behavior removes desired lines
		"jsdoc/tag-lines": [
			"error",
			"never",
			{
				applyToEndTag: false,
				startLines: 1,
				tags: {
					example: { lines: "always" }, // Block tag
					remarks: { lines: "always" }, // Block tag
					returns: { lines: "always" }, // Last common tag
					throws: { lines: "always" } // Block tag
				}
			}
		],

		// Requires all types to be valid JSDoc, Closure, or TypeScript compiler types without syntax errors
		// Cannot be applied to TSDoc
		"jsdoc/valid-types": "off",

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
				ignore: [-2, -1, 0, 1, 2]
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
	}
};

/**
 * Rules for Vue.
 */
export const vueRules: Partial<Linter.RulesRecord> = {
	// Cannot work on file level https://github.com/Stuk/eslint-plugin-header/issues/8
	"header/header": "off",

	// Cannot work on file level
	"jsdoc/require-file-overview": "off",

	// Require or disallow a line break before tag's closing brackets
	// Controlled by prettier
	"vue/html-closing-bracket-newline": "off",

	// Enforce consistent indentation
	// Indentation governed by prettier
	"vue/html-indent": "off",

	// Enforce self-closing style
	// Prettier controls it
	"vue/html-self-closing": "off",

	// Enforce the maximum number of attributes per line
	// Newlines governed by prettier
	"vue/max-attributes-per-line": "off",

	// Enforce order of properties in components
	// Property ordering governed by prettier
	"vue/order-in-components": "off",

	// Require a line break before and after the contents of a singleline element
	// Newlines governed by prettier
	"vue/singleline-html-element-content-newline": "off"
};

/**
 * Common settings for any config consuming secondary "extends".
 */
export const secondarySettings: Linter.Config["settings"] = {
	"import/resolver": {
		// Uses https://github.com/import-js/eslint-import-resolver-typescript to allow subpath imports; Includes necessary extensions predefined by default - `[".ts", ".tsx", ".d.ts", ".js", ".jsx", ".json", ".node"]`
		typescript: {}
	}
};

/**
 * Common rules for any config consuming secondary "extends".
 */
export const secondaryRules: Partial<Linter.RulesRecord> = {
	// Require default case in switch statements
	// Reverting Airbnb comment pattern to ESLint default
	"default-case": ["error", { commentPattern: "^[Nn]o default$" }]
};

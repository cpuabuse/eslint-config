/*
	Copyright 2022 cpuabuse.com
	Licensed under the ISC License (https://opensource.org/licenses/ISC)
*/

/**
 * @file Regex bits
 */

/**
 * Characters in the middle of English sentence, with characters needed for inline tags, that are not used for Markdown.
 */
const englishMiddleCharacters: string = 'A-Za-z \\d`{@#.:}",\\-;';

/**
 * Sentence following a tag immediately.
 */
const firstLineSentence: string = "([A-Z`{\\d].*)([^.]|...)";

/**
 * Possible paragraphs in a comment.
 */
const paragraphs: Record<string, string> = {
	// Represents a paragraph that is a markdown codeblock.
	code: "(```.*\\n((?!```).+\\n(\\n?|(?=```)))+```)(\\n{2}(?=.)|(?=$))",
	// Represents a paragraph in English.
	english: `([A-Z\`{][${englishMiddleCharacters}]*[.]\\n)*[A-Z\`{][${englishMiddleCharacters}]*[.](\\n{2}(?=.)|(?=$))`,
	// Represents a paragraph with special characters as the first symbol.
	specialBeginning: "(.+\\n)*[^A-Za-z`{\\n].*((\\n.+)*\\n{2}(?=.)|(\\n.+)*(?=$))",
	// Represents a paragraph with special characters as the middle or last symbol.
	specialRest: `(.+\\n)*.*[^${englishMiddleCharacters}\\n].*((\\n.+)*\\n{2}(?=.)|(\\n.+)*(?=$))`
};

/**
 * Regular expression for long comments.
 */
export const blockTagRegex: string = `^(${Object.values(paragraphs).join("|")})+$`;

/**
 * Regular expression for block tag with first line optional.
 */
export const blockFirstLineTagRegex: string = `^(${firstLineSentence}\n)?(${Object.values(paragraphs).join("|")})+$`;

/**
 * Regular expression for short comments.
 */
export const firstLineTagRegex: string = `^${firstLineSentence}$`;

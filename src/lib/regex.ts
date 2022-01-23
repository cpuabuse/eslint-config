/*
	Copyright 2022 cpuabuse.com
	Licensed under the ISC License (https://opensource.org/licenses/ISC)
*/

/**
 * @file Regex bits
 */

/**
 * Backtick character.
 */
const backtick: string = "`";

/**
 * Numbers.
 */
const numbers: string = "\\d";

/**
 * First letter in English sentences, that are not used for Markdown.
 */
const englishFirstCharacter: string = `A-Z${backtick}"'{`;

/**
 * Characters in the middle of English sentence, with characters needed for inline tags, that are not used for Markdown.
 */
const englishMiddleCharacters: string = `$A-Za-z ${numbers}${backtick}"'{@#.:},-;`;

/**
 * Sentence following a tag immediately.
 */
const firstLineSentence: string = `[${englishFirstCharacter}${numbers}].*([^.])`;

/**
 * Possible paragraphs in a comment.
 */
const paragraphs: Record<string, string> = {
	// Represents a paragraph that is a markdown codeblock.
	code: "(```.*\\n((?!```).+\\n(\\n?|(?=```)))+```)(\\n{2}(?=.)|(?=$))",
	// Represents a paragraph in English.
	english: `([${englishFirstCharacter}][${englishMiddleCharacters}]*[.]\\n)*[${englishFirstCharacter}][${englishMiddleCharacters}]*[.](\\n{2}(?=.)|(?=$))`,
	// Represents a paragraph with special characters as the first symbol.
	specialBeginning: `(.+\\n)*[^${englishFirstCharacter}a-z\\n].*((\\n.+)*\\n{2}(?=.)|(\\n.+)*(?=$))`,
	// Represents a paragraph with special characters as the middle or last symbol.
	specialRest: `(.+\\n)*.*[^${englishMiddleCharacters}\\n].*((\\n.+)*\\n{2}(?=.)|(\\n.+)*(?=$))`
};

/**
 * Regular expression for long comments.
 *
 * Identifies comments consisting of paragraphs, separated by two newlines. Each paragraph is identified by one of the following:
 * - Paragraph in English, that does not contain Markdown characters, or start with characters for Markdown
 * - Paragraph, containing Markdown characters
 * - Paragraph, starting with a character, that could identify Markdown
 * - Code block
 */
export const blockTagRegex: string = `^(${Object.values(paragraphs).join("|")})+$`;

/**
 * Regular expression for block tag with first line optional.
 *
 * Identifies {@link blockTagRegex | block sentences}, optionally preceded by {@link firstLineTagRegex | first line sentence}, for example title in `example` tag.
 */
export const blockFirstLineTagRegex: string = `^(${firstLineSentence}\n)?(${Object.values(paragraphs).join("|")})+$`;

/**
 * Regular expression for short comments.
 *
 * Identifies first line only tags, that begin with sensible character, and do not end with a period.
 */
export const firstLineTagRegex: string = `^${firstLineSentence}$`;

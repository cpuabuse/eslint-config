/*
	Copyright 2023 cpuabuse.com
	Licensed under the ISC License (https://opensource.org/licenses/ISC)
*/

/**
 * @file
 * Regex bits.
 * @module lib
 */

/**
 * Backtick character.
 */
const backtickChars: string = "`";

/**
 * Numbers.
 */
const numberChars: string = "\\d";

/**
 * All regex characters.
 */
const allChars: string = `[\\s\\S]`;

/**
 * First letter in English sentences, that are not used for Markdown.
 */
const englishFirstChars: string = `A-Z${backtickChars}"'{`;

/**
 * Characters in the middle of English sentence, with characters needed for inline tags, that are not used for Markdown.
 */
const englishMiddleChars: string = `$A-Za-z ${numberChars}${backtickChars}"'{@#.:},-;`;

/**
 * Sentence following a tag immediately.
 */
const inlineSequence: string = `[${englishFirstChars}${numberChars}].*([^.])`;

/**
 * Possible paragraphs in a comment.
 */
const paragraphs: Record<string, string> = {
	// Represents a paragraph that is a markdown codeblock.
	code: "(```.*\\n((?!```).+\\n(\\n?|(?=```)))+```)",

	// Represents a paragraph in English.
	english: `[${englishFirstChars}][${englishMiddleChars}]*[.]`
};

/**
 * Represents a paragraph.
 */
const paragraphSequence: string = `(${Object.values(paragraphs).join("|")})`;

/**
 * Represents a sequence with special characters as the first symbol.
 *
 * @remarks
 * - `^\n` is also there, to avoid triggering on empty lines
 * - `a-z` to not ignore potential mistake of starting sentence from small letter
 */
const specialBeginningSequence: string = `[^${englishFirstChars}a-z\\n]${allChars}*`;

/**
 * Represents a sequence with special characters as the middle or last symbol.
 */
const specialRestSequence: string = `[${allChars}*[^${englishMiddleChars}.\\n]${allChars}*`;

/**
 * Captures a body of a comment.
 */
const bodySequence: string = `(${paragraphSequence}\\n\\n?)*${paragraphSequence}\\n?`;

/**
 * A sequence, signifying markdown use.
 */
const invalidatingSequence: string = `^${specialBeginningSequence}$|^${allChars}*\\n${specialBeginningSequence}$|^${specialRestSequence}$`;

/**
 * Regular expression for long comments.
 *
 * Identifies comments consisting of paragraphs, separated by two newlines. Each paragraph is identified by one of the following:
 * - Paragraph in English, that does not contain Markdown characters, or start with characters for Markdown
 * - Paragraph, containing Markdown characters
 * - Paragraph, starting with a character, that could identify Markdown
 * - Code block
 *
 * @remarks
 * Have to accomodate for trailing `\n` after description followed by tag. For cases when there is no tag, rule will produce false positive, but only way to avoid it would be either AST scope setting or more complex RegEx.
 */
export const blockTagRegex: string = `^${bodySequence}$|${invalidatingSequence}`;

/**
 * Regular expression for block tag with first line optional.
 *
 * Identifies block sentences similar to {@link blockTagRegex}, optionally preceded by {@link inlineTagRegex | first line sentence}, for example title in `example` tag.
 *
 * @remarks
 * In a comment, empty first line would not contribute a newline for expression evaluation. It opens up an edge case, where {@link inlineTagRegex | first line sentence} would be written in a block, rather than in a first line, fixing which would be too complicated, so leaving as is.
 */
export const blockFirstLineTagRegex: string = `^(${inlineSequence}\\n)?${bodySequence}$|${invalidatingSequence}`;

/**
 * Regular expression for short comments.
 *
 * Identifies first line only tags, that begin with sensible character, and do not end with a period.
 */
export const inlineTagRegex: string = `^${inlineSequence}$`;

/**
 * Only to be applied to one line blocks.
 *
 * @remarks
 * Since application method is different, last space is captured, first is not.
 */
export const blockOneLineRegex: string = `^${paragraphs.english}\\s$`;

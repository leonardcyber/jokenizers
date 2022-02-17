"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Encoding = void 0;
const utils_1 = require("../../bindings/utils");
class Encoding {
    constructor(_rawEncoding) {
        this._rawEncoding = _rawEncoding;
    }
    /**
     * Merge a list of Encoding into one final Encoding
     * @param encodings The list of encodings to merge
     * @param [growingOffsets=false] Whether the offsets should accumulate while merging
     */
    static merge(encodings, growingOffsets) {
        const mergedRaw = utils_1.mergeEncodings(encodings.map((e) => e.rawEncoding), growingOffsets);
        return new Encoding(mergedRaw);
    }
    /**
     * Number of sequences
     */
    get nSequences() {
        return this._rawEncoding.getNSequences();
    }
    setSequenceId(seqId) {
        return this._rawEncoding.setSequenceId(seqId);
    }
    /**
     * Attention mask
     */
    get attentionMask() {
        if (this._attentionMask) {
            return this._attentionMask;
        }
        return (this._attentionMask = this._rawEncoding.getAttentionMask());
    }
    /**
     * Tokenized ids
     */
    get ids() {
        if (this._ids) {
            return this._ids;
        }
        return (this._ids = this._rawEncoding.getIds());
    }
    /**
     * Number of tokens
     */
    get length() {
        if (this._length !== undefined) {
            return this._length;
        }
        return (this._length = this._rawEncoding.getLength());
    }
    /**
     * Offsets
     */
    get offsets() {
        if (this._offsets) {
            return this._offsets;
        }
        return (this._offsets = this._rawEncoding.getOffsets());
    }
    /**
     * Overflowing encodings, after truncation
     */
    get overflowing() {
        if (this._overflowing) {
            return this._overflowing;
        }
        return (this._overflowing = this._rawEncoding
            .getOverflowing()
            .map((e) => new Encoding(e)));
    }
    /**
     * __⚠️ DANGER ZONE: do not touch unless you know what you're doing ⚠️__
     * Access to the `rawEncoding` returned by the internal Rust code.
     * @private
     * @ignore
     * @since 0.6.0
     */
    get rawEncoding() {
        return this._rawEncoding;
    }
    /**
     * Special tokens mask
     */
    get specialTokensMask() {
        if (this._specialTokensMask) {
            return this._specialTokensMask;
        }
        return (this._specialTokensMask = this._rawEncoding.getSpecialTokensMask());
    }
    /**
     * Tokenized string
     */
    get tokens() {
        if (this._tokens) {
            return this._tokens;
        }
        return (this._tokens = this._rawEncoding.getTokens());
    }
    /**
     * Type ids
     */
    get typeIds() {
        if (this._typeIds) {
            return this._typeIds;
        }
        return (this._typeIds = this._rawEncoding.getTypeIds());
    }
    /**
     * The tokenized words indexes
     */
    get wordIndexes() {
        if (this._wordIndexes) {
            return this._wordIndexes;
        }
        return (this._wordIndexes = this._rawEncoding.getWordIds());
    }
    get sequenceIndexes() {
        if (this._sequenceIndexes) {
            return this._sequenceIndexes;
        }
        return (this._sequenceIndexes = this._rawEncoding.getSequenceIds());
    }
    /**
     * Get the encoded tokens corresponding to the word at the given index in one of the input
     * sequences, with the form [startToken, endToken+1]
     * @param word The position of a word in one of the input sequences
     * @param seqId The index of the input sequence that contains said word
     * @since 0.7.0
     */
    wordToTokens(word, seqId) {
        return this._rawEncoding.wordToTokens(word, seqId);
    }
    /**
     * Get the offsets of the word at the given index in the input sequence
     * @param word The index of the word in the input sequence
     * @param seqId The index of the input sequence that contains said word
     * @since 0.7.0
     */
    wordToChars(word, seqId) {
        return this._rawEncoding.wordToChars(word, seqId);
    }
    /**
     * Get the index of the sequence that contains the given token
     * @param token The index of the token in the encoded sequence
     */
    tokenToSequence(token) {
        return this._rawEncoding.tokenToSequence(token);
    }
    /**
     * Get the offsets of the token at the given index
     *
     * The returned offsets are related to the input sequence that contains the
     * token.  In order to determine in which input sequence it belongs, you
     * must call `tokenToSequence`.
     *
     * @param token The index of the token in the encoded sequence
     * @since 0.7.0
     */
    tokenToChars(token) {
        return this._rawEncoding.tokenToChars(token);
    }
    /**
     * Get the word that contains the token at the given index
     *
     * The returned index is related to the input sequence that contains the
     * token.  In order to determine in which input sequence it belongs, you
     * must call `tokenToSequence`.
     *
     * @param token The index of the token  in the encoded sequence
     * @since 0.7.0
     */
    tokenToWord(token) {
        return this._rawEncoding.tokenToWord(token);
    }
    /**
     * Find the index of the token at the position of the given char
     * @param pos The position of a char in one of the input strings
     * @param seqId The index of the input sequence that contains said char
     * @since 0.6.0
     */
    charToToken(pos, seqId) {
        return this._rawEncoding.charToToken(pos, seqId);
    }
    /**
     * Get the word that contains the given char
     * @param pos The position of a char in the input string
     * @param seqId The index of the input sequence that contains said char
     * @since 0.7.0
     */
    charToWord(pos, seqId) {
        return this._rawEncoding.charToWord(pos, seqId);
    }
    /**
     * Pad the current Encoding at the given length
     *
     * @param length The length at which to pad
     * @param [options] Padding options
     */
    pad(length, options) {
        this._rawEncoding.pad(length, options);
        this.resetInternalProperties();
    }
    /**
     * Truncate the current Encoding at the given max length
     *
     * @param length The maximum length to be kept
     * @param [stride=0] The length of the previous first sequence
     * to be included in the overflowing sequence
     * @param [direction='right'] Truncate direction
     */
    truncate(length, stride, direction = "right") {
        this._rawEncoding.truncate(length, stride, direction);
        this.resetInternalProperties();
    }
    resetInternalProperties() {
        for (const prop of [
            "_attentionMask",
            "_ids",
            "_length",
            "_offsets",
            "_overflowing",
            "_specialTokensMask",
            "_tokens",
            "_typeIds",
            "_wordIndexes",
        ]) {
            delete this[prop];
        }
    }
}
exports.Encoding = Encoding;
//# sourceMappingURL=encoding.js.map
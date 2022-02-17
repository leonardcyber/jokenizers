import { PaddingOptions, RawEncoding } from "../../bindings/raw-encoding";
export declare class Encoding {
    private _rawEncoding;
    private _attentionMask?;
    private _ids?;
    private _length?;
    private _offsets?;
    private _overflowing?;
    private _specialTokensMask?;
    private _tokens?;
    private _typeIds?;
    private _wordIndexes?;
    private _sequenceIndexes?;
    constructor(_rawEncoding: RawEncoding);
    /**
     * Merge a list of Encoding into one final Encoding
     * @param encodings The list of encodings to merge
     * @param [growingOffsets=false] Whether the offsets should accumulate while merging
     */
    static merge(encodings: Encoding[], growingOffsets?: boolean): Encoding;
    /**
     * Number of sequences
     */
    get nSequences(): number;
    setSequenceId(seqId: number): void;
    /**
     * Attention mask
     */
    get attentionMask(): number[];
    /**
     * Tokenized ids
     */
    get ids(): number[];
    /**
     * Number of tokens
     */
    get length(): number;
    /**
     * Offsets
     */
    get offsets(): [number, number][];
    /**
     * Overflowing encodings, after truncation
     */
    get overflowing(): Encoding[];
    /**
     * __⚠️ DANGER ZONE: do not touch unless you know what you're doing ⚠️__
     * Access to the `rawEncoding` returned by the internal Rust code.
     * @private
     * @ignore
     * @since 0.6.0
     */
    get rawEncoding(): Readonly<RawEncoding>;
    /**
     * Special tokens mask
     */
    get specialTokensMask(): number[];
    /**
     * Tokenized string
     */
    get tokens(): string[];
    /**
     * Type ids
     */
    get typeIds(): number[];
    /**
     * The tokenized words indexes
     */
    get wordIndexes(): (number | undefined)[];
    get sequenceIndexes(): (number | undefined)[];
    /**
     * Get the encoded tokens corresponding to the word at the given index in one of the input
     * sequences, with the form [startToken, endToken+1]
     * @param word The position of a word in one of the input sequences
     * @param seqId The index of the input sequence that contains said word
     * @since 0.7.0
     */
    wordToTokens(word: number, seqId?: number): [number, number] | undefined;
    /**
     * Get the offsets of the word at the given index in the input sequence
     * @param word The index of the word in the input sequence
     * @param seqId The index of the input sequence that contains said word
     * @since 0.7.0
     */
    wordToChars(word: number, seqId?: number): [number, number] | undefined;
    /**
     * Get the index of the sequence that contains the given token
     * @param token The index of the token in the encoded sequence
     */
    tokenToSequence(token: number): number | undefined;
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
    tokenToChars(token: number): [number, number] | undefined;
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
    tokenToWord(token: number): number | undefined;
    /**
     * Find the index of the token at the position of the given char
     * @param pos The position of a char in one of the input strings
     * @param seqId The index of the input sequence that contains said char
     * @since 0.6.0
     */
    charToToken(pos: number, seqId?: number): number | undefined;
    /**
     * Get the word that contains the given char
     * @param pos The position of a char in the input string
     * @param seqId The index of the input sequence that contains said char
     * @since 0.7.0
     */
    charToWord(pos: number, seqId?: number): number | undefined;
    /**
     * Pad the current Encoding at the given length
     *
     * @param length The length at which to pad
     * @param [options] Padding options
     */
    pad(length: number, options?: PaddingOptions): void;
    /**
     * Truncate the current Encoding at the given max length
     *
     * @param length The maximum length to be kept
     * @param [stride=0] The length of the previous first sequence
     * to be included in the overflowing sequence
     * @param [direction='right'] Truncate direction
     */
    truncate(length: number, stride?: number, direction?: string): void;
    private resetInternalProperties;
}

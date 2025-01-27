"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPETokenizer = void 0;
const util_1 = require("util");
const decoders_1 = require("../../../bindings/decoders");
const models_1 = require("../../../bindings/models");
const normalizers_1 = require("../../../bindings/normalizers");
const pre_tokenizers_1 = require("../../../bindings/pre-tokenizers");
const tokenizer_1 = require("../../../bindings/tokenizer");
const trainers_1 = require("../../../bindings/trainers");
const base_tokenizer_1 = require("./base.tokenizer");
/**
 * Original BPE Tokenizer.
 * Represents the BPE algorithm, as introduced by Rico Sennrich (https://arxiv.org/abs/1508.07909)
 */
class BPETokenizer extends base_tokenizer_1.BaseTokenizer {
    constructor(tokenizer, configuration) {
        super(tokenizer, configuration);
        this.defaultTrainOptions = {
            initialAlphabet: [],
            limitAlphabet: 1000,
            minFrequency: 2,
            showProgress: true,
            specialTokens: ["<unk>"],
            suffix: "</w>",
            vocabSize: 30000,
        };
    }
    /**
     * Instantiate and returns a new BPE tokenizer
     * @param [options] Optional tokenizer options
     */
    static async fromOptions(options) {
        const opts = Object.assign(Object.assign({}, this.defaultBPEOptions), options);
        const unkToken = base_tokenizer_1.getTokenContent(opts.unkToken);
        let model;
        if (opts.vocabFile && opts.mergesFile) {
            const modelOptions = {
                dropout: opts.dropout,
                endOfWordSuffix: opts.suffix,
                unkToken: unkToken,
            };
            const fromFile = util_1.promisify(models_1.BPE.fromFile);
            model = await fromFile(opts.vocabFile, opts.mergesFile, modelOptions);
        }
        else {
            model = models_1.BPE.empty();
        }
        const tokenizer = new tokenizer_1.Tokenizer(model);
        if (tokenizer.tokenToId(unkToken) !== undefined) {
            tokenizer.addSpecialTokens([opts.unkToken]);
        }
        if (opts.lowercase) {
            tokenizer.setNormalizer(normalizers_1.sequenceNormalizer([normalizers_1.nfkcNormalizer(), normalizers_1.lowercaseNormalizer()]));
        }
        else {
            tokenizer.setNormalizer(normalizers_1.nfkcNormalizer());
        }
        tokenizer.setPreTokenizer(pre_tokenizers_1.whitespaceSplitPreTokenizer());
        const decoder = decoders_1.bpeDecoder(opts.suffix);
        tokenizer.setDecoder(decoder);
        return new BPETokenizer(tokenizer, opts);
    }
    /**
     * Train the model using the given files
     *
     * @param files Files to use for training
     * @param [options] Training options
     */
    async train(files, options) {
        const mergedOptions = Object.assign(Object.assign({}, this.defaultTrainOptions), options);
        const trainer = trainers_1.bpeTrainer(mergedOptions);
        this.tokenizer.train(trainer, files);
    }
}
exports.BPETokenizer = BPETokenizer;
BPETokenizer.defaultBPEOptions = {
    suffix: "</w>",
    unkToken: "<unk>",
};
//# sourceMappingURL=bpe.tokenizer.js.map
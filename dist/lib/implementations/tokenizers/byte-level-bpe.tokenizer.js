"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ByteLevelBPETokenizer = void 0;
const util_1 = require("util");
const decoders_1 = require("../../../bindings/decoders");
const models_1 = require("../../../bindings/models");
const normalizers_1 = require("../../../bindings/normalizers");
const post_processors_1 = require("../../../bindings/post-processors");
const pre_tokenizers_1 = require("../../../bindings/pre-tokenizers");
const tokenizer_1 = require("../../../bindings/tokenizer");
const trainers_1 = require("../../../bindings/trainers");
const base_tokenizer_1 = require("./base.tokenizer");
/**
 * Represents a Byte-level BPE as introduced by OpenAI with their GPT-2 model
 */
class ByteLevelBPETokenizer extends base_tokenizer_1.BaseTokenizer {
    constructor(tokenizer, configuration) {
        super(tokenizer, configuration);
        this.defaultTrainOptions = {
            minFrequency: 2,
            showProgress: true,
            specialTokens: ["<unk>"],
            vocabSize: 30000,
        };
    }
    static async fromOptions(options) {
        const opts = Object.assign(Object.assign({}, this.defaultOptions), options);
        let model;
        if (opts.vocabFile && opts.mergesFile) {
            const fromFile = util_1.promisify(models_1.BPE.fromFile);
            model = await fromFile(opts.vocabFile, opts.mergesFile, opts);
        }
        else {
            model = models_1.BPE.empty();
        }
        const tokenizer = new tokenizer_1.Tokenizer(model);
        if (opts.lowercase) {
            tokenizer.setNormalizer(normalizers_1.sequenceNormalizer([normalizers_1.nfkcNormalizer(), normalizers_1.lowercaseNormalizer()]));
        }
        else {
            tokenizer.setNormalizer(normalizers_1.nfkcNormalizer());
        }
        const preTokenizer = pre_tokenizers_1.byteLevelPreTokenizer(opts.addPrefixSpace);
        tokenizer.setPreTokenizer(preTokenizer);
        tokenizer.setDecoder(decoders_1.byteLevelDecoder());
        tokenizer.setPostProcessor(post_processors_1.byteLevelProcessing(opts.trimOffsets));
        return new ByteLevelBPETokenizer(tokenizer, opts);
    }
    /**
     * Train the model using the given files
     *
     * @param files Files to use for training
     * @param [options] Training options
     */
    async train(files, options) {
        const mergedOptions = Object.assign(Object.assign({}, this.defaultTrainOptions), options);
        const trainer = trainers_1.bpeTrainer(Object.assign(Object.assign({}, mergedOptions), { initialAlphabet: pre_tokenizers_1.byteLevelAlphabet() }));
        this.tokenizer.train(trainer, files);
    }
}
exports.ByteLevelBPETokenizer = ByteLevelBPETokenizer;
ByteLevelBPETokenizer.defaultOptions = {
    addPrefixSpace: false,
    trimOffsets: false,
};
//# sourceMappingURL=byte-level-bpe.tokenizer.js.map
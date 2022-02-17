"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaddingDirection = exports.TruncationDirection = exports.TruncationStrategy = void 0;
var TruncationStrategy;
(function (TruncationStrategy) {
    TruncationStrategy["LongestFirst"] = "longest_first";
    TruncationStrategy["OnlyFirst"] = "only_first";
    TruncationStrategy["OnlySecond"] = "only_second";
})(TruncationStrategy = exports.TruncationStrategy || (exports.TruncationStrategy = {}));
var TruncationDirection;
(function (TruncationDirection) {
    TruncationDirection["Left"] = "left";
    TruncationDirection["Right"] = "right";
})(TruncationDirection = exports.TruncationDirection || (exports.TruncationDirection = {}));
var PaddingDirection;
(function (PaddingDirection) {
    PaddingDirection["Left"] = "left";
    PaddingDirection["Right"] = "right";
})(PaddingDirection = exports.PaddingDirection || (exports.PaddingDirection = {}));

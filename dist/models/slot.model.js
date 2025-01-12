"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slot = exports.SlotSchema = void 0;
const mongoose_1 = require("mongoose");
const InfoSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
});
exports.SlotSchema = new mongoose_1.Schema({
    date: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    // infos: [InfoSchema],
    infos: [String],
});
exports.Slot = (0, mongoose_1.model)("Slot", exports.SlotSchema);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = void 0;
const mongoose_1 = require("mongoose");
const slot_model_1 = require("./slot.model");
const TableSchema = new mongoose_1.Schema({
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    schema: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "TableStyle",
    },
    slots: [slot_model_1.SlotSchema],
});
exports.Table = (0, mongoose_1.model)("Table", TableSchema);

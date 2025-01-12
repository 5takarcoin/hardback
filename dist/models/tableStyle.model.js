"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableStyle = void 0;
const mongoose_1 = require("mongoose");
const TableStyleSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    start: { type: Number, required: true },
    end: { type: Number, required: true },
    duration: { type: Number, required: true },
    interval: { type: Number, required: true },
});
exports.TableStyle = (0, mongoose_1.model)("TableStyle", TableStyleSchema);

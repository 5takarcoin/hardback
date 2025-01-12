"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const table_model_1 = require("../models/table.model");
const tableRouter = (0, express_1.Router)();
tableRouter.get("", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allTables = yield table_model_1.Table.find();
    res.send(allTables);
}));
tableRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allTables = yield table_model_1.Table.findById(req.params.id)
        .populate("schema")
        .populate("slots")
        .populate("owner");
    res.send(allTables);
}));
tableRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const table = yield table_model_1.Table.findById(req.params.id).populate("slots");
        if (table) {
            table.slots = [...table.slots, req.body];
            yield table.save();
        }
        res.send(table);
    }
    catch (err) {
        res.send(err);
    }
}));
tableRouter.post("", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const table = new table_model_1.Table(req.body);
        const result = yield table.save();
        res.send(result);
    }
    catch (err) {
        res.send(err);
    }
}));
// tableRouter.post("/:id", async (req, res) => {
//   try {
//     const slot = new Slot({ date: Number(new Date()) });
//     const result = await slot.save();
//     res.send(slot);
//   } catch (err) {
//     console.log(err);
//     res.send(err);
//   }
// });
exports.default = tableRouter;

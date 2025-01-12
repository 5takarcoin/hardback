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
const tableStyle_model_1 = require("../models/tableStyle.model");
const tableStyleRouter = (0, express_1.Router)();
tableStyleRouter.get("", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTableStyles = yield tableStyle_model_1.TableStyle.find();
        res.send(allTableStyles);
    }
    catch (err) {
        res.send(err);
    }
}));
tableStyleRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTableStyles = yield tableStyle_model_1.TableStyle.findOne({ name: req.params.id });
        res.send(allTableStyles);
    }
    catch (err) {
        res.send(err);
    }
}));
tableStyleRouter.post("", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const table = new tableStyle_model_1.TableStyle(req.body);
        const result = yield table.save();
        res.send(result);
    }
    catch (err) {
        res.send(err);
    }
}));
exports.default = tableStyleRouter;

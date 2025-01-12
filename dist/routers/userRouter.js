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
const user_model_1 = require("../models/user.model");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const userRouter = (0, express_1.Router)();
userRouter.get("", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield user_model_1.User.find();
    res.send(allUsers);
}));
userRouter.get("/profile", auth_middleware_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield user_model_1.User.findOne({
        username: req.user.username,
    }).populate({
        path: "currTable",
        populate: {
            path: "schema",
        },
    });
    res.status(200).send({ message: "Access granted", user: doc });
}));
userRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield user_model_1.User.findOne({ username: req.params.id }).populate({
        path: "currTable",
        populate: {
            path: "schema",
        },
    });
    // const result = await doc?.currTable?.populate("schema")
    res.send(doc);
}));
userRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield user_model_1.User.findOne({ username: req.params.id });
        if (doc) {
            doc.currTable = req.body.currTable;
            yield doc.save();
            res.send({ message: "Table Assigned" });
        }
    }
    catch (error) {
        res.send(error);
    }
}));
exports.default = userRouter;

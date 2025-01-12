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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = require("express");
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const authRouter = (0, express_1.Router)();
authRouter.get("/", (req, res) => {
    res.send("Current beda");
});
authRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const encpass = yield bcrypt_1.default.hash(req.body.password, 10);
        const user = new user_model_1.User(Object.assign(Object.assign({}, req.body), { password: encpass }));
        yield user.save();
        const token = jsonwebtoken_1.default.sign({ username: user.username, userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 60 * 60 * 1000,
        });
        res.send({ token, message: "Signup Successful" });
    }
    catch (err) {
        console.log(err);
    }
}));
authRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield user_model_1.User.findOne({ username: req.body.username });
        if (doc) {
            const check = yield bcrypt_1.default.compare(req.body.password, doc.password);
            if (!check) {
                res.send({ message: "Wrong Password" });
                return;
            }
            yield doc.populate({
                path: "currTable",
                populate: {
                    path: "schema",
                },
            });
            const token = jsonwebtoken_1.default.sign({ username: doc.username, userId: doc._id }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                maxAge: 60 * 60 * 1000,
            });
            res.send({ token, message: "Login Successful" });
        }
        else {
            res.send({ message: "User not found" });
            return;
        }
    }
    catch (error) {
        res.send(error);
    }
}));
authRouter.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.send({ message: "Logged out successfully" });
});
exports.default = authRouter;

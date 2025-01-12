"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authrouter_1 = __importDefault(require("./authrouter"));
const tableStyleRouter_1 = __importDefault(require("./tableStyleRouter"));
const userRouter_1 = __importDefault(require("./userRouter"));
const tablerouter_1 = __importDefault(require("./tablerouter"));
const router = (0, express_1.Router)();
router.use("/auth", authrouter_1.default);
router.use("/tableStyle", tableStyleRouter_1.default);
router.use("/user", userRouter_1.default);
router.use("/table", tablerouter_1.default);
exports.default = router;

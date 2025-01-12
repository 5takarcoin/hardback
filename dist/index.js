"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const dbConfig_1 = require("./dbConfig/dbConfig");
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./routers/router"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
(0, dbConfig_1.connectDB)();
app.use((0, cors_1.default)({
    origin: process.env.CLIENT,
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.send("Hello, TypeScript with Express!");
});
app.use("/api/v1", router_1.default);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

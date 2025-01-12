"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
// export const authenticateJWT = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const authHeader = req.headers.authorization;
//   if (authHeader && authHeader.startsWith("Bearer ")) {
//     const token = authHeader.split(" ")[1];
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET!);
//       // req.user = decoded; // Attach decoded data to the request
//       next();
//     } catch (err) {
//       res.send({ message: "Invalid token" });
//     }
//   } else {
//     res.send({ message: "Authorization token missing" });
//   }
// };
const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.send({ message: "Authorization token missing" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        console.error("Invalid token:", err);
        res.send({ message: "Invalid token" });
    }
};
exports.authenticateJWT = authenticateJWT;

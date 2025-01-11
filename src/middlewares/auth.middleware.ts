import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

dotenv.config();

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

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    res.send({ message: "Authorization token missing" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = decoded;
    next();
  } catch (err) {
    console.error("Invalid token:", err);
    res.send({ message: "Invalid token" });
  }
};

import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { connectDB } from "./dbConfig/dbConfig";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Simple route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

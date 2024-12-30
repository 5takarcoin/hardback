import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { connectDB } from "./dbConfig/dbConfig";
import { Slot } from "./models/slot.model";
import cors from "cors";
import router from "./routers/router";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

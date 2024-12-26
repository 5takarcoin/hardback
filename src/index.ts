import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { connectDB } from "./dbConfig/dbConfig";
import { Slots } from "./models/slots.models";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.post("/api/v1/slots", async (req: Request, res: Response) => {
  const newSlot = new Slots(req.body);
  const created = await newSlot.save();
  const da = new Date(created.date).toISOString();
  console.log(da);
  res.send(created);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

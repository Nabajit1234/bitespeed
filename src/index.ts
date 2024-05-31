import dotenv from "dotenv";
import express, { Request, Response } from "express";

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.post("/identify", async (req: Request, res: Response) => {
  return res.status(200).json({message: "All good!"})
})

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`)
})
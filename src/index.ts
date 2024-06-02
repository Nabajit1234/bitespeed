import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { checkDatabaseConnection } from "./database/mysql_sequelize.database";
import { router } from "./routes/index.route";

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())

app.use(router)

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`)
  checkDatabaseConnection()
})
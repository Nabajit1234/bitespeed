import { config } from "dotenv";
import { Sequelize } from "sequelize";

config()

const MYSQL_DATABASE_NAME = <string>process.env.MYSQL_DATABASE_NAME
const MYSQL_USERNAME = <string>process.env.MYSQL_USERNAME
const MYSQL_PASSWORD = <string>process.env.MYSQL_PASSWORD
const MYSQL_HOST = <string>process.env.MYSQL_HOST
const MYSQL_PORT = Number(process.env.MYSQL_PORT)

export const sequelize = new Sequelize({
  database: MYSQL_DATABASE_NAME,
  username: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  dialect: 'mysql',
  logging: false,
  ssl: true
})

export async function checkDatabaseConnection() {
  try {
    await sequelize.authenticate()
    console.log(`connected to ${MYSQL_DATABASE_NAME}`)
    await sequelize.sync({alter: true})
  } catch (error: any) {
    console.log("error: ", error.message)
  }
}
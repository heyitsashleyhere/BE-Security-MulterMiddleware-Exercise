import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import apiRouter from "./routes/apiRouter.js"
import { connect } from "./libs/database.js"

dotenv.config()
await connect()
const app = express()

app.use(cors())
app.use(express.json())

// Endpoints
app.use("/api", apiRouter)

app.listen(3099, () => {
  console.log(`The server 🙈 is listening on port http://localhost:3099`)
})

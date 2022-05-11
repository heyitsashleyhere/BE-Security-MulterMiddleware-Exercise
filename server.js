import dotenv from "dotenv"
import express from "express"

dotenv.config()

const app = express()

// Middleware
app.use(express.json())

// Routes

app.listen(3099, () => {
  console.log(`The server 🙈 is listening on port 3099`)
})

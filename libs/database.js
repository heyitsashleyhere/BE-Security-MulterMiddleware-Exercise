import mongoose from "mongoose"

// This connects our app to MongoDB
export function connect() {
  // Add mongoose connection event to follow what is happening with the connection
  mongoose.connection.on("error",         e => console.log("[M] Error", e))
  mongoose.connection.on("connecting",    x => console.log("[M] Connecting"))
  mongoose.connection.on("connected",     x => console.log("[M] Connected"))
  mongoose.connection.on("disconnecting", x => console.log("[M] Disconnecting"))
  mongoose.connection.on("disconnected",  x => console.log("[M] Disconnected"))

  // Construct connection string and start to connect
  const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env
  const cs = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`
  return mongoose.connect(cs)
}

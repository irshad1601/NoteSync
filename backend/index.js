import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRouter from "./routes/auth.route.js"
import noteRouter from "./routes/note.route.js"
import errorHandler from "./middlewares/errorHandler.js"
import connectDB from "./config/db.js"

dotenv.config()

// Connect to mongoDB
connectDB();

const app = express()

// to make input as json
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: ["https://note-sync-beta.vercel.app"], // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Important for cookies/auth
  })
);


app.use("/api/auth", authRouter)
app.use("/api/note", noteRouter)

// error handling
app.use(errorHandler)


const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

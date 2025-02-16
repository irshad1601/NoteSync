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

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("Connected to mongoDB")
//   })
//   .catch((err) => {
//     console.log(err)
//   })

const app = express()

// to make input as json
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }))


app.use("/api/auth", authRouter)
app.use("/api/note", noteRouter)

// error handling
app.use(errorHandler)


const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
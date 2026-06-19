import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app = express() 
import userRouter from '../src/routes/user.routes.js'
import captainRouter from './routes/captain.routes.js'
import mapRouter from "./routes/map.routes.js"
app.use(cors({
    origin: process.env.CORS
}))
console.log(process.env.CORS)
app.use(express.json({
    limit: "16kb"
}))
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))
app.use(express.static("public"))
app.use(cookieParser())

app.use('/api/v1/auth',userRouter)
app.use('/api/v1/captain',captainRouter)
app.use("/api/v1/maps", mapRouter)

//global error handler 
app.use((err, req, res, next) => {
  console.error(err)
  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  })
})
export default app
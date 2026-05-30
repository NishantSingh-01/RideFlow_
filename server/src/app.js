import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app = express() 
import userRouter from '../src/routes/user.routes.js'
app.use(cors({
    origin: "*"
}))

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


export default app
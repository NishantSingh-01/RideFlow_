import dotenv from 'dotenv'
import app from '../src/app.js'
dotenv.config()
import {pool,connectDB} from './config/db.js'

connectDB()

app.listen(process.env.PORT,()=>{
    console.log(`The Server is Running ${process.env.PORT}`)
})
app.get("/check", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT current_database()"
        )
        res.send(
            `The Database name is :: ${result.rows[0].current_database}`
        )

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Database error")
    }
})
app.get('/api/v1', (_, res) => {
    res.send('Welcome to the RideFlow')
})
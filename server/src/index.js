import dotenv from 'dotenv'
import app from '../src/app.js'
dotenv.config()



app.listen(process.env.PORT,()=>{
    console.log(`The Server is Running ${process.env.PORT}`)
})
app.get('/api/v1', (_, res) => {
    res.send('Welcome to the RideFlow')
})
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodroute.js';
import userRouter from './routes/userroute.js';
import 'dotenv/config';
import cartRouter from './routes/cartroute.js';
import orderRouter from './routes/orderroute.js';


// App config
const app = express();
const port = process.env.PORT || 4000;



// Middleware
app.use(express.json())
app.use(cors())


// DB Connection
// connectDB();
connectDB();

// api endpoint
app.use("/api/food",foodRouter)
app.use('/images',express.static('uploads'))
app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)


app.get('/',(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})



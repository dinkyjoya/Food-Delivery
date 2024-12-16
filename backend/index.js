import express from 'express';
import cors from 'cors';
import { connectDatabase } from './config/Database.js';
import foodRouter from './Routes/foodRouter.js';
import UserRouter from './Routes/UserRouter.js';
import 'dotenv/config';
import bodyParser from 'body-parser';
import cartRouter from './Routes/cartRouter.js';
import orderRouter from './Routes/orderRouter.js';



//app config
const app = express()
const port = process.env.PORT || 8000;

//middleware
app.use(bodyParser.json());
app.use(express.json());
    app.use(cors({
        origin: "http://localhost:8000", // Set to your client URL
        methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
        credentials: true,
    }));
    

connectDatabase();

app.use("/api/food",foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", UserRouter);            //http://localhost:8000/api/user/register
app.use("/api/cart", cartRouter);
app.use("/api/order",orderRouter);



app.get("/",(req,res)=>{
    res.send("database connected")
})

app.listen(port,()=>{
    console.log(`server is running on https://localhost:${port}`)
})
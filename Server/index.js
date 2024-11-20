import express from "express";
import cors from 'cors'
import { adminRouter } from "./Routes/AdminRoute.js";
import {UserRouter} from "./Routes/UserRoute.js";

const app = express()
app.use(cors({
    origin:["http://localhost:5173"],
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}))



app.use(express.json())
app.use('/auth',adminRouter)
app.use(express.static('Public'))
app.use('/root',UserRouter)

app.listen(3000,()=>{
    console.log("Server is running")
})
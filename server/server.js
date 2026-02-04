import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";

import "./db/chroma.js";
import "./db/mongo.js";

dotenv.config();
app.use(cors());
app.use(express.json());

// import uploadRoutes from "./routes/uploadRoutes.js";
// import queryRoutes from "./routes/queryRoutes.js";


app.get("/",(req,res)=>{
    res.send("MemoryMap API is running...");
});

app.use("/api/upload", uploadRoutes);
app.use("/api/query", queryRoutes);

const port = 8080;

app.listen(port, ()=>{
    console.log(`App is listening on port : ${port}`);
});

import {connectMongo} from "./db/mongo.js";
connectMongo();
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import{processFile} from "../rag/chunker.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, "/uploads");
    },
    filename: (req,file,cb)=>{
        cb(null, Date.now()+ "-" + file.originalname);
    }
});

const upload = multer({storage});

router.post("/", upload.single("file"), async (req,res)=>{
    try{
        const filepath = req.file.path;
        const result = await processFile(filepath);

        req.json({
            success: true,
            chunks: result.totalChunks,
            file: req.file.filename
        });
    }catch(error){
        console.log("Upload error : ",error);
        res.status(500).json({error: "Upload Failed!"});
    }
});

export default router;
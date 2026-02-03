import pdfParse from "pdf-parse";
import sharp from "sharp";
import fs from "fs";
import {embedChunks} from "./embedder.js";

export const processFile = async(filePath)=>{
    const ext = filePath.split(".").pop();

    let rawText = "";

    if(ext=="pdf"){
        const data = await pdfParse(fs.readFileSync(filePath));
        rawText = data.text;
    }
    else if(["jpg","jpeg","png"].includes(ext)){
        rawText = await extractTextFromImage(filePath);
    }
    else{
        rawText = fs.readFileSync(filePath,"utf8");
    }

    const chunks = createChunks(rawText,500);

    await embedChunks(chunks);

    return {totalChunks: chunks.length};
};

const createChunks = (text,size)=>{
    const tokens = text.split(" ");
    let chunks = [];
    let chunk = [];

    tokens.forEach((word)=>{
        chunk.push(word);
        if(chunk.join(" ").length > size){
            chunks.push(chunk.join(" "));
            chunk = [];
        }
    });

    if(chunk.length>0){
            chunks.push(chunk.join(" "));
    }

    return chunks;
};

const extractTextFromImage = async() =>{
    return "OCR not implemented yet...";
};

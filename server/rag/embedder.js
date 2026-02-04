import client from "../db.chroma.js";
import {v4 as uuidv4} from "uuid";

export const embedChunks = async (chunks) =>{
    const collection = await client.getOrCreateCollection("memory_Chunks");

    for(let chunk of chunks){
        await collection.add({
            id: [uuidv4()],
            documents: [chunk],
            metadatas: [{source: "user_file"}]
        });
    }
    console.log("chunks added into ChromaDB");
};
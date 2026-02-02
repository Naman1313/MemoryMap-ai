import {chromaClient} from "chromadb";

const client = new chromaClient({
    path: process.env.CHROMA_PATH,
});

export default client;
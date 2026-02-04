import express from "express";
const router = express.Router();

router.post("/", async(req,res)=>{
    const {query} = req.body;

    return res.json({
        message: "Query endpoint placeholder",
        query
    });
});
export default router;
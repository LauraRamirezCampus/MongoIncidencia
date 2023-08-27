import { con } from "../../db/atlas.js";
import {limitGrt} from "../../config/limit.js"
import { Router } from "express";
import { verifyToken } from "../../config/JWT.js";

const TrainerV1 = Router();
let db = await con();
let Trainer = db.collection("trainer");


/**
 * *lista trainers
 */

TrainerV1.get("/",limitGrt(),verifyToken,async(req,res)=>{
    if(!req.rateLimit) return;
    let resul = await Trainer.find().toArray();
    res.send(resul);
    
});
 export default TrainerV1
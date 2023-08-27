import { con } from "../../db/atlas.js";
import {limitGrt} from "../../config/limit.js"
import { Router } from "express";
import { verifyToken } from "../../config/JWT.js";

const incidenciasV2 = Router();
let db = await con();
let incidencias = db.collection("incidencias");


/**
 * *lista trainers
 */

incidenciasV2.get("/",limitGrt(),verifyToken,async(req,res)=>{
    if(!req.rateLimit) return;
    let resul = await incidencias.find().toArray();
    res.send(resul);
    
});
 export default incidenciasV2
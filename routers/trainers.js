import {con} from "../db/atlas.js";
import {limitGrt} from "../limit/config.js"
import { Router } from "express";

const appTrainer = Router();
let db = await con();
let Trainer = db.collection("trainer");


/**
 * *lista trainers
 */

appTrainer.get("/",limitGrt(),async(req,res)=>{
    if(!req.rateLimit) return;
    let resul = await Trainer.find().toArray();
    res.send(resul);
    
});

/**
 * *Crea trainer
 */

appTrainer.post("/",limitGrt(),async(req,res)=>{
    try {
        let data = req.body;
        let insert = await Trainer.insertOne(data)
   
    if (insert.insertedId !== undefined ) {
        res.send({status:200, message: "Se ha ingresado correctamente la data"});
    }else{
        res.status(400).send({msg: "Error al insertar la data"})
    
    }
    
    
    } catch (error) {
        res.status(400).send({ error: error });
    }
    
})



export default appTrainer

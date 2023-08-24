import dotenv from "dotenv";
import express from "express";
import appTrainer from "./routers/trainers.js";
import {generaToken} from "./config/JWT.js";

dotenv.config();
let app = express();

app.use(express.json());
app.use("/trainer",appTrainer);
app.use("/token",generaToken);



let config = JSON.parse(process.env.MY_SERVER)

app.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`);

});

/**
 * *version api
 * *login
 * *roles
 * *
 */
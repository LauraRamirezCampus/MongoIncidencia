import dotenv from "dotenv";
import express from "express";
import {crearToken} from "./config/JWT.js";
import versionRoutes from 'express-routes-versioning';

import TrainerV1 from "./routers/version1/trainer.js";
import incidenciasV2 from "./routers/version2/incidencias.js";

dotenv.config();
let app = express();
const versionRoute = versionRoutes();

app.use(express.json());

app.use((req, res, next) => {
    req.version = req.headers['accept-version'];
    next();
});

app.use("/token/",crearToken);

 app.use('/trainer', versionRoute({
    "1.0.0": TrainerV1
 }));

 app.use('/incidencias', versionRoute({
    "2.0.0":  incidenciasV2

 }));


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
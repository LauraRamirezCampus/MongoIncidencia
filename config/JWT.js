import { SignJWT, jwtVerify } from "jose"
import {con} from "../db/atlas.js";
import { ObjectId } from "mongodb";
import dotenv from 'dotenv';
dotenv.config("../");

const conexionDB = await con();
const crearToken = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) return res.status(400).send({mesaage: "Datos no enviados"});
    const result = await conexionDB.collection('usuario').findOne(req.body);
    console.log(result);
    if (!result) return res.status(401).send({mesaage: "Usuario no encontrado"});
    const encoder = new TextEncoder();
    const id = result._id.toString();
    const jwtConstructor = await new SignJWT({ id: id})
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt()
        .setExpirationTime('3h')
        .sign(encoder.encode(process.env.JWT_SECRET));
        res.status(200).send({JWT:jwtConstructor})
    req.data = {status: 200, mesaage: jwtConstructor};
    next(); 
}



const verifyToken = async (req,res,next)=>{
    const {authorization} = req.headers;
    if (!authorization) return res.status(400).send({status: 400, token: "Token no enviado"});
    try {
        const encoder = new TextEncoder();
        const jwtData = await jwtVerify(
            authorization,
            encoder.encode(process.env.JWT_PRIVATE_KEY)
            );
            let res = await conexionDB.collection('usuario').findOne(
                {
                    _id:new ObjectId(jwtData.payload.id),
                    [`permisos.${req.baseUrl}`]: `${req.headers["accept-version"]}`
                }
                );
                
            let {_id, permisos, ...usuario} = res;
            return usuario;
            } catch (error) {
                next()
            }
}


export {
    crearToken,
    verifyToken
}
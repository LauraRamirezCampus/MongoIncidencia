import { SignJWT, jwtVerify } from "jose";
import {con} from "../db/atlas.js";
import { ObjectId } from "mongodb";
import dotenv from 'dotenv';
dotenv.config("../");

const conexion = await con();
const generaToken = async(req,res,next)=>{
    if(Object.keys(req.body).length === 0) return res.status(400).send({message:"no se han enviado los datos"});
    const result = await conexion.collection('usuario').findOne(req.body);
    if(!result) return res.status(401).send({message:"no existe el rol"});
    const encoder = new TextEncoder();
    const id = result._id.toString();
    console.log(result);
    const jwtConstructor = await new SignJWT({ id: id})
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt()
        .setExpirationTime('3h')
        .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
        res.status(200).send({mesaage: jwtConstructor})
        req.data = {status: 200, mesaage: jwtConstructor};
}

const verifyToken = async(req,token)=>{
    console.log(token);
    try {
        const encoder = new TextEncoder();
        const jwtData =await jwtVerify(
            token,
            encoder.encode(process.env.JWT_PRIVATE_KEY)
        );
        let resul = await conexion.collection('usuario').findOne({
            _id:new ObjectId(jwtData.payload.id),
            [`permisos.${req.baseUrl}`]:`${req.headers["accept-version"]}`
        });
        let {_id,permisos, ...usuario} = res;
        return usuario;
        
    } catch (error) {
        return false
        
    }
}

export  {generaToken,verifyToken}

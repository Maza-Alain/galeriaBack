import {NextFunction, Request,Response} from "express";
import {generarJWT} from "../helpers/generarJWT"
import {userData} from "../helpers/user-data";
import {v4 as uuidv4} from "uuid";

export const login = async (req:Request, res:Response) => {
    const{correo, password} = req.body;
    try {
        // -----dejo esto por si ocupo despues volver a encriptar una contraseña---
        // //encriptar contraseña
        // const salt = bcrypt.genSaltSync();
        // const pass = bcrypt.hashSync( password, salt);
        // ----------------------------------------------------------------------------
        // verificar email y contraseña
        const usuario = await userData(correo, password);
        if(!usuario) return res.status(400).json({msg: 'El correo o la contraseña no son correcto'})
        // generar JWT
        const token = await generarJWT(uuidv4());
        console.log(token);
        res.json({token})
    } catch (e) {
        console.log(e);
        return res.status(500).json({msg: 'Hable con el admin'})
    }
}


import {Request, Response} from "express";
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'
import * as fs from "fs";
import path from "path";
import {login} from "./auth";
import {v4 as uuidv4} from "uuid";

const db = new JsonDB(new Config("simpleDb", true, false, '/'));

export const crearCategoria = async (req:Request, res: Response) => {
    const { nuevaCategoria } = req.body;
    // agrega la categoria al array
    db.push("/categorias[]",{nombre: nuevaCategoria, id: uuidv4()}, true);
    // trae los datos de la db para despues actualizar el archivo json
    const data = db.getData("/");
    console.log(data)
    const pathDb = path.join(__dirname, '../helpers/simpleDb.json');
    fs.writeFile(pathDb, JSON.stringify(data), (err) => {
        if(err) throw  err;
        console.log('grabado');
        return res.status(200).send(data.categorias)
    });
}
export const borrarCategoria = async (req:Request, res: Response) => {
    const { categoria } = req.body;
    console.log('cat', categoria);
    console.log('in', db.getIndex("/categorias", categoria, "nombre"));
    console.log('dt', db.getData("/categorias[0]"));
    
    
    // --elimina la categoria al array
    db.delete("/categorias[" + db.getIndex("/categorias", categoria, "id") + "]");
    // --borrar la carpeta de la categoria
    const carpetas = path.join( __dirname, '../uploads/galeria/');
    fs.rm(`${carpetas}${categoria}`, {
        recursive: true,
    }, (error) => {
        if (error) console.log(error);
        else console.log("Recursive: Directories Deleted!");
    })
    // --trae los datos de la db para despues actualizar el archivo json
    const data = db.getData("/");
    console.log(data)
    const pathDb = path.join(__dirname, '../helpers/simpleDb.json');
    fs.writeFile(pathDb, JSON.stringify(data), (err) => {
        if(err) throw  err;
        console.log('grabado');
        return res.status(200).send(data.categorias)
    });
}
export const traerCategorias = async (req:Request, res: Response) => {
    // trae los datos de la db
    const data = db.getData("/");
    console.log(data)
    return res.status(200).send(data.categorias)
}

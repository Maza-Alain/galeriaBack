import {Request,Response} from "express";
import {subirArchivo} from "../helpers/subir-archivo";
import path from "path";
import * as fs from "fs";

export const cargarArchivo = async (req:Request, res: Response) => {  
  try {
    
    if (!req.files || Object.keys(req.files).length === 0||!req.files.archivo) {
      res.status(400).json({msg: 'No files were uploaded.'});
      return;
    }
    const { carpetaNombre } = req.params;
    console.log('----', req.params)
    const nombre = await subirArchivo(req.files, undefined, carpetaNombre);
    res.status(200).send(nombre)
    // res.status(200).send()
  } catch (e) {
    console.log(e);
    res.status(500).json({msg: 'Error :C'})
  }
}
export const traerImagenesPorCategoria = async (req:Request, res: Response) => {
  const {categoria} = req.params;
  console.log('cate', categoria);
  
  const carpeta = path.join( __dirname, '../uploads/galeria/'+categoria);
  if (!fs.existsSync(carpeta)) return res.status(200).send([]);
  const allImgs = fs.readdirSync(carpeta);
  console.log(allImgs)
  if (allImgs.length > 0) {
    const imagenes: string[] = [];
    allImgs.forEach(img => imagenes.push(`${carpeta}/${img}`));
    console.log(imagenes)
    return res.status(200).send(imagenes);
  } else {
    return res.status(200).send([]);
  }
}
export const borrarImg = async (req:Request, res: Response) => {
  const {carpetaNombre, imagenNombre} = req.params;
  const ruta = path.join( __dirname, '../uploads/galeria/'+`${carpetaNombre}/${imagenNombre}`);
  fs.rm(ruta, {
    recursive: false,
  }, (error) => {
    if (error) console.log(error);
    else res.status(200).send(imagenNombre+' eliminada');
  })
}


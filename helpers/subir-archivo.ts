import {FileArray, UploadedFile} from "express-fileupload";
import {v4 as uuidv4} from "uuid";
import path from "path";

export const subirArchivo = (files: {archivo: UploadedFile}|FileArray, extensionesValidas: string[] = ['png', 'jpg', 'jpeg', 'CR2'], carpeta: string = '') => {
    return new Promise((resolve, reject ) => {
        console.log('req.files >>>', files); // eslint-disable-line

        if (!Array.isArray(files)){
            const archivo: UploadedFile | UploadedFile[] = files.archivo ;

            if(!Array.isArray(archivo)){
                const nombreCortado = archivo.name.split('.');
                const extension = nombreCortado[ nombreCortado.length - 1];
                // validar extension
                if (!extensionesValidas.includes(extension)){
                    return reject(`La extensión ${extension} no esta permitida`);
                }
                const nombreTemp = uuidv4() + '.' + extension;
                const uploadPath = path.join(__dirname, '../uploads/galeria', carpeta, nombreTemp);

                archivo.mv(uploadPath, (err: any) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(uploadPath)
                });
            }else {
                archivo.forEach( (arch, index) =>{
                    const nombreCortado = arch.name.split('.');
                    const extension = nombreCortado[ nombreCortado.length - 1];
                    // validar extension
                    if (!extensionesValidas.includes(extension)){
                        return reject(`La extensión ${extension} no esta permitida`);
                    }
                    const nombreTemp = uuidv4() + '.' + extension;
                    const uploadPath = path.join(__dirname, '../uploads/galeria', carpeta, nombreTemp);

                    arch.mv(uploadPath, (err: any) => {
                        if (err) {
                            reject(err)
                        }
                        resolve(uploadPath)
                    });
                })
            }
        }
    })
}

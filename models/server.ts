import express, {Application} from "express";
import cors from 'cors';
import authRoutes from '../routes/auth';
import uploadsRoutes from '../routes/uploads';
import categoriasRoutes from '../routes/categorias';
import fileUpload from 'express-fileupload';

class Server {
    private app:Application;
    private port:string;
    private apiPaths ={
        auth: '/api/auth',
        uploads: '/api/uploads',
        categorias: '/api/categorias',
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';
        this.middlewares();
        this.routes();

    }

    middlewares(){
        //Cors
        this.app.use(cors())

        //parseo del body
        this.app.use(express.json())
        // Directorio Público
        this.app.use( express.static('public') );
        // fileupload- carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes(){
        this.app.use(this.apiPaths.auth, authRoutes )
        this.app.use(this.apiPaths.uploads, uploadsRoutes )
        this.app.use(this.apiPaths.categorias, categoriasRoutes )
    }


    listen(){
        this.app.listen(this.port, () =>{
            console.log('servidor corriendo en '+ this.port)
        })
    }

}
export default Server;

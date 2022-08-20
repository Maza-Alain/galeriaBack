import {Router} from "express";
import {borrarImg, cargarArchivo, traerImagenesPorCategoria} from "../controllers/uploads";
const router = Router();

router.post('/:carpetaNombre', cargarArchivo);
router.delete('/:carpetaNombre/:imagenNombre', borrarImg);
router.get('/:categoria', traerImagenesPorCategoria )

export default router;

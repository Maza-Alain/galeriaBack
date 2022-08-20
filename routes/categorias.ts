import {Router} from "express";
import {validarCampos} from "../middlewares/validar-campos";
import {borrarCategoria, crearCategoria, traerCategorias} from "../controllers/categorias";

const router = Router();

router.post('/',[
    validarCampos
] , crearCategoria )
router.delete('/',[
    validarCampos
] , borrarCategoria )
router.get('/',[
    validarCampos
] , traerCategorias )



export default router;

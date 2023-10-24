import { Router } from 'express';
import {getProductsInStock, getSpecialPrice} from '../../services/index';


const router = Router();

router.get('/products', getProductsInStock);

router.get("/price/:user_id/:nombre_producto", getSpecialPrice);

export default router;

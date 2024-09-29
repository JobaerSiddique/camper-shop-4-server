import  express  from 'express';
import { CartController } from './cart.controller';
import auth from '../../middlewares/auth';


const router = express.Router()

router.post('/',auth(),CartController.addToCart)
router.get('/',auth(),CartController.getSingleUserCart)
router.get('/totalcost',auth(),CartController.totalPrice)
router.put('/updateCart',CartController.updateCartStock)
router.delete('/delete/:id',CartController.deleteCart)






export const CartRoutes =  router;
import express  from 'express';
import { OrderController } from './order.controller';


const router = express.Router();

router.post('/createOrder',OrderController.createOrder)






export const OrderRoutes = router;
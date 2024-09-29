import  express  from 'express';
import validateRequest from '../../middlewares/vaildations';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';


const router = express.Router()

router.post('/register',validateRequest(AuthValidation.createUserValidation),AuthController.createUser)
router.post('/login',AuthController.LoginUser)
router.get('/user/:id',AuthController.userInfo)



export const AuthRoutes = router;
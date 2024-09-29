import express from "express"
import validateRequest from "../../middlewares/vaildations"
import { productValidations } from "./products.vaildation"
import { productController } from "./products.controllers"
import auth from "../../middlewares/auth"


const router = express.Router()

router.post('/create-product',validateRequest(productValidations.createProductVaildation,),productController.createProduct)
router.get('/',productController.getAllProduct)
router.get('/:id',productController.getSingleProduct)
router.put('/:id',validateRequest(productValidations.updateProductVaildation),productController.updateProduct)
router.delete('/:id',productController.deleteProduct)



export  const productRoutes = router
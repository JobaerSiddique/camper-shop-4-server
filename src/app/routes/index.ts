import { Router } from "express"
import { productRoutes } from "../modules/products/product.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { CartRoutes } from "../modules/Carts/cart.route";
import { OrderRoutes } from "../modules/Orders/order.route";

const router= Router()


const moduleRoutes = [
    {
        path:'/products',
        route: productRoutes
    },
    {
        path:'/auth',
        route: AuthRoutes
    },
    {
        path:'/carts',
        route: CartRoutes
    },
    {
        path:'/order',
        route:OrderRoutes
    }
]

 moduleRoutes.forEach((routes)=> router.use(routes.path , routes.route))
 export default router;
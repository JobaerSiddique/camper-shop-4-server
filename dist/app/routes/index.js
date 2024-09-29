"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_route_1 = require("../modules/products/product.route");
const auth_route_1 = require("../modules/auth/auth.route");
const cart_route_1 = require("../modules/Carts/cart.route");
const order_route_1 = require("../modules/Orders/order.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/products',
        route: product_route_1.productRoutes
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes
    },
    {
        path: '/carts',
        route: cart_route_1.CartRoutes
    },
    {
        path: '/order',
        route: order_route_1.OrderRoutes
    }
];
moduleRoutes.forEach((routes) => router.use(routes.path, routes.route));
exports.default = router;

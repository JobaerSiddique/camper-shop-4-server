"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRoutes = void 0;
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("./cart.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(), cart_controller_1.CartController.addToCart);
router.get('/', (0, auth_1.default)(), cart_controller_1.CartController.getSingleUserCart);
router.get('/totalcost', (0, auth_1.default)(), cart_controller_1.CartController.totalPrice);
router.put('/updateCart', cart_controller_1.CartController.updateCartStock);
router.delete('/delete/:id', cart_controller_1.CartController.deleteCart);
exports.CartRoutes = router;

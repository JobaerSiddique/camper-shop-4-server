"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = __importDefault(require("express"));
const vaildations_1 = __importDefault(require("../../middlewares/vaildations"));
const products_vaildation_1 = require("./products.vaildation");
const products_controllers_1 = require("./products.controllers");
const router = express_1.default.Router();
router.post('/create-product', (0, vaildations_1.default)(products_vaildation_1.productValidations.createProductVaildation), products_controllers_1.productController.createProduct);
router.get('/', products_controllers_1.productController.getAllProduct);
router.get('/:id', products_controllers_1.productController.getSingleProduct);
router.put('/:id', (0, vaildations_1.default)(products_vaildation_1.productValidations.updateProductVaildation), products_controllers_1.productController.updateProduct);
router.delete('/:id', products_controllers_1.productController.deleteProduct);
exports.productRoutes = router;

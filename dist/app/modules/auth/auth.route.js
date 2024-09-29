"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const vaildations_1 = __importDefault(require("../../middlewares/vaildations"));
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
router.post('/register', (0, vaildations_1.default)(auth_validation_1.AuthValidation.createUserValidation), auth_controller_1.AuthController.createUser);
router.post('/login', auth_controller_1.AuthController.LoginUser);
router.get('/user/:id', auth_controller_1.AuthController.userInfo);
exports.AuthRoutes = router;

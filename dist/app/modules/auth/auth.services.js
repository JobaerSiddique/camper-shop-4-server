"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const auth_model_1 = require("./auth.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_utils_1 = require("./auth.utils");
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../Error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield auth_model_1.User.findOne({ email: payload.email });
    if (userExists) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Email already exists");
    }
    const user = yield auth_model_1.User.create(payload);
    return user;
});
const LoginUserfromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.User.findOne({ email: payload.email });
    console.log({ user });
    if (!user) {
        throw new Error("email not Vaild");
    }
    const isPassword = yield bcrypt_1.default.compare(payload === null || payload === void 0 ? void 0 : payload.password, user.password);
    if (!isPassword) {
        throw new Error("email or password not vaild");
    }
    const accesstoken = (0, auth_utils_1.createToken)({ userId: user._id.toString(), role: user.role }, config_1.default.ACCESS_TOKEN_SECRET, "10d");
    const refreshToken = (0, auth_utils_1.createToken)({ userId: user._id.toString(), role: user.role }, config_1.default.REFRESH_TOKEN_SECRET, "365days");
    return {
        user,
        accesstoken, refreshToken
    };
});
const UserInfoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_model_1.User.findById(id);
    return result;
});
exports.AuthServices = {
    createUserIntoDB,
    LoginUserfromDB,
    UserInfoDB
};

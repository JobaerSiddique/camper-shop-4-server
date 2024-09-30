"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./app/routes"));
const globalHandlerError_1 = __importDefault(require("./app/middlewares/globalHandlerError"));
const oring = ["https://darling-gelato-f0a8a9.netlify.app", "http://localhost:5000/"];
app.use((0, cors_1.default)({
    origin: oring,
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// route 
app.use('/api/v1', routes_1.default);
app.use(globalHandlerError_1.default);
app.get('/', (req, res) => {
    res.send('Campers server is running Hurry!');
});
exports.default = app;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const userrouter = express_1.default.Router();
userrouter.post("/login", controllers_1.login);
userrouter.post("/register", controllers_1.register);
userrouter.get("/allusers", middlewares_1.authenticateLogin, controllers_1.allUsers);
exports.default = userrouter;

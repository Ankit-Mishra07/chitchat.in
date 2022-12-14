"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
router.post("/login", controllers_1.login);
router.post("/register", controllers_1.register);
router.get("/allusers", middlewares_1.authenticateLogin, controllers_1.allUsers);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../controllers");
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
router.post("/", middlewares_1.authenticateLogin, controllers_1.sendMessage);
router.get("/:chatId", middlewares_1.authenticateLogin, controllers_1.allMessages);
exports.default = router;

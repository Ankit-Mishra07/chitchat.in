"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
router.route("/").post(middlewares_1.authenticateLogin, controllers_1.accessChat);
router.route("/").get(middlewares_1.authenticateLogin, controllers_1.fetchChats);
router.route("/group").post(middlewares_1.authenticateLogin, controllers_1.createGroupChat);
router.route("/rename").put(middlewares_1.authenticateLogin, controllers_1.renameGroup);
router.route("/groupremove").put(middlewares_1.authenticateLogin, controllers_1.removeFromGroup);
router.route("/groupadd").put(middlewares_1.authenticateLogin, controllers_1.addToGroup);
exports.default = router;

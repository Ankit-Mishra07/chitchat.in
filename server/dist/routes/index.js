"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRoutes = exports.chatRoutes = exports.userRoutes = void 0;
var user_route_1 = require("./user.route");
Object.defineProperty(exports, "userRoutes", { enumerable: true, get: function () { return __importDefault(user_route_1).default; } });
var chat_route_1 = require("./chat.route");
Object.defineProperty(exports, "chatRoutes", { enumerable: true, get: function () { return __importDefault(chat_route_1).default; } });
var message_route_1 = require("./message.route");
Object.defineProperty(exports, "messageRoutes", { enumerable: true, get: function () { return __importDefault(message_route_1).default; } });

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chats = exports.Messages = exports.Users = void 0;
var user_model_1 = require("./user.model");
Object.defineProperty(exports, "Users", { enumerable: true, get: function () { return __importDefault(user_model_1).default; } });
var message_model_1 = require("./message.model");
Object.defineProperty(exports, "Messages", { enumerable: true, get: function () { return __importDefault(message_model_1).default; } });
var chat_model_1 = require("./chat.model");
Object.defineProperty(exports, "Chats", { enumerable: true, get: function () { return __importDefault(chat_model_1).default; } });

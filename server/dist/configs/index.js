"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connect = void 0;
var db_1 = require("./db");
Object.defineProperty(exports, "Connect", { enumerable: true, get: function () { return __importDefault(db_1).default; } });

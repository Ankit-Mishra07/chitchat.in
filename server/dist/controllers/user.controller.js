"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.allUsers = exports.register = exports.login = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const models_1 = require("../models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newToken = (user) => {
    return jsonwebtoken_1.default.sign({ user }, `${process.env.JWT_ACCESS_KEY}`);
};
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, username } = req.body;
        // check if the email address provided already exist 
        let user = yield models_1.Users.findOne({ email }).select("-password");
        // if it does not exist then throw an error 
        if (!user)
            return res.status(404).json({ message: "Please provide correct credentials" });
        // else we match the password
        const match = yield user.checkpassword(password);
        // if not match then throw an error
        if (!match)
            return res.status(400).json({ message: "Please provide correct credentials" });
        // if it matches then create the token 
        const token = newToken(user);
        // store token in session
        res.status(201).json({ user, token });
    }
    catch (error) {
        console.log(error);
        return res.send({ message: "Internal Server Error" });
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // TODO: User image hosted on imgur 
        const { username, email, password } = req.body;
        const user = yield models_1.Users.findOne({ username });
        if (user) {
            return res.status(404).send({ message: 'User already exist with this Username/Email' });
        }
        console.log(username, email, password);
        try {
            yield models_1.Users.create({
                username,
                email,
                password
            });
        }
        catch (error) {
            console.log(error);
            return res.send({ message: "Some went wrong" });
        }
        return res.status(200).send({ message: "Successfully Registered" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
});
exports.register = register;
const allUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const keyword = req.query.search
        ? {
            $or: [
                { username: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ],
        }
        : {};
    const users = yield models_1.Users.find(keyword).find({ _id: { $ne: req.body.user._id } });
    res.send(users);
});
exports.allUsers = allUsers;

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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, `${process.env.JWT_ACCESS_KEY}`);
};
const authenticateLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // if we received the bearer token in the header
    const bearerToken = req.headers.authorization;
    // if not received or token is not a bearer token then we will throw an error 
    if (!bearerToken || !bearerToken.startsWith("Bearer "))
        return res.status(400).json({ status: "failed", message: "Please provide a valid token" });
    // else we will try to get the user from the token 
    const token = bearerToken.split(" ")[1];
    let user;
    try {
        user = verifyToken(token);
    }
    catch (e) {
        return res.status(500).json({ message: "Please provide a valid token" });
    }
    // if no user found then we will throw an error
    if (!user)
        return res.status(400).json({ message: "Please provide a valid token" });
    // else we will attach the user to the request body
    req.body.user = user;
    // return next
    return next();
});
exports.default = authenticateLogin;

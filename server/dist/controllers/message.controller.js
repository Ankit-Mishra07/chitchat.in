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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.allMessages = void 0;
const models_1 = require("../models");
const allMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messages = yield models_1.Messages.find({ chat: req.params.chatId })
            .populate("sender", "username profile_avatar_url email")
            .populate("chat");
        res.json(messages);
    }
    catch (error) {
        console.log(error.message);
        return res.status(400).send({ message: "Internal Server error" });
    }
});
exports.allMessages = allMessages;
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, chatId } = req.body;
    if (!content || !chatId) {
        console.log("Invalid data passed into request");
        return res.status(400);
    }
    var newMessage = {
        sender: req.body.user.user._id,
        content: content,
        chat: chatId,
    };
    try {
        var message = yield models_1.Messages.create(newMessage);
        message = yield message.populate("sender", "username profile_avatar_url");
        message = yield message.populate("chat");
        const data = yield models_1.Users.populate(message, {
            path: "chat.users",
            select: "username profile_avatar_url email",
        });
        yield models_1.Chats.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
        return res.status(200).json(message);
    }
    catch (error) {
        console.log(error.message);
        return res.status(400).send({ message: "Internal Server error" });
    }
});
exports.sendMessage = sendMessage;

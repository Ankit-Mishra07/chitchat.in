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
exports.removeFromGroup = exports.addToGroup = exports.renameGroup = exports.createGroupChat = exports.fetchChats = exports.accessChat = void 0;
const models_1 = require("../models");
const accessChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    if (!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }
    var isChat = yield models_1.Chats.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.body.user.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ],
    })
        .populate("users", "-password")
        .populate("latestMessage");
    const chats = yield models_1.Users.populate(isChat, {
        path: "latestMessage.sender",
        select: "username profile_avatar_url email",
    });
    if (chats.length > 0) {
        res.send(chats[0]);
    }
    else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.body.user.user._id, userId],
        };
        try {
            const createdChat = yield models_1.Chats.create(chatData);
            const FullChat = yield models_1.Chats.findOne({ _id: createdChat._id }).populate("users", "-password");
            res.status(200).json(FullChat);
        }
        catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
});
exports.accessChat = accessChat;
const fetchChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        models_1.Chats.find({ users: { $elemMatch: { $eq: req.body.user.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then((results) => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield models_1.Users.populate(results, {
                path: "latestMessage.sender",
                select: "username profile_avatar_url email",
            });
            res.status(200).send(data);
        }));
    }
    catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});
exports.fetchChats = fetchChats;
//@description     Create New Group Chat
//@route           POST /api/chat/group
//@access          Protected
const createGroupChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "Please Fill all the feilds" });
    }
    var users = JSON.parse(req.body.users);
    if (users.length < 2) {
        return res
            .status(400)
            .send("More than 2 users are required to form a group chat");
    }
    users.push(req.body.user.user._id);
    try {
        const groupChat = yield models_1.Chats.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.body.user.user._id,
        });
        const fullGroupChat = yield models_1.Chats.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");
        res.status(200).json(fullGroupChat);
    }
    catch (error) {
        console.log(error.message);
        res.status(400).send({ message: "Internal Server Error" });
    }
});
exports.createGroupChat = createGroupChat;
const renameGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId, chatName } = req.body;
    const updatedChat = yield models_1.Chats.findByIdAndUpdate(chatId, {
        chatName: chatName,
    }, {
        new: true,
    })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    if (!updatedChat) {
        res.status(404);
        throw new Error("Chat Not Found");
    }
    else {
        res.json(updatedChat);
    }
});
exports.renameGroup = renameGroup;
const removeFromGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId, userId } = req.body;
    // check if the requester is admin
    const removed = yield models_1.Chats.findByIdAndUpdate(chatId, {
        $pull: { users: userId },
    }, {
        new: true,
    })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    if (!removed) {
        res.status(404);
        throw new Error("Chat Not Found");
    }
    else {
        res.json(removed);
    }
});
exports.removeFromGroup = removeFromGroup;
const addToGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId, userId } = req.body;
    // check if the requester is admin
    const added = yield models_1.Chats.findByIdAndUpdate(chatId, {
        $push: { users: userId },
    }, {
        new: true,
    })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    if (!added) {
        res.status(404);
        throw new Error("Chat Not Found");
    }
    else {
        res.json(added);
    }
});
exports.addToGroup = addToGroup;

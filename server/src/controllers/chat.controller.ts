
import { Chats,Users } from "../models";
import { Request,Response } from "express";

const accessChat = async (req:Request, res:Response) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chats.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.body.user.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  const chats = await Users.populate(isChat,{
    path: "latestMessage.sender",
    select: "username profile_avatar_url email",
  })

  if (chats.length > 0) {
    res.send(chats[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.body.user.user._id, userId],
    };

    try {
      const createdChat = await Chats.create(chatData);
      const FullChat = await Chats.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error:any) {
      res.status(400);
      throw new Error(error.message);
    }
  }
}

const fetchChats = async (req:Request, res:Response) => {
  try {
     Chats.find({ users: { $elemMatch: { $eq: req.body.user.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        const data = await Users.populate(results, {
          path: "latestMessage.sender",
          select: "username profile_avatar_url email",
        });
        res.status(200).send(data);
      });
  } catch (error:any) {
    res.status(400);
    throw new Error(error.message);
  }
}

//@description     Create New Group Chat
//@route           POST /api/chat/group
//@access          Protected
const createGroupChat = async (req:Request, res:Response) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }

  var users = req.body.users;

  if (users.length < 2) {
    return res
      .status(400)
      .send({message:"More than 2 users are required to form a group chat"});
  }

  users.push(req.body.user.user._id);

  try {
    const groupChat = await Chats.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.body.user.user._id,
    });

    const fullGroupChat = await Chats.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error:any) {
    console.log(error.message)
    res.status(400).send({message:"Internal Server Error"});
  }
}

const renameGroup = async (req:Request, res:Response) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chats.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    return res.status(404).send({message:"Something went wrong try again"});
  } else {
    return res.json(updatedChat);
  }
}

const removeFromGroup = async (req:Request, res:Response) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const removed = await Chats.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
}

const addToGroup = async (req:Request, res:Response) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const added = await Chats.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
}

export {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
}
import {Chats,Users,Messages} from "../models";
import { Request,Response } from "express";

const allMessages = async (req:Request, res:Response) => {
  try {
    const messages = await Messages.find({ chat: req.params.chatId })
      .populate("sender", "username profile_avatar_url email")
      .populate("chat");
    res.json(messages);
  } catch (error:any) {
    console.log(error.message);
    return res.status(400).send({message:"Internal Server error"});
  }
}

const sendMessage = async (req:Request, res:Response) => {
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
    var message = await Messages.create(newMessage);

    message = await message.populate("sender", "username profile_avatar_url");
    message = await message.populate("chat");
    const data = await Users.populate(message, {
      path: "chat.users",
      select: "username profile_avatar_url email",
    });

    await Chats.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    return res.status(200).json(message);
  } catch (error:any) {
    console.log(error.message);
    return res.status(400).send({message:"Internal Server error"});
  }
}

export { allMessages, sendMessage }
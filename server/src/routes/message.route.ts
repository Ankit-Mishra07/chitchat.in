import {
    allMessages,sendMessage
} from "../controllers"

import express from "express";
import { authenticateLogin } from "../middlewares";

const router = express.Router();

router.post("/",authenticateLogin, sendMessage);
router.get("/:chatId",authenticateLogin, allMessages);

export default router;
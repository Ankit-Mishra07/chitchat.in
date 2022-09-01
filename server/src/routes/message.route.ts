import {
    allMessages,sendMessage
} from "../controllers"

import express, { Router } from "express";
import { authenticateLogin } from "../middlewares";

const router = express.Router();

router.route("/:chatId").get(authenticateLogin, allMessages);
router.route("/").post(authenticateLogin, sendMessage);

export default router;
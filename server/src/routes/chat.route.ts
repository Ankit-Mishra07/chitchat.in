import express from "express";
import {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} from "../controllers";
import { authenticateLogin } from "../middlewares";


const router = express.Router();

router.route("/").post(authenticateLogin, accessChat);
router.route("/").get(authenticateLogin, fetchChats);
router.route("/group").post(authenticateLogin, createGroupChat);
router.route("/rename").put(authenticateLogin, renameGroup);
router.route("/groupremove").put(authenticateLogin, removeFromGroup);
router.route("/groupadd").put(authenticateLogin, addToGroup);

export default router;
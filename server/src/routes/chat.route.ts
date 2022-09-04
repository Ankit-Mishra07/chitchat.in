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

router.post("/",authenticateLogin, accessChat);
router.get("/",authenticateLogin, fetchChats);
router.post("/group",authenticateLogin, createGroupChat);
router.put("/rename",authenticateLogin, renameGroup);
router.put("/groupremove",authenticateLogin, removeFromGroup);
router.put("/groupadd",authenticateLogin, addToGroup);

export default router;
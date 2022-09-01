import express from "express";
import { login, register,allUsers } from "../controllers";
import { authenticateLogin } from "../middlewares";

const router = express.Router();

router.post("/login",login);
router.post("/register",register);
router.get("/allusers",authenticateLogin,allUsers)

export default router;
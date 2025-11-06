import express from "express";
import { login, register } from "../controllers/loginController.ts";

const loginRoute = express.Router();

loginRoute.post("/register", register);
loginRoute.post("/login", login);

export default loginRoute;
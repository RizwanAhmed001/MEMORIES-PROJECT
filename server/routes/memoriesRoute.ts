import express from "express";
import { createMemory, deleteMemory, getMemories, getMemoryById, updateMemory } from "../controllers/memoriesController.ts";
import { auth } from "../middleware/auth.ts";

const memoryRoute = express.Router();

memoryRoute.get("/getMemory",auth, getMemories);
memoryRoute.get("/singleMemory/:id",auth, getMemoryById);
memoryRoute.post("/addMemory", createMemory);
memoryRoute.put("/updateMemory/:id",auth, updateMemory);
memoryRoute.delete("/deleteMemory/:id",auth ,deleteMemory);

export default memoryRoute;
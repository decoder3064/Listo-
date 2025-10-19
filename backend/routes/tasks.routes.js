import express from "express";
import { createTask, deleteTask, getTasks, updateTask } from "../controllers/task.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// GET /tasks - get all user's tasks
router.get("/", protect, getTasks);

// POST /tasks - create new task
router.post("/", protect, createTask);

// PUT /tasks/:id - update task
router.put("/:id", protect, updateTask);

// DELETE /tasks/:id - delete task
router.delete("/:id", protect, deleteTask);

export default router;
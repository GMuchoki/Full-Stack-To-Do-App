import express from "express";
import { addTodo, deleteTodo, getAllTodos, patchTodo, updateTodo } from "../controllers/todoController.js";

const router = express.Router();

router.get('/', getAllTodos);

router.post('/', addTodo);

router.put('/:id', updateTodo);

router.patch('/:id', patchTodo);

router.delete('/:id', deleteTodo);

export default router;
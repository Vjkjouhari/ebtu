const express = require("express");
const { addTodo, editTodo, getTodo } = require("../controllers/todoController");
const validateTodo = require("../validation/todo");

const router = express.Router();

router.post("/add-todo", validateTodo, addTodo);
router.post("/edit-todo", editTodo);
router.get("/get-todo", getTodo);
router.get("/get-all-todos", getAllTodos);

module.exports = router;

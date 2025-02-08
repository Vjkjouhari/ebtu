const express = require("express");
const { addTodo } = require("../controllers/todoController");
const validateTodo = require("../validation/todo");

const router = express.Router();

router.post("/add-todo", validateTodo, addTodo);

module.exports = router;

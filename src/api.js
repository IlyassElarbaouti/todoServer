const express = require("express");
const serverless = require('serverless-http')
const app = express();
const bodyParser = require("body-parser");

let todos = [
  { label: "test2", id: 0, checked: true },
  { label: "test3", id: 1, checked: false },
];
let nextId =
  todos.length !== 0 ? Math.max(...todos.map((todos) => todos.id)) + 1 : 0;
const router = express.Router()

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use('/.netlify/functions/api',router)

//get all todos
router.get("/", (req, res) => res.status(200).json(todos));

//get todo by index
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todoRes = todos.find((todo) => todo.id == id);
  if (todoRes) {
    res.status(200).json(todoRes);
  } else {
    res.status(404, "The task is not found").send();
  }
});

// add new todo
router.post("/", (req, res) => {
  var newTodo = req.body;
  newTodo.id = nextId;
  nextId = newTodo.id+1;
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// edit existant todo
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const targetedIndex = todos.findIndex((todo) => todo.id === id);
  if (targetedIndex !== -1) {
    todos[targetedIndex] = req.body;
    res.status(204).send();
  } else {
    res.status(404, "The task is not found").send();
  }
});

//delete todo
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const targetedIndex = todos.findIndex((todo) => todo.id === id);
  if (todos.some((todo) => todo.id == id)) {
    todos.splice(targetedIndex,1);
    res.status(200).send();
  } else {
    res.status(404, "The task is not found").send();
  }
});

module.exports.handler = serverless(app)

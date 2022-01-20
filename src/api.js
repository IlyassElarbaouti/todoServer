const express = require("express");
const bodyParser = require("body-parser");
const port = 9000;
const app = express();
let todos = [
  { label: "test0", id: 0, checked: true },
  { label: "test1", id: 1, checked: false },
  { label: "test2", id: 2, checked: false },
  { label: "test3", id: 3, checked: false },
  { label: "test4", id: 4, checked: true },
  { label: "test5", id: 5, checked: false },
];
let nextId =
  todos.length !== 0 ? Math.max(...todos.map((todos) => todos.id)) + 1 : 0;

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

//get all todos
app.get("/", (req, res) => res.status(200).json(todos));
//get todo by index
app.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todoRes = todos.find((todo) => todo.id == id);
  if (todoRes) {
    res.status(200).json(todoRes);
  } else {
    res.status(404, "The task is not found").send();
  }
});

// add new todo
app.post("/", (req, res) => {
  var newTodo = req.body;
  newTodo.id = nextId;
  nextId = newTodo.id + 1;
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// edit existant todo
app.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const targetedIndex = todos.findIndex((todo) => todo.id === id);
  if (targetedIndex !== -1) {
    todos[targetedIndex] = req.body;
    res.status(204).send(todos[targetedIndex]);
  } else {
    res.status(404, "The task is not found").send();
  }
});
//delete todo
app.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const targetedIndex = todos.findIndex((todo) => todo.id === id);
  if (todos.some((todo) => todo.id == id)) {
    todos.splice(targetedIndex, 1);
    res.status(200).send();
  } else {
    res.status(404, "The task is not found").send();
  }
});
app.listen(port);

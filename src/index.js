const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const todoController = require("./controller/todo-controller");

const port = 9000;
const app = express();

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

//get all todos
app.get("/", todoController.getAllTodos());

//get todo by index
app.get("/:id", todoController.getTodoById());

// add new todo
app.post("/", todoController.addNewTodo());

// edit existant todo
app.put("/:id", todoController.editTodo());

//delete todo
app.delete("/:id", todoController.deleteTodo());

//delete all done
app.delete("/", todoController.deleteAllDone());

//toggle all checked
app.put("/", todoController.toggleAllChecked());

app.listen(port);

module.exports = app;

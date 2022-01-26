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
app.get("/",todoController.getAllTodos.bind(todoController));

//get todo by index
app.get("/:id", todoController.getTodoById.bind(todoController));

// add new todo
app.post("/", todoController.addNewTodo.bind(todoController));

// edit existant todo
app.put("/:id", todoController.editTodo.bind(todoController));

//delete todo
app.delete("/:id", todoController.deleteTodo.bind(todoController));

//delete all done
app.delete("/", todoController.deleteAllDone.bind(todoController));

//toggle all checked
app.put("/", todoController.toggleAllChecked.bind(todoController));

app.listen(port);

module.exports = app;

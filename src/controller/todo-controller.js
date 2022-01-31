const todoService = require("../service/todo-service");
class TodoController {
  constructor() {
    this.todoService = todoService;
  }

  // get all todos
  getAllTodos(req, res) {
    const allTodos = this.todoService.getAllTodos();
    try {
      res.status(200).json(allTodos);
    } catch (e) {
      res.status(500).send();
    }
  }

  // get todo by id
  getTodoById(req, res) {
    const id = parseInt(req.params.id);
    const todoRes = this.todoService.getTodoById(id);
    if (typeof id !== "number") {
      res.status(400).send();
    }
    try {
      res.status(200).json(todoRes);
    } catch (e) {
      res.status(500).send();
    }
  }

  // add new todo
  addNewTodo(req, res) {
    const newTodo = req.body;
    const newTodoKeys = Object.keys(req.body);
    if (
      typeof newTodo.checked !== "boolean" ||
      typeof newTodo.label !== "string"
    ) {
      res.status(400).send();
    }
    try {
      res.status(201).json(this.todoService.addNewTodo(newTodo));
    } catch (e) {
      res.status(400).send();
    }
  }
  else;

  // edit existant todo
  editTodo(req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).send();
    }
    try {
      this.todoService.editTodo(id);
      res.status(204).send();
    } catch (e) {
      res.status(404).send();
    }
  }

  // delete todo
  deleteTodo(req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).send();
    }
    try {
      this.todoService.deleteTodo(id);
      res.status(200).send();
    } catch{
      res.status(500).send();
    }
  }

  //delete all done
  deleteAllDone(req, res) {
    try {
      this.todoService.deleteAllDone();
      res.status(200).send();
    } catch{
      res.status(500).send();
    }
  }

  //toggle all checked
  toggleAllChecked(req, res) {
    try {
      this.todoService.toggleAllChecked();
      res.status(200).send();
    } catch{
      res.status(500).send();
    }
  }
}
module.exports = new TodoController();

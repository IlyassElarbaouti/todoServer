const todoService = require("../services/todos-service");
class TodosController {
  constructor() {
    this.todoService = todoService;
  }

  // get all todos
  getAllTodos(req, res) {
    try {
      const allTodos = this.todoService.getAllTodos();
      res.status(200).json(allTodos);
    } catch (e) {
      res.status(500).send();
    }
  }

  // get todo by id
  getTodoById(req, res) {
    const id = parseInt(req.params.id);
    if (typeof id !== "number") {
      res.status(400).send();
    }
    try {
      const todoRes = this.todoService.getTodoById(id);
      res.status(200).json(todoRes);
    } catch (e) {
      res.status(500).send();
    }
  }

  // add new todo
  createTodo(req, res) {
    const newTodo = req.body;
    if (
      typeof newTodo.checked !== "boolean" ||
      typeof newTodo.label !== "string"
    ) {
      res.status(400).send();
    }
    try {
      this.todoService.createTodo(newTodo);
      res.status(201).json();
    } catch (e) {
      res.status(500).send();
    }
  }

  // edit existant todo
  editTodo(req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).send();
    }
    try {
      this.todoService.editTodo(id);
      res.status(200).send();
    } catch (e) {
      res.status(500).send();
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
    } catch {
      res.status(500).send();
    }
  }

  //delete all done
  deleteAllDone(req, res) {
    try {
      this.todoService.deleteAllDone();
      res.status(200).send();
    } catch {
      res.status(500).send();
    }
  }

  //toggle all checked
  toggleAllChecked(req, res) {
    try {
      this.todoService.toggleAllChecked();
      res.status(200).send();
    } catch {
      res.status(500).send();
    }
  }
}
module.exports = new TodosController();

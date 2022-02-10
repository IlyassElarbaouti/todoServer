const todoService = require("../services/todos-service");
const ApiError = require("../exceptions/api-error");
class TodosController {
  constructor() {
    this.todoService = todoService;
    this.getAllTodos = this.getAllTodos.bind(this);
    this.getTodoById = this.getTodoById.bind(this);
    this.createTodo = this.createTodo.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.deleteAllDone = this.deleteAllDone.bind(this);
    this.toggleAllChecked = this.toggleAllChecked.bind(this);
    this.editLabel = this.editLabel.bind(this);
  }

  getAllTodos(req, res, next) {
    try {
      const allTodos = this.todoService.getAllTodos();
      res.status(200).json(allTodos);
    } catch (e) {
      next(500);
    }
  }

  getTodoById(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      if (typeof id !== "number") {
        throw ApiError.badRequest("id should be a number");
      }
      const todoRes = this.todoService.getTodoById(id);
      res.status(200).json(todoRes);
    } catch (e) {
      next(500);
    }
  }

  createTodo(req, res, next) {
    try {
      const newTodo = req.body;

      if (
        typeof newTodo.checked !== "boolean" ||
        typeof newTodo.label !== "string"
      ) {
        throw ApiError.badRequest("check data types", errors.array());
      }

      this.todoService.createTodo(newTodo);
      res.status(201).json();
    } catch {
      next(500);
    }
  }

  editLabel(req, res, next) {
    try {
      const label = req.body.label;
      const id = parseInt(req.params.id);

      if (typeof label !== "string" || isNaN(id)) {
        throw ApiError.badRequest("check data types");
      }

      this.todoService.editLabel(id, label);
      res.status(201).send();
    } catch (e) {
      next(e);
    }
  }

  toggleTodo(req, res, next) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        throw ApiError.badRequest("id should be a number", errors.array());
      }

      this.todoService.toggleTodo(id);
      res.status(200).send();
    } catch {
      next(500);
    }
  }

  deleteTodo(req, res, next) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        throw ApiError.badRequest("id should be a number", errors.array());
      }
      
      this.todoService.deleteTodo(id);
      res.status(200).send();
    } catch {
      next(500);
    }
  }

  deleteAllDone(req, res, next) {
    try {
      this.todoService.deleteAllDone();
      res.status(200).send();
    } catch {
      next(500);
    }
  }

  toggleAllChecked(req, res, next) {
    try {
      this.todoService.toggleAllChecked();
      res.status(200).send();
    } catch {
      next(500);
    }
  }
}
module.exports = new TodosController();

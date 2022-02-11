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
      if (!allTodos) {
        throw ApiError.dataNotFound("todos not found");
      }
      res.status(200).json(allTodos);
    } catch (e) {
      next(e);
    }
  }

  getTodoById(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      if (typeof id !== "number") {
        throw ApiError.badRequest("id should be a number");
      }
      const todoRes = this.todoService.getTodoById(id);
      if (!todoRes) {
        throw ApiError.dataNotFound("todo not found");
      }
      res.status(200).json(todoRes);
    } catch (e) {
      next(e);
    }
  }

  createTodo(req, res, next) {
    try {
      const newTodo = req.body;

      if (
        typeof newTodo.checked !== "boolean" ||
        typeof newTodo.label !== "string"
      ) {
        throw ApiError.badRequest("check data types");
      }

      this.todoService.createTodo(newTodo);
      res.status(201).json();
    } catch (e) {
      next(e);
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
        throw ApiError.badRequest("id should be a number");
      }

      this.todoService.toggleTodo(id);
       const allTodos = this.todoService.getAllTodos();
      res.status(200).send(allTodos);
    } catch (e) {
      next(e);
    }
  }

  deleteTodo(req, res, next) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        throw ApiError.badRequest("id should be a number");
      }

      const allTodos = this.todoService.getAllTodos();
      this.todoService.deleteTodo(id);
      res.status(200).send(allTodos);
    } catch (e) {
      next(e);
    }
  }

  deleteAllDone(req, res, next) {
    try {
      this.todoService.deleteAllDone();
      const allTodos = this.todoService.getAllTodos();
      res.status(200).send(allTodos);
    } catch (e) {
      next(e);
    }
  }

  toggleAllChecked(req, res, next) {
    try {
      this.todoService.toggleAllChecked();
      const allTodos = this.todoService.getAllTodos();
      res.status(200).send(allTodos);
    } catch (e) {
      next(e);
    }
  }
}
module.exports = new TodosController();

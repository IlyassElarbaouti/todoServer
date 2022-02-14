const todoService = require("../services/todos-service");
const ApiError = require("../exceptions/api-error");

class TodosController {
  getAllTodos(req, res, next) {
    try {
      const allTodos = todoService.getAllTodos();
      res.status(200).json(allTodos);
    } catch (e) {
      next(e);
    }
  }

  getTodoById(req, res, next) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        throw ApiError.badRequest("id should be a number");
      }

      const todo = todoService.getTodoById(id);

      if (!todo) {
        throw ApiError.dataNotFound("todo not found");
      }

      res.status(200).json(todo);
    } catch (e) {
      next(e);
    }
  }

  createTodo(req, res, next) {
    try {
      if (
        typeof req.body.checked !== "boolean" ||
        typeof req.body.label !== "string"
      ) {
        throw ApiError.badRequest("check data types");
      }

      const newTodo = { checked: req.body.checked, label: req.body.label };

      const todo = todoService.createTodo(newTodo);
      res.status(201).json(todo);
    } catch (e) {
      next(e);
    }
  }

  updateTodo(req, res, next) {
    try {
      if (
        typeof req.body.id === "number" &&
        typeof req.body.label === "string" &&
        typeof req.body.checked === "boolean"
      ) {
        const newTodo = todoService.updateTodo(req.body);
        res.status(201).send(newTodo);
      } else {
        throw ApiError.badRequest("check data passed");
      }
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

      todoService.deleteTodo(id);
      res.status(200).send();
    } catch (e) {
      next(e);
    }
  }

  deleteAllDone(req, res, next) {
    try {
      todoService.deleteAllDone();
      res.status(200).send();
    } catch (e) {
      next(e);
    }
  }

  toggleAllChecked(req, res, next) {
    try {
      todoService.toggleAllChecked();
      res.status(200).send();
    } catch (e) {
      next(e);
    }
  }
}
module.exports = new TodosController();

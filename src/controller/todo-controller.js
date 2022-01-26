const todoService = require("../service/todo-service");
class TodoController {
  constructor() {
    this.todoService = todoService;
  }

  // get all todos
  getAllTodos(req, res) {
    try {
      res.status(200).json(this.todoService.getAllTodos());
    } catch (e) {
      res.status(404, e.message).send();
    }
  }

  // get todo by id
  getTodoById(req, res) {
    const id = parseInt(req.params.id);
    const todoRes = this.todoService.getTodoById(id);
    if (typeof id === "number" && todoRes) {
      try {
        res.status(200).json(todoRes);
      } catch (e) {
        res.status(404, e.message).send();
      }
    } else {
      res.status(400, "bad request").send();
    }
  }

  // add new todo
  addNewTodo(req, res) {
    const newTodo = req.body;
    const newTodoKeys = Object.keys(req.body);
    if (
      newTodoKeys.length === 2 &&
      typeof newTodo.checked === "boolean" &&
      newTodo.label
    ) {
      try {
        res.status(201).json(this.todoService.addNewTodo(newTodo));
      } catch (e) {
        res.status(400, e.message).send();
      }
    } else {
      res.status(400, "wrong body passed").send();
    }
  }

  // edit existant todo
  editTodo(req, res) {
    const id = parseInt(req.params.id);
    const todoToEdit = req.body;
    const newTodoKeys = Object.keys(req.body);
    if (
      newTodoKeys.length === 2 &&
      typeof newTodo.checked === "boolean" &&
      newTodo.label &&
      typeof id === "number" &&
      this.todoService.getTodoById(id)
    ) {
      try {
        const newTodo = this.todoService.editTodo(todoToEdit, id);
        res.status(204).send(newTodo);
      } catch (e) {
        res.status(404, e.message).send();
      }
    } else {
      res.status(400, "bad request").send();
    }
  }

  // delete todo
  deleteTodo(req, res) {
    const id = parseInt(req.params.id);
    if (typeof id === "number" && this.todoService.getTodoById(id)) {
      try {
        this.todoService.deleteTodo(id);
        res.status(200).send();
      } catch (e) {
        res.status(404, e.message).send();
      }
    } else {
      res.status(404, "todo not found").send();
    }
  }

  //delete all done
  deleteAllDone(req, res) {
    try {
      this.todoService.deleteAllDone();
      res.status(200).send();
    } catch (e) {
      res.status(404, e.message).send();
    }
  }

  //toggle all checked
  toggleAllChecked(req, res) {
    try {
      this.todoService.toggleAllChecked();
      res.status(200).send();
    } catch (e) {
      res.status(404, e.message).send();
    }
  }
}
module.exports = new TodoController();

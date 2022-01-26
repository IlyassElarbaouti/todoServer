const todoService = require("../service/todo-service");
class TodoController {
  constructor() {
    this.todoService = todoService;
  }

  // get all todos
  getAllTodos(req, res) {
    this.todoService.getAllTodos(res);
  }

  // get todo by id
  getTodoById(req, res) {
    const id = parseInt(req.params.id);
    this.todoService.getTodoById(id, res);
  }

  // add new todo
  addNewTodo(req, res) {
    const newTodo = req.body;
    this.todoService.addNewTodo(newTodo, res);
  }

  // edit existant todo
  editTodo(req, res) {
    const id = parseInt(req.params.id);
    const todoToEdit = req.body;
    this.todoService.editTodo(todoToEdit, id, res);
  }

  // delete todo
  deleteTodo(req, res) {
    const id = parseInt(req.params.id);
    this.todoService.deleteTodo(id, res);
  }

  //delete all done
  deleteAllDone(req, res) {
    this.todoService.deleteAllTodos(res);
  }

  //toggle all checked
  toggleAllChecked(req, res) {
    this.todoService.toggleAllChecked(res);
  }
}
module.exports = new TodoController();

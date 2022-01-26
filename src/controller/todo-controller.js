const todoRepository = require("../repository/todo-repository");
const todoService = require("../service/todo-service");
class TodoController {
  constructor() {
    this.todoRepository = todoRepository;
    this.todoService = todoService;
    this.getAllTodos = this.getAllTodos.bind(this);
    this.getTodoById = this.getTodoById.bind(this);
    this.addNewTodo = this.addNewTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.deleteAllTodos = this.deleteAllTodos.bind(this);
    this.toggleAllChecked = this.toggleAllChecked.bind(this);
  }

  // get all todos
  getAllTodos(req, res) {
   this.todoService.getAllTodos(res)
  }

  // get todo by id
  getTodoById(req, res) {
    const id = parseInt(req.params.id);
    const todoRes = this.todoRepository.getTodoById(id);
    this.todoService.getTodoById(todoRes,res)
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
    this.todoService.deleteTodo(id,res)
  }

  //delete all done
  deleteAllDone(req, res) {
    this.todoService.deleteAllTodos(res)
  }

  //toggle all checked
  toggleAllChecked(req, res) {
    this.todoService.toggleAllChecked(res)
  }
}
module.exports = new TodoController();

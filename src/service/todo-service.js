const todoRepository = require("../repository/todo-repository.js");

class TodoService {
  constructor() {
    this.todoRepository = todoRepository;
  }

  getAllTodos() {
    return this.todoRepository.getAllTodos();
  }

  getTodoById(id) {
    return this.todoRepository.getTodoById(id);
  }

  createTodo(newTodo) {
    return this.todoRepository.createTodo(newTodo);
  }

  editTodo(id) {
    return this.todoRepository.editTodo(id);
  }

  deleteTodo(id) {
    return this.todoRepository.deleteTodo(id);
  }

  deleteAllDone() {
    return this.todoRepository.deleteAllDone();
  }
  toggleAllChecked() {
    return this.todoRepository.toggleAllChecked();
  }
}

module.exports = new TodoService();

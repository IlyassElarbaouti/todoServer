const  todoRepository  = require("../repository/todo-repository.js");

class TodoService {
  constructor() {
    this.todoRepository = todoRepository;
    this.getAllTodos = this.getAllTodos.bind(this);
  }

  getAllTodos() {
    return this.todoRepository.getAllTodos()

  }

  getTodoById(id) {
    return this.todoRepository.getTodoById(id);
  }

  addNewTodo(newTodo) {
    return this.todoRepository.createTodo(newTodo);
  }

  editTodo(todoToEdit, id) {
    return this.todoRepository.editTodo(todoToEdit, id)
  }

  deleteTodo(id) {
    return this.todoRepository.deleteTodo(id)
  }

  deleteAllDone() {
    return this.todoRepository.deleteAllDone();
  }
  toggleAllChecked() {
    return this.todoRepository.toggleAllChecked();
  }
}

module.exports = new TodoService();

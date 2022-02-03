const todosRepository = require("../repositories/todos-repository.js");

class TodosService {
  constructor() {
    this.todosRepository = todosRepository;
  }

  getAllTodos() {
    return this.todosRepository.getAllTodos();
  }

  getTodoById(id) {
    return this.todosRepository.getTodoById(id);
  }

  createTodo(newTodo) {
    return this.todosRepository.createTodo(newTodo);
  }

  editTodo(id) {
    return this.todosRepository.editTodo(id);
  }

  deleteTodo(id) {
    return this.todosRepository.deleteTodo(id);
  }

  deleteAllDone() {
    return this.todosRepository.deleteAllDone();
  }
  toggleAllChecked() {
    return this.todosRepository.toggleAllChecked();
  }
}

module.exports = new TodosService();

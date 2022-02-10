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

  editLabel(id, label) {
    return this.todosRepository.editLabel(id, label);
  }

  toggleTodo(id) {
    return this.todosRepository.toggleTodo(id);
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

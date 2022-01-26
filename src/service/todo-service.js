const  todoRepository  = require("../controller/todo-controller.js");

class TodoService {
  constructor() {
    this.todoRepository = todoRepository;
  }

  getAllTodos(res) {
    try {;
    res.status(200).json(this.todoRepository.getAllTodos.bind(this));
    } catch (e) {
      res.status(404, e.message).send();
    }
  }

  getTodoById(id, res) {
    const todoRes = this.todoRepository.getTodoById(id);
    if (todoRes) {
      try {
        res.status(200).json(todoRes);
      } catch (e) {
        res.status(404, e.message).send();
      }
    } else {
      res.status(404, "The task is not found").send();
    }
  }

  addNewTodo(newTodo, res) {
    try {
      this.todoRepository.createTodo(newTodo);
      res.status(201).json(newTodo);
    } catch (e) {
      res.status(404, e.message).send();
    }
  }

  editTodo(todoToEdit, id, res) {
    try {
      const newTodo = this.todoRepository.editTodo(todoToEdit, id);
      res.status(204).send(newTodo);
    } catch (e) {
      res.status(404, e.message).send();
    }
  }

  deleteTodo(id, res) {
    if (this.todoRepository.todos.some((todo) => todo.id == id)) {
      try {
        const targetedIndex = this.todoRepository.getTodoIndex(id);
        this.todoRepository.todos.splice(targetedIndex, 1);
        res.status(200).send();
      } catch (e) {
        res.status(404, e.message).send();
      }
    } else {
      res.status(404, e.message).send();
    }
  }

  deleteAllDone(res) {
    try {
      this.todoRepository.deleteAllDone();
      res.status(200).send();
    } catch (e) {
      res.status(404, e.message).send();
    }
  }
  toggleAllChecked(res) {
    try {
      this.todoRepository.toggleAllChecked();
      res.status(200).send(this.todoRepository.todos);
    } catch (e) {
      res.status(404, e.message).send();
    }
  }
}

module.exports = new TodoService();

const todoRepository = require("../repository/todo-repository");

class TodoController {
  constructor() {
    this.todoRepository = todoRepository;
  }

  // get all todos
  getAllTodos(req, res) {
    res.status(200).json(this.todoRepository.getAllTodos.bind(this.todoRepository));
  }

  // get todo by id
  getTodoById(req, res) {
    const id = parseInt(req.params.id);
    const todoRes = this.todoRepository.getTodoById();
    if (todoRes) {
      res.status(200).json(todoRes);
    } else {
      res.status(404, "The task is not found").send();
    }
  }

  // add new todo
  addNewTodo(req, res) {
    let newTodo = req.body;
    newTodo.id = this.todoRepository.nextId;
    this.todoRepository.increaseId.bind(this.todoRepository);
    this.todoRepository.addTodo(newTodo).bind(this.todoRepository);
    res.status(201).json(newTodo);
  }

  // edit existant todo
  editTodo(req, res) {
    const id = parseInt(req.params.id);
    const targetedIndex = this.todoRepository.getTodoIndex(id);
    if (targetedIndex !== -1) {
      this.todoRepository.todos[targetedIndex] = req.body;
      res.status(204).send(this.todoRepository.todos[targetedIndex]);
    } else {
      res.status(404, "The task is not found").send();
    }
  }

  // delete todo
  deleteTodo(req, res) {
    const id = parseInt(req.params.id);
    const targetedIndex = this.todoRepository.getTodoIndex(id);
    if (this.todoRepository.todos.some((todo) => todo.id == id)) {
      this.todoRepository.todos.splice(targetedIndex, 1);
      res.status(200).send();
    } else {
      res.status(404, "The task is not found").send();
    }
  }

  //delete all done
  deleteAllDone(req, res) {
    this.todoRepository.todos = this.todoRepository.todos.filter(
      (todo) => !todo.checked
    );
    res.status(200).send();
  }

  //toggle all checked
  toggleAllChecked(req, res) {
    this.todoRepository.todos.every((todo) => todo.checked)
      ? this.todoRepository.todos.forEach((todo) => (todo.checked = false))
      : this.todoRepository.todos.forEach((todo) => (todo.checked = true));
    res.status(200).send(this.todoRepository.todos);
  }
}
module.exports = new TodoController()

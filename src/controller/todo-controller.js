const todoRepository = require("../repository/todo-repository");

class TodoController {
  constructor() {
    this.todoRepository = todoRepository;

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
    try {
      res
        .status(200)
        .json(this.todoRepository.getAllTodos());
    } catch (e) {
      res.status(404, e.message).send();
    }
  }

  // get todo by id
  getTodoById(req, res) {
    const id = parseInt(req.params.id);
    const todoRes = this.todoRepository.getTodoById();
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

  // add new todo
  addNewTodo(req, res) {
    const newTodo = req.body;
    try {
      this.todoRepository.createTodo(newTodo);
      res.status(201).json(newTodo);
    } catch (e) {
      res.status(404, e.message).send();
    }
  }

  // edit existant todo
  editTodo(req, res) {
    const id = parseInt(req.params.id);
    const todoToEdit = req.body;
    try {
      const newTodo = this.todoRepository.editTodo(todoToEdit, id);
      res.status(204).send(newTodo);
    } catch (e) {
      res.status(404, e.message).send();
    }
  }

  // delete todo
  deleteTodo(req, res) {
    const id = parseInt(req.params.id);
    const targetedIndex = this.todoRepository.getTodoIndex(id);
    if (this.todoRepository.todos.some((todo) => todo.id == id)) {
      try {    
        this.todoRepository.todos.splice(targetedIndex, 1);
        res.status(200).send();
      }
      catch (e) {   
        res.status(404, e.message).send();
      }
    } else {
      res.status(404, e.message).send();
    }
  }

  //delete all done
  deleteAllDone(req, res) {
    try {
      this.todoRepository.deleteAllDone();
      res.status(200).send();
    } catch (e) {
      res.status(404, e.message).send();
    }
  }

  //toggle all checked
  toggleAllChecked(req, res) {
    try {
      this.todoRepository.toggleAllChecked();
      res.status(200).send(this.todoRepository.todos);
    } catch (e) {
      res.status(404, e.message).send();
    }
  }
}
module.exports = new TodoController();

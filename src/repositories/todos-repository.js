const ApiError = require("../exceptions/api-error");

class TodosRepository {
  constructor() {
    this.todos = [
      { label: "test0", id: 0, checked: true },
      { label: "test1", id: 1, checked: false },
      { label: "test2", id: 2, checked: true },
      { label: "test3", id: 3, checked: false },
      { label: "test4", id: 4, checked: false },
      { label: "test5", id: 5, checked: true },
    ];

    this.nextId =
      this.todos.length !== 0
        ? Math.max(...this.todos.map((todos) => todos.id)) + 1
        : 0;
  }

  getAllTodos() {
    return { todos:this.todos,nextId: this.nextId }
  }

  getTodoById(id) {
    const targetedTodo = this.todos.find((todo) => todo.id === id);
    if (targetedTodo) {
      return targetedTodo;
    } else {
      throw ApiError.dataNotFound("todo not found");
    }
  }

  createTodo(todo) {
    const newTodo = { ...todo, id: this.nextId++ };
    this.todos.push(newTodo);
    return newTodo;
  }

  updateTodo(newTodo) {
    const targetedTodo = this.todos.find((todo) => todo.id === newTodo.id);
    if (targetedTodo) {
      this.todos = this.todos.map((todo) =>
        todo.id === newTodo.id ? newTodo : todo
      );
      return this.todos.find((todo) => todo.id === newTodo.id);
    } else {
      throw ApiError.dataNotFound("todo not found");
    }
  }

  deleteTodo(id) {
    const targetedTodo = this.todos.find((todo) => todo.id === id);
    if (targetedTodo) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    } else {
      throw ApiError.dataNotFound("todo not found");
    }
  }

  deleteAllDone() {
    this.todos = this.todos.filter((todo) => !todo.checked);
  }

  toggleAllChecked() {
    const isAllChecked = this.todos.every((todo) => todo.checked);
   this.todos= this.todos.map((todo) => {
     todo.checked = !isAllChecked;
     return todo
   });
  }
}
const todosRepository = new TodosRepository();
module.exports = todosRepository;

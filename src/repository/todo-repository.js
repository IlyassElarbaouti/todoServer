class TodoRepository {
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
  //get all todos
  getAllTodos() {
    return this.todos;
  }

  // get todos by id
  getTodoById(id) {
    return this.todos.find((todo) => todo.id == id);
  }

  //get todo index
  getTodoIndex(id) {
    return this.todos.findIndex((todo) => todo.id === id);
  }

  // add todo
  createTodo(todo) {
    const newTodo = { ...todo, id: this.nextId++ };
    this.todos.push(newTodo);
  }

  // edit existant todo
  editTodo(newTodo, id) {
    const index = this.todos.findIndex((todo) => todo.id == id);
    this.todos[index] = { ...newTodo, id };
    return this.todos[index];
  }

  // delete todo
  deleteTodo(id) {
    const index = this.todos.findIndex((todo) => todo.id == id);

    if (index === -1) {
      throw new Error("Todo is not found");
    }
    this.todos.splice(index, 1);
  }

  // delete all done todos
  deleteAllDone() {
    this.todos = this.todos.filter((todo) => !todo.checked);
  }

  //toggle all checked
  toggleAllChecked() {
    const isAllChecked = this.todos.every((todo) => todo.checked);
    this.todos.forEach((todo) => {
      todo.checked = !isAllChecked;
    });
  }
}
const todoRepository = new TodoRepository()
module.exports = todoRepository;

class todoRepository {
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
      todos.length !== 0 ? Math.max(...todos.map((todos) => todos.id)) + 1 : 0;
  }

  //increase nextId
  increaseId(newTodo) {
    this.nextId = newTodo.id+1
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
  addTodo(newTodo) {
    this.todos.push(newTodo);
  }

  // edit existant todo
  editTodo(index, newTodo) {
    this.todos[index] = newTodo;
  }

  // delete todo
  deleteTodo(targetedIndex) {
    this.todos.splice(targetedIndex, 1);
  }

  // delete all done todos
  deleteAllDone() {
    this.todos = this.todos.filter((todo) => !todo.checked);
  }

  //toggle all checked
  toggleAllChecked() {
    this.todos.every((todo) => todo.checked)
      ? this.todos.forEach((todo) => (todo.checked = false))
      : this.todos.forEach((todo) => (todo.checked = true));
  }
}
module.exports = new todoRepository();

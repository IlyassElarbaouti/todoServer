const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const usersController = require("./controllers/users-controller");
const errorMiddleware = require("./middleware/error-middleware");
const { body } = require("express-validator");
const authMiddleware = require("./middleware/auth-middleware");
require("dotenv").config();
const todosController = require('./controllers/todos-controller')
const port = 9000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(errorMiddleware);

//register user
app.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 5, max: 32 }),
  usersController.registration.bind(usersController)
);

//activate user account
app.get("/activate/:link", usersController.activate);

//login user
app.post("/login", usersController.login);

//logout user
app.post("/logout", usersController.logout);

//refresh token
app.get("/refresh", usersController.refresh);

//get all users
app.get("/users",authMiddleware, usersController.getAllUsers);

//get all todos
app.get(
  "/todos/",
  authMiddleware,
  todosController.getAllTodos.bind(todosController)
);

//get todo by index
app.get(
  "/todos/:id",
  authMiddleware,
  todosController.getTodoById.bind(todosController)
);

// add new todo
app.post(
  "/todos/",
  authMiddleware,
  todosController.createTodo.bind(todosController)
);

// edit existant todo
app.put(
  "/todos/:id",
  authMiddleware,
  todosController.editTodo.bind(todosController)
);

//delete todo
app.delete(
  "/todos/:id",
  authMiddleware,
  todosController.deleteTodo.bind(todosController)
);

//delete all done
app.delete(
  "/todos/",
  authMiddleware,
  todosController.deleteAllDone.bind(todosController)
);

//toggle all checked
app.put(
  "/todos/",
  authMiddleware,
  todosController.toggleAllChecked.bind(todosController)
);

app.listen(port);

module.exports = app;

const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const usersController = require("./controllers/users-controller");
const errorMiddleware = require("./middleware/error-middleware");
const { body } = require("express-validator");
const authMiddleware = require("./middleware/auth-middleware");
require("dotenv").config();

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
  TodoController.getAllTodos.bind(TodoController)
);

//get todo by index
app.get(
  "/todos/:id",
  authMiddleware,
  TodoController.getTodoById.bind(TodoController)
);

// add new todo
app.post(
  "/todos/",
  authMiddleware,
  TodoController.createTodo.bind(TodoController)
);

// edit existant todo
app.put(
  "/todos/:id",
  authMiddleware,
  TodoController.editTodo.bind(TodoController)
);

//delete todo
app.delete(
  "/todos/:id",
  authMiddleware,
  TodoController.deleteTodo.bind(TodoController)
);

//delete all done
app.delete(
  "/todos/",
  authMiddleware,
  TodoController.deleteAllDone.bind(TodoController)
);

//toggle all checked
app.put(
  "/todos/",
  authMiddleware,
  TodoController.toggleAllChecked.bind(TodoController)
);

app.listen(port);

module.exports = app;

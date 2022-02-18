const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const usersController = require("./controllers/users-controller");
const errorMiddleware = require("./middleware/error-middleware");
const { body } = require("express-validator");
const authMiddleware = require("./middleware/auth-middleware");
require("dotenv").config();
const todosController = require("./controllers/todos-controller");
const port = 9000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(errorMiddleware);

app.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 5, max: 32 }),
  usersController.registration.bind(usersController)
);

app.get("/activate/:link", usersController.activate);
app.post("/refresh", usersController.refresh);
app.post("/login", usersController.login);
app.post("/logout", usersController.logout);
app.get("/users", authMiddleware, usersController.getAllUsers);

app.get("/todos/", authMiddleware, todosController.getAllTodos);
app.get("/todos/:id", authMiddleware, todosController.getTodoById);
app.post("/todos/", authMiddleware, todosController.createTodo);
app.put("/todos/update/:id", authMiddleware, todosController.updateTodo);
app.delete("/todos/:id", authMiddleware, todosController.deleteTodo);
app.delete("/todos/", authMiddleware, todosController.deleteAllDone);
app.put("/todos/", authMiddleware, todosController.toggleAllChecked);

app.listen(port);

module.exports = app;

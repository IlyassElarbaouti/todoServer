const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const TodoController = require("./controller/todo-controller");
const UsersController = require("./controller/users-controller");
const errorMiddleware = require("./middleware/error-middleware");
const { body } = require('express-validator');
const usersController = require("./controller/users-controller");
require("dotenv").config();

const port = 9000;
const app = express();

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(errorMiddleware);

//register user
app.post("/registration", body('email').isEmail(),body('password').isLength({min:5,max:32}),UsersController.registration.bind(UsersController));

//activate user account
app.get("/activate/:link", UsersController.activate);

//login user 
app.post('/login', usersController.login);

//logout user 
app.post('/logout', usersController.logout)

//refresh token 
app.get('/refresh', usersController.refresh);

//get all users
app.get('/users',usersController.getAllUsers)


// //get all todos
// app.get("/", TodoController.getAllTodos.bind(TodoController));

// //get todo by index
// app.get("/:id", TodoController.getTodoById.bind(TodoController));

// // add new todo
// app.post("/", TodoController.createTodo.bind(TodoController));

// // edit existant todo
// app.put("/:id", TodoController.editTodo.bind(TodoController));

// //delete todo
// app.delete("/:id", TodoController.deleteTodo.bind(TodoController));

// //delete all done
// app.delete("/", TodoController.deleteAllDone.bind(TodoController));

// //toggle all checked
// app.put("/", TodoController.toggleAllChecked.bind(TodoController));

app.listen(port);

module.exports = app;

const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const port = 9000;
const app = express();

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.listen(port);

module.exports = app
const express = require("express");
const path = require("path");
const Rollbar = require("rollbar");

const app = express();
app.use(express.json());
app.use("/main", express.static("./public/main.css"));

const rollbar = new Rollbar({
  accessToken: "",
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const ctrl = require('./controllers/controller')

app.get('/', ctrl.filePath)





const port = process.env.PORT || 4545;

app.listen(port, () => console.log("Server running on 4545"));
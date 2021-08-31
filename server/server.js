const express = require('express');
const path = require('path');
const Rollbar = require('rollbar');

const app = express();
app.use(express.json());
app.use('/maincss', express.static('./public/main.css'));
app.use("/mainjs", express.static("./public/main.js"));


const rollbar = new Rollbar({
  accessToken: "0b10cd9475f44bd9aa5190690e22acf2",
  captureUncaught: true,
  captureUnhandledRejections: true,
});

let students = []

// const ctrl = require('./controllers/controller')

// app.get('/', ctrl.filePath)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
  rollbar.info("html file served successfully");
});

// app.post('/api/student', (req, res) => {
//    res.status(200)
// })


app.post('/api/student', (req, res) => {
    let { name } = req.body;
    name = name.trim();

    const index = students.findIndex((studentName) => studentName === name);

    if (index === -1 && name !== "") {
        students.push(name);
        rollbar.log("Student added succussfully", { author: "Clint" });
        res.status(200).send(students);
    } else if (name === "") {
        rollbar.error("No name given");
        res.status(400).send("must provide a name.");
    } else {
        rollbar.error("Student already exists");
        res.status(400).send("that student already exists");
    }
})





const port = process.env.PORT || 4545;

app.use(rollbar.errorHandler());

app.listen(port, () => console.log(`Server running on ${port}`));

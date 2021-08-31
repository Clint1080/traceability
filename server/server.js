const express = require('express');
const path = require('path');
const Rollbar = require('rollbar');

const app = express();
app.use(express.json());
app.use('/main', express.static('./public/main.css'));

const rollbar = new Rollbar({
  accessToken: "0b10cd9475f44bd9aa5190690e22acf2",
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const ctrl = require('./controllers/controller')

app.get('/', ctrl.filePath)

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, "../public/index.html"));
//   rollbar.info("html file served successfully");
// });


const port = process.env.PORT || 4545;

app.listen(port, () => console.log(`Server running on ${port}`));

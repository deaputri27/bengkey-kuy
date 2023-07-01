require("dotenv").config();
var cors = require("cors");
const express = require("express");
const router = require("./routes/");
const app = express();
const partRoute = require("./routes/partRoute");
const userRoute = require("./routes/userRoute");
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);
// router.use(errorHandler)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`kamu ada di ${port}`);
});

module.exports = app;

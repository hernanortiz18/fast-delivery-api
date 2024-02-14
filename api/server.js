const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const routes = require("./routes/index.routes");
const path = require("path");
const db = require("./config/db")

const models = require("./models")

const app = express();

app.use(express.json());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use((err, req, res, next) => {
  res.status(500).send(err);
});
app.use("/api", routes);

db.sync({ force: true })
  .then(function () {
    app.listen(3001, () =>
      console.log("Servidor en el puerto 5001")
    );
  })
  .catch(console.error);
  module.exports = app;


// Servidor en el puesto 5001
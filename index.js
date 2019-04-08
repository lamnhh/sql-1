const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const sql = require("./config/sql-server");
const dotenv = require("dotenv");
dotenv.config();

sql.connect(`mssql://${process.env.SQL_USER}:${process.env.SQL_PASS}@localhost/SQL_1`, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  // API routing
  app.use("/api/staff", require("./api/staff"));
  app.use("/api/dept", require("./api/dept"));

  // Routing
  app.get("/", (_, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });

  app.use((_, res) => res.status(404).send({ errorCode: 404 }));
  app.listen(3000, () => {
    console.log("Server started");
  });
});

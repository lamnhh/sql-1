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
  const sendFile = (res, html) => {
    res.sendFile(path.join(__dirname, "public", html + ".html"));
  };
  app.get("/", (_, res) => sendFile(res, "view-dept"));
  app.get("/dept", (_, res) => sendFile(res, "view-dept"));
  app.get("/dept/new", (_, res) => sendFile(res, "new-dept"));
  app.get("/staff", (_, res) => sendFile(res, "view-staff"));
  app.get("/staff/new", (_, res) => sendFile(res, "new-staff"));

  app.use((_, res) => res.status(404).send({ errorCode: 404 }));
  app.listen(3000, () => {
    console.log("Server started");
  });
});

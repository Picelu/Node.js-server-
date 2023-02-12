const express = require("express");
const morgan = require("morgan");
const studentRouter = require("./routes/studentRoutes");

const app = express();

//middleware

app.use(express.json());
app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("App Running....");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// more middle ware for Router
app.use("/api/v1/student", studentRouter);

module.exports = app;

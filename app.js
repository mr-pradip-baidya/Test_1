require("dotenv").config(); 

const express = require("express");
const server = express();
const path = require("path");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;

const userRouter = require("./router/userReg");
const dashboardRouter = require("./router/dashboard")

server.set("view engine", "ejs");
server.set("views", "view");

server.use(express.urlencoded({ extended: true }));

server.use(express.static(path.join(__dirname, "public")));
server.use(express.static(path.join(__dirname, "uploads")));

// Use
server.use(userRouter);
server.use(dashboardRouter);

mongoose
  .connect(process.env.DB_URL)
  .then((res) => {
    console.log("DB Connected successfully");
    server.listen(PORT, () => {
      console.log(`Server running at: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("database is not connected",err);
  });

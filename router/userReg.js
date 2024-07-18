const express = require("express");
const userRouter = express.Router();
const {
  getForm,
  postForm,
  loginForm,
  mail_confirmation,
} = require("../controller/userReg");

userRouter.get("/", getForm)
userRouter.post("/", postForm);
userRouter.get("/login", loginForm)

// Mail confiemation
userRouter.get("/mail_confirmation/:email/:token", mail_confirmation);


module.exports = userRouter;

const express = require("express");
const router = express.Router();
const {getDashboard} = require("../controller/dashboard");

router.get("/dashboard/create-blog", getDashboard);






module.exports = router;